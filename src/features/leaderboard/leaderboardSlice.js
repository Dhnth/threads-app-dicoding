import { createSlice } from '@reduxjs/toolkit';
import { asyncGetLeaderboards } from './leaderboardThunk';

const initialState = {
  leaderboards: [],
  loading: false,
  error: null,
};

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetLeaderboards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetLeaderboards.fulfilled, (state, action) => {
        state.loading = false;
        state.leaderboards = action.payload;
        state.error = null;
      })
      .addCase(asyncGetLeaderboards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch leaderboards';
      });
  },
});

export const { clearError } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;