import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import users from './reducers';

const rootReducer = combineReducers({
  users,
});

export default configureStore({
  reducer: rootReducer,
});
