import { createAsyncThunk } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../api';

export const asyncCreateComment = createAsyncThunk(
  'comments/createComment',
  async ({ threadId, content }, { getState, dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const { auth } = getState();
      const token = auth.token;
      if (!token) {
        throw new Error('You must be logged in to comment');
      }
      const response = await api.createComment({ threadId, content }, token);
      return { threadId, comment: response.data.comment };
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(hideLoading());
    }
  }
);

export const asyncUpVoteComment = createAsyncThunk(
  'comments/upVoteComment',
  async ({ threadId, commentId }, { getState, dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const { auth } = getState();
      const token = auth.token;
      if (!token) {
        throw new Error('You must be logged in to vote');
      }
      await api.upVoteComment(threadId, commentId, token);
      return { threadId, commentId, userId: auth.user.id };
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(hideLoading());
    }
  }
);

export const asyncDownVoteComment = createAsyncThunk(
  'comments/downVoteComment',
  async ({ threadId, commentId }, { getState, dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const { auth } = getState();
      const token = auth.token;
      if (!token) {
        throw new Error('You must be logged in to vote');
      }
      await api.downVoteComment(threadId, commentId, token);
      return { threadId, commentId, userId: auth.user.id };
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(hideLoading());
    }
  }
);

export const asyncNeutralVoteComment = createAsyncThunk(
  'comments/neutralVoteComment',
  async ({ threadId, commentId }, { getState, dispatch, rejectWithValue }) => {
    dispatch(showLoading());
    try {
      const { auth } = getState();
      const token = auth.token;
      if (!token) {
        throw new Error('You must be logged in to vote');
      }
      await api.neutralVoteComment(threadId, commentId, token);
      return { threadId, commentId, userId: auth.user.id };
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(hideLoading());
    }
  }
);