import { createAsyncThunk } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../api';

export const asyncRegister = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await api.register({ name, email, password });
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(hideLoading());
    }
  }
);

export const asyncLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await api.login({ email, password });
      const token = response.data.token;
      const userResponse = await api.getOwnProfile(token);
      return {
        token,
        user: userResponse.data.user,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(hideLoading());
    }
  }
);

export const asyncGetOwnProfile = createAsyncThunk(
  'auth/getOwnProfile',
  async (_, { getState, dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const { auth } = getState();
      const token = auth.token;
      if (!token) {
        throw new Error('No token available');
      }
      const response = await api.getOwnProfile(token);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(hideLoading());
    }
  }
);

export const asyncLogout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    dispatch(showLoading());
    try {
      return true;
    } finally {
      dispatch(hideLoading());
    }
  }
);