import authReducer, { clearError } from './authSlice';
import { asyncLogin, asyncLogout } from './authThunk';

describe('authSlice reducer', () => {
  const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
  };

  it('should return initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle clearError', () => {
    const stateWithError = {
      ...initialState,
      error: 'Login failed',
    };
    const newState = authReducer(stateWithError, clearError());
    expect(newState.error).toBeNull();
  });

  it('should handle asyncLogin pending', () => {
    const action = { type: asyncLogin.pending.type };
    const newState = authReducer(initialState, action);
    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('should handle asyncLogin fulfilled', () => {
    const mockUser = { id: 'user-1', name: 'John Doe', email: 'john@test.com' };
    const mockToken = 'fake-token';
    const action = {
      type: asyncLogin.fulfilled.type,
      payload: { user: mockUser, token: mockToken },
    };
    const newState = authReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.user).toEqual(mockUser);
    expect(newState.token).toBe(mockToken);
    expect(newState.error).toBeNull();
  });

  it('should handle asyncLogin rejected', () => {
    const action = {
      type: asyncLogin.rejected.type,
      payload: 'Invalid credentials',
    };
    const newState = authReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('Invalid credentials');
  });

  it('should handle asyncLogout fulfilled', () => {
    const loggedInState = {
      user: { id: 'user-1', name: 'John Doe' },
      token: 'fake-token',
      loading: false,
      error: null,
    };
    const action = { type: asyncLogout.fulfilled.type };
    const newState = authReducer(loggedInState, action);
    expect(newState.user).toBeNull();
    expect(newState.token).toBeNull();
    expect(newState.error).toBeNull();
  });
});