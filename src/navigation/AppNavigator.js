import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WeatherDetail from '../screens/WeatherDetail';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{title: "Weather Forecast"}}/>
      <Stack.Screen name="WeatherDetail" component={WeatherDetail} options={{title: "Weather Detail"}} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
