import {weatherService} from '../services/weatherService';
import {
  FETCH_WEATHER,
  FETCH_WEATHER_FAILURE,
  FETCH_WEATHER_SUCCESS,
  FETCH_LOCATION,
  FETCH_LOCATION_FAILURE,
  FETCH_LOCATION_SUCCESS,
} from './actions';

const initialState = {
  currentWeather: null,
  weatherLocation: [],
  error: null,
  loading: false,
  loadingLocation: false,
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER:
      return {
        ...state,
        loading: true,
      };
    case FETCH_WEATHER_SUCCESS:
      return {
        ...state,
        weatherLocation: [],
        currentWeather: action.currentWeather,
        loading: false,
        error: null,
      };
    case FETCH_WEATHER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case FETCH_LOCATION:
      return {
        ...state,
        loadingLocation: true,
      };
    case FETCH_LOCATION_SUCCESS:
      return {
        ...state,
        weatherLocation: action.weatherLocation,
        loadingLocation: false,
        error: null,
      };
    case FETCH_LOCATION_FAILURE:
      return {
        ...state,
        loadingLocation: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default weatherReducer;
