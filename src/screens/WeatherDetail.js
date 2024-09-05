import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import {useDispatch, useSelector} from 'react-redux';

const WeatherDetail = ({route}) => {
  const {data} = route.params;

  const dispatch = useDispatch();
  const {currentWeather} = useSelector(state => state.weather);

  function formatTimeFromArray(obj) {
    const date = new Date(obj?.time_epoch * 1000);

    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;

    return `${formattedHours}:${minutes} ${ampm}`;
  }

  return (
    <SafeAreaView style={style.container}>
      <ScrollView contentContainerStyle={{paddingBottom: 30}}>
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

        <View
          style={{
            ...style.nestedContainer,
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '90%',
            alignSelf: 'center',
            marginTop: '8%',
            flexWrap: 'wrap',
          }}>
          {data?.hour?.map((obj, index) => (
            <WeatherCard
              key={index}
              {...obj}
              date={formatTimeFromArray(obj)}
              condition={obj?.condition?.text}
              imageSource={{uri: `https:${obj?.condition?.icon}`}}
              temperature={obj?.temp_c + '\u00B0'}
              containerStyle={{height: '15%', marginBottom: '4%'}}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WeatherDetail;

const style = StyleSheet.create({
  container: {
    backgroundColor: '#74aede',
    flex: 1,
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
});
