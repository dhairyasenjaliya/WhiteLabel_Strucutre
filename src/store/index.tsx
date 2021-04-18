import { createStore, combineReducers } from 'redux';
import { applyMiddleware } from 'redux';
import apiMiddleware from '../middleware/api';
import userReducer from './user';
import themeReducer from './switchTheme';
import algoliaReducer from './algoliaConfig';
import salonDetailReducer from './salonDetail';
import stylistDetailReducer from './stylistDetail';
import cartListReducer from './cartList';
import cartCheckoutReducer from './cartCheckout';
import orderListReducer from './orderList';
import dealListReducer from './dealList';
import scheduleCheckoutReducer from './scheduleCheckout';
import manageFavoriteReducer from './manageFavourites';
import thunk from 'redux-thunk';

import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const rootReducer = combineReducers({
  user: userReducer,
  appTheme: themeReducer,
  algoliaDetail: algoliaReducer,
  salonDetail: salonDetailReducer,
  stylistDetail: stylistDetailReducer,
  cartList: cartListReducer,
  cartCheckout: cartCheckoutReducer,
  orderList: orderListReducer,
  dealList: dealListReducer,
  manageFavourite: manageFavoriteReducer,
  scheduleCheckout: scheduleCheckoutReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middlewares = [thunk, apiMiddleware];
const configureStore = () => {
  return createStore(persistedReducer, applyMiddleware(...middlewares));
};

export default configureStore;
