import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const fetchUsers = createAsyncThunk('users/fetchAll', async (_, thunkApi) => {
  try {
    const response = await api.getUsers();
    return response.data;
  } catch (err) {
    return thunkApi.rejectWithValue('not data');
  }
});

export const deleteUser = createAsyncThunk('users/delete', async (id, thunkApi) => {
  try {
    await api.deleteUser(id);
    return id;
  } catch (err) {
    return thunkApi.rejectWithValue('error');
  }
});

export const addUser = createAsyncThunk('users/add', async (newUser, thunkApi) => {
  try {
    const response = await api.addUser(newUser);
    return response.data;
  } catch (err) {
    return thunkApi.rejectWithValue('error');
  }
});

export default fetchUsers;
