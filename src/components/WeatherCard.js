import React, {useState} from 'react';
import {
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import {CloudDrizzle} from 'iconsax-react-native';

const WeatherCard = ({
  onPressCard,
  date,
  condition,
  imageSource,
  temperature,
  containerStyle,
}) => {
  return (
    <TouchableOpacity
      style={{...style.container, ...containerStyle}}
      onPress={onPressCard}>
      <Text style={style.dayText}>{date}</Text>
      <Image style={{width: 50, height: 50}} source={imageSource} />

      <Text style={style.dayText}>{temperature}</Text>
      <Text style={style.dayText}numberOfLines={1}>{condition}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#92c5ed',
    width: '23%',
    borderRadius: 5,
    alignItems: 'center',
    padding: 5,
  },
  dayText: {
    fontSize: 10,
    color: '#342564',
    fontWeight: '800',
    marginTop: '4%',
    marginBottom: '4%',
  },
});

export default WeatherCard;
