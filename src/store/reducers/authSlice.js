import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api';

export const loginUser = createAsyncThunk('auth/login', async (credentials, thunkApi) => {
  try {
    const response = await api.login(credentials);
    return response.data;
  } catch (err) {
    return thunkApi.rejectWithValue('Invalid credentials');
  }
});

export const registerUser = createAsyncThunk('auth/register', async (user, thunkApi) => {
  try {
    const response = await api.register(user);
    return response.data;
  } catch (err) {
    return thunkApi.rejectWithValue('Registration failed');
  }
});


export const deleteLogin = createAsyncThunk('auth/deleteLogin', async (userId, thunkAPI) => {
  try {
    const response = await api.deleteLogin(userId);;
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Не удалось удалить аккаунт')
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteLogin.fulfilled, (state) => {
        state.user = null
      })
      .addCase(deleteLogin.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
