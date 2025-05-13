import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import productsReducer from './productsSlice';
import cartReducer from "./cartSlice";
import favoriteReducer from "./favoriteSlice" ;
import userDataReducer from "./userSlice" ;

const rootReducer = combineReducers({
  user: userDataReducer,
  cart: cartReducer,
  favorites: favoriteReducer,
  products: productsReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['products'], // Add 'cart' and 'favorites' too if you want
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);