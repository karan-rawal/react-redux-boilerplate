import { combineReducers } from 'redux';
import AppReducer from './AppReducer';

const combinedReducers = combineReducers({
  AppReducer,
});

export default combinedReducers;
