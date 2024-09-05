export const FETCH_WEATHER = 'FETCH_WEATHER';
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE';

export const FETCH_LOCATION = 'FETCH_LOCATION';
export const FETCH_LOCATION_SUCCESS = 'FETCH_LOCATION_SUCCESS';
export const FETCH_LOCATION_FAILURE = 'FETCH_LOCATION_FAILURE';

export const fetchWeather = params => ({
  type: FETCH_WEATHER,
  params,
});

export const fetchWeatherSuccess = currentWeather => ({
  type: FETCH_WEATHER_SUCCESS,
  currentWeather,
});

export const fetchWeatherFailure = error => ({
  type: FETCH_WEATHER_FAILURE,
  error,
});

export const fetchLocation = city => ({
  type: FETCH_LOCATION,
  city,
});

export const fetchLocationSuccess = weatherLocation => ({
  type: FETCH_LOCATION_SUCCESS,
  weatherLocation,
});

export const fetchLocationFailure = error => ({
  type: FETCH_LOCATION_FAILURE,
  error,
});
