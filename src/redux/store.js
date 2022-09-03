import {persistStore, persistReducer} from 'redux-persist';
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import loaderReducer from './slices/loader';
import authReducer from './slices/auth';
import profileReducer from './slices/profile';
import homeReducer from './slices/home';
import productReducer from './slices/product';
import addressReducer from './slices/address';
import cardReducer from './slices/card';
import orderReducer from './slices/order';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const appReducer = combineReducers({
  loader: loaderReducer,
  auth: authReducer,
  profile: profileReducer,
  home: homeReducer,
  product: productReducer,
  address: addressReducer,
  card: cardReducer,
  order: orderReducer,
});

const rootReducer = (state, action) => {
  // console.log('action: ', action);
  if (action.type === 'auth/removeAccessToken') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
});

export const persistor = persistStore(store);
