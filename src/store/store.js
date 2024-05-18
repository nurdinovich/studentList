import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./Slices/studentListSlices";

const rootReducer = {
  users: usersReducer,
};

const store = configureStore({ reducer: rootReducer });
export default store;