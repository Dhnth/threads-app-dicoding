import { createAsyncThunk } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../api';

export const asyncGetUsers = createAsyncThunk(
  'users/getUsers',
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await api.getUsers();
      return response.data.users;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(hideLoading());
    }
  }
);