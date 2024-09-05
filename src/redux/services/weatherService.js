import axios from 'axios';

const API_Key = '20f3bab6fac64216b9385345240309';
const Base_Url = 'http://api.weatherapi.com/v1';
const Weather_Forecast = '/forecast.json';
const Autocomplete_City = '/search.json';

const weatherApiClient = axios.create({
  baseURL: Base_Url,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

async function getCurrentWeather({params}) {
  const url = `${Weather_Forecast}?key=${API_Key}&q=${params.city}&days=${params.value}&aqi=no`;

  try {
    const response = await weatherApiClient.get(url);

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.log('Error Response:', error.response);
    throw error;
  }
}

async function getAutocompleteLocation(city) {
  const url = `${Autocomplete_City}?key=${API_Key}&q=${city}&aqi=no`;
  try {
    const response = await weatherApiClient.get(url);

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.log('Error Response:', error.response);
    throw error;
  }
}

export const weatherService = {
  getCurrentWeather,
  getAutocompleteLocation,
};
