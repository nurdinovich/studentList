import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './Slices/studentListSlices';
import authReducer from './reducers/authSlice';

const rootReducer = {
  users: usersReducer,
  auth: authReducer,
};

const store = configureStore({ reducer: rootReducer });
export default store;