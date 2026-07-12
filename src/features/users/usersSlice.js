import { createSlice } from '@reduxjs/toolkit';
import { asyncGetUsers } from './usersThunk';

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(asyncGetUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch users';
      });
  },
});

export const { clearError } = usersSlice.actions;
export default usersSlice.reducer;