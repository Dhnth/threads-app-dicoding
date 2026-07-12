import { createAsyncThunk } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../api';

export const asyncGetLeaderboards = createAsyncThunk(
  'leaderboard/getLeaderboards',
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await api.getLeaderboards();
      return response.data.leaderboards;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(hideLoading());
    }
  }
);