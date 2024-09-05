import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchWeather,
  fetchLocation,
  fetchFutureWeather,
} from '../redux/weather/actions';
import debounce from '../utils/HelperService';
import {useNavigation} from '@react-navigation/native';
import {ArrowCircleLeft, ArrowCircleRight} from 'iconsax-react-native';

const HomeScreen = () => {
  const [query, setQuery] = useState('');
  const [value, setValue] = useState(4);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {currentWeather, weatherLocation, loadingLocation} = useSelector(
    state => state.weather,
  );

  const debouncedFetchLocation = debounce(text => {
    dispatch(fetchLocation(text));
  }, 1000);

  const handleChange = text => {
    setQuery(text);
    debouncedFetchLocation(text);
  };

  const handleSelectCity = city => {
    setQuery(city);
    dispatch(fetchWeather({city: city}));
  };
  const handleIncrease = () => {
    const newValue = value + 4;
    setValue(newValue);
    dispatch(
      fetchWeather({city: currentWeather?.location?.name, value: newValue}),
    ); // Send updated value with the city
  };

  const handleDecrease = () => {
    if (value > 4) {
      const newValue = value - 4;
      setValue(newValue);
      dispatch(
        fetchWeather({city: currentWeather?.location?.name, value: newValue}),
      ); // Send updated value with the city
    }
  };

  function formatDate(dateString) {
    const givenDate = new Date(dateString);
    const today = new Date();

    const todayMidnight = new Date(today.setHours(0, 0, 0, 0));
    const givenMidnight = new Date(givenDate.setHours(0, 0, 0, 0));

    const diffTime = givenMidnight.getTime() - todayMidnight.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Tomorrow';
    } else if (diffDays === -1) {
      return 'Yesterday';
    } else {
      const year = givenDate.getFullYear();
      const month = String(givenDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const day = String(givenDate.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  }

  return (
    <ScrollView
      style={style.container}
      contentContainerStyle={{paddingBottom: 50}}>
      <SearchBar
        searchValue={query}
        data={weatherLocation}
        handleSearch={handleChange}
        onSelectCity={handleSelectCity}
        loading={loadingLocation}
      />
      {currentWeather ? (
        <View style={style.containerView}>
          <Text style={style.textHeader}>{'Current weather'}</Text>
          <Text style={style.cityText}>{currentWeather?.location?.name}</Text>
          <View style={style.nestedContainer}>
            <Image
              style={{width: 100, height: 100}}
              source={{
                uri: `https:${currentWeather?.current?.condition?.icon}`,
              }}
            />
            <View>
              <Text style={style.tempText}>
                {currentWeather
                  ? currentWeather?.current?.temp_c + '\u00B0'
                  : ''}
              </Text>

              <Text style={style.conditionText}>
                {currentWeather?.current?.condition?.text}
              </Text>
            </View>
          </View>
          <View style={style.viewStyle}>
            <View>
              <Text style={style.conditionText}>{'Wind'}</Text>
              <Text style={style.conditionText1}>
                {currentWeather?.current?.wind_kph + 'km/hr'}
              </Text>
            </View>

            <View>
              <Text style={style.conditionText}>{'Humidity'}</Text>
              <Text style={style.conditionText1}>
                {currentWeather?.current?.humidity + '%'}
              </Text>
            </View>

            <View>
              <Text style={style.conditionText}>{'Feels like'}</Text>
              <Text style={style.conditionText1}>
                {currentWeather?.current?.feelslike_c + '\u00B0'}
              </Text>
            </View>
          </View>

          <View style={style.viewStyle}>
            <View>
              <Text style={style.conditionText}>{'Visibility'}</Text>
              <Text style={style.conditionText1}>
                {currentWeather?.current?.vis_km + 'km'}
              </Text>
            </View>

            <View>
              <Text style={style.conditionText}>{'UV Index'}</Text>
              <Text style={style.conditionText1}>
                {currentWeather?.current?.uv}
              </Text>
            </View>

            <View>
              <Text style={style.conditionText}>{'Dew point'}</Text>
              <Text style={style.conditionText1}>
                {currentWeather?.current?.dewpoint_c + '\u00B0'}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={{alignItems: 'center', marginVertical: '15%'}}>
          <Image
            style={{width: 100, height: 100}}
            source={require('../assets/Images/cloudy.png')}
          />
          <Text style={style.seachDataText}>
            {'Search city to get weather forecast'}
          </Text>
        </View>
      )}
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '90%',
          alignSelf: 'center',
          marginTop: '5%',
        }}>
        <TouchableOpacity onPress={handleDecrease} disabled={value === 4}>
          <ArrowCircleLeft size="20" color="#342564" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleIncrease}>
          <ArrowCircleRight size="20" color="#342564" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          ...style.nestedContainer,
          alignItems: 'center',
          justifyContent: 'space-around',
          width: '90%',
          alignSelf: 'center',
          marginTop: '4%',
          flexWrap: 'wrap',
          marginBottom: '10%',
        }}>
        {currentWeather?.forecast?.forecastday.map((obj, index) => (
          <WeatherCard
            key={index}
            {...obj}
            date={formatDate(obj?.date)}
            condition={obj?.day?.condition?.text}
            imageSource={{uri: `https:${obj?.day?.condition?.icon}`}}
            temperature={
              obj?.day?.maxtemp_c + '\u00B0/' + obj?.day?.mintemp_c + '\u00B0'
            }
            onPressCard={() => {
              navigation.navigate('WeatherDetail', {data: obj}), setQuery('');
            }}
            containerStyle={{marginBottom: '3%'}}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const style = StyleSheet.create({
  container: {
    backgroundColor: '#74aede',
    flex: 1,
    paddingVertical: '8%',
  },
  textHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#342564',
  },
  cityText: {
    fontSize: 17,
    fontWeight: '400',
    color: '#342564',
  },
  tempText: {
    fontSize: 45,
    fontWeight: '900',
    color: '#342564',
    textAlign: 'left',
    marginLeft: '5%',
  },
  containerView: {
    backgroundColor: '#92c5ed',
    marginTop: '7%',
    width: '90%',
    borderRadius: 12,
    alignSelf: 'center',
    padding: 15,
  },
  nestedContainer: {
    flexDirection: 'row',
  },
  conditionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#342564',
    textAlignVertical: 'center',
    marginLeft: '5%',
  },
  viewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: '4%',
  },

  conditionText1: {
    fontSize: 14,
    fontWeight: '800',
    color: '#342564',
    textAlignVertical: 'center',
    marginLeft: '5%',
  },
  seachDataText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    marginTop: '2%',
  },
});
