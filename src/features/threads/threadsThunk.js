import { createAsyncThunk } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../api';

export const asyncGetThreads = createAsyncThunk(
  'threads/getThreads',
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await api.getThreads();
      return response.data.threads;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(hideLoading());
    }
  }
);

export const asyncGetThreadDetail = createAsyncThunk(
  'threads/getThreadDetail',
  async (threadId, { dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const response = await api.getThreadDetail(threadId);
      return response.data.detailThread;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(hideLoading());
    }
  }
);

export const asyncCreateThread = createAsyncThunk(
  'threads/createThread',
  async ({ title, body, category }, { getState, dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const { auth } = getState();
      const token = auth.token;
      if (!token) {
        throw new Error('You must be logged in to create a thread');
      }
      const response = await api.createThread({ title, body, category }, token);
      return response.data.thread;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(hideLoading());
    }
  }
);

export const asyncUpVoteThread = createAsyncThunk(
  'threads/upVoteThread',
  async (threadId, { getState, dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const { auth } = getState();
      const token = auth.token;
      if (!token) {
        throw new Error('You must be logged in to vote');
      }
      await api.upVoteThread(threadId, token);
      return { threadId, userId: auth.user.id };
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(hideLoading());
    }
  }
);

export const asyncDownVoteThread = createAsyncThunk(
  'threads/downVoteThread',
  async (threadId, { getState, dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const { auth } = getState();
      const token = auth.token;
      if (!token) {
        throw new Error('You must be logged in to vote');
      }
      await api.downVoteThread(threadId, token);
      return { threadId, userId: auth.user.id };
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(hideLoading());
    }
  }
);

export const asyncNeutralVoteThread = createAsyncThunk(
  'threads/neutralVoteThread',
  async (threadId, { getState, dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const { auth } = getState();
      const token = auth.token;
      if (!token) {
        throw new Error('You must be logged in to vote');
      }
      await api.neutralVoteThread(threadId, token);
      return { threadId, userId: auth.user.id };
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(hideLoading());
    }
  }
);