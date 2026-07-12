/* global describe, it, expect, beforeEach */
import authReducer, { clearError } from './authSlice';
import { asyncRegister, asyncLogin, asyncGetOwnProfile, asyncLogout } from './authThunk';

describe('authSlice reducer and extraReducers', () => {
  const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('should handle clearError', () => {
    const state = authReducer({ ...initialState, error: 'some-error' }, clearError());
    expect(state.error).toBeNull();
  });

  it('should handle asyncRegister life cycle', () => {
    let state = authReducer(initialState, { type: asyncRegister.pending.type });
    expect(state.loading).toBe(true);

    state = authReducer(initialState, { type: asyncRegister.fulfilled.type });
    expect(state.loading).toBe(false);

    state = authReducer(initialState, { type: asyncRegister.rejected.type, payload: 'error' });
    expect(state.error).toBe('error');
  });

  it('should handle asyncLogin life cycle', () => {
    let state = authReducer(initialState, { type: asyncLogin.pending.type });
    expect(state.loading).toBe(true);

    const payload = { token: 'new-token', user: { name: 'Dhanis' } };
    state = authReducer(initialState, { type: asyncLogin.fulfilled.type, payload });
    expect(state.token).toBe('new-token');
    expect(state.user).toEqual({ name: 'Dhanis' });
    expect(localStorage.getItem('token')).toBe('new-token');

    state = authReducer(initialState, { type: asyncLogin.rejected.type, payload: 'error' });
    expect(state.error).toBe('error');
  });

  it('should handle asyncGetOwnProfile life cycle', () => {
    let state = authReducer(initialState, { type: asyncGetOwnProfile.pending.type });
    expect(state.loading).toBe(true);

    state = authReducer(initialState, { type: asyncGetOwnProfile.fulfilled.type, payload: { id: '1' } });
    expect(state.user).toEqual({ id: '1' });

    state = authReducer(initialState, { type: asyncGetOwnProfile.rejected.type, payload: 'error' });
    expect(state.error).toBe('error');
  });

  it('should handle asyncLogout fulfilled', () => {
    localStorage.setItem('token', 'old-token');
    const customState = { user: {}, token: 'old-token', loading: false, error: null };
    
    const state = authReducer(customState, { type: asyncLogout.fulfilled.type });
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
  });
});