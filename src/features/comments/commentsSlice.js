import { createSlice } from '@reduxjs/toolkit';
import {
  asyncCreateComment,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralVoteComment,
} from './commentsThunk';

const initialState = {
  loading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Comment
      .addCase(asyncCreateComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncCreateComment.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(asyncCreateComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create comment';
      })
      // Upvote Comment
      .addCase(asyncUpVoteComment.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(asyncUpVoteComment.rejected, (state, action) => {
        state.error = action.payload || 'Failed to upvote comment';
      })
      // Downvote Comment
      .addCase(asyncDownVoteComment.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(asyncDownVoteComment.rejected, (state, action) => {
        state.error = action.payload || 'Failed to downvote comment';
      })
      // Neutral Vote Comment
      .addCase(asyncNeutralVoteComment.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(asyncNeutralVoteComment.rejected, (state, action) => {
        state.error = action.payload || 'Failed to neutralize vote';
      });
  },
});

export const { clearError } = commentsSlice.actions;
export default commentsSlice.reducer;