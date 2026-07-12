import { createSlice } from '@reduxjs/toolkit';
import {
  asyncRegister,
  asyncLogin,
  asyncGetOwnProfile,
  asyncLogout,
} from './authThunk';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(asyncRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncRegister.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(asyncRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
      })
      // Login
      .addCase(asyncLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(asyncLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })
      // Get Own Profile
      .addCase(asyncGetOwnProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetOwnProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(asyncGetOwnProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch profile';
      })
      // Logout
      .addCase(asyncLogout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.error = null;
        localStorage.removeItem('token');
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;