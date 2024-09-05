import {call, put, takeLatest} from 'redux-saga/effects';
import {
  FETCH_WEATHER,
  fetchWeatherSuccess,
  fetchWeatherFailure,
  fetchLocationSuccess,
  fetchLocationFailure,
  FETCH_LOCATION,
} from '../weather/actions';
import {weatherService} from '../services/weatherService';

function* fetchWeatherSaga(action) {
  console.log('ACTION:', action);
  try {
    const currentWeather = yield call(
      weatherService.getCurrentWeather,
      action,
    ); 
    console.log('SAGA:', currentWeather);
    if (currentWeather) {
      yield put(fetchWeatherSuccess(currentWeather));
    }
  } catch (error) {
    console.log('ERROR:', error);
    yield put(fetchWeatherFailure(error.message));
  }
}

function* fetchLocationSaga(action) {
  console.log('ACTION Location:', action);
  try {
    const weatherLocation = yield call(
      weatherService.getAutocompleteLocation,
      action.city,
    );
    console.log('SAGA:', weatherLocation);
    if (weatherLocation) {
      yield put(fetchLocationSuccess(weatherLocation));
    }
  } catch (error) {
    console.log('ERROR:', error);
    yield put(fetchLocationFailure(error.message));
  }
}

export default function* weatherSaga() {
  yield takeLatest(FETCH_WEATHER, fetchWeatherSaga);
  yield takeLatest(FETCH_LOCATION, fetchLocationSaga);
}
