import { combineReducers } from '@reduxjs/toolkit';
import { mainReducer } from './slices/mainSlices';

export const rootReducer = combineReducers({
  main:mainReducer,
});
