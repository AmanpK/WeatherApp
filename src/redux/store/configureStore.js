import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['weather'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore(onComplete) {
  const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store, null, onComplete);

  return {store, persistor};
}
