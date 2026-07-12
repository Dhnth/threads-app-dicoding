import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { asyncLogin, asyncLogout } from './authThunk';
import api from '../../api';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Mock api
jest.mock('../../api');

describe('authThunk', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        user: null,
        token: null,
        loading: false,
        error: null,
      },
    });
    jest.clearAllMocks();
  });

  describe('asyncLogin', () => {
    const loginData = {
      email: 'john@test.com',
      password: 'password123',
    };

    it('should dispatch fulfilled on successful login', async () => {
      const mockToken = 'fake-token';
      const mockUser = { id: 'user-1', name: 'John Doe', email: 'john@test.com' };

      api.login.mockResolvedValue({
        data: { token: mockToken },
      });
      api.getOwnProfile.mockResolvedValue({
        data: { user: mockUser },
      });

      const expectedActions = [
        { type: asyncLogin.pending.type },
        {
          type: asyncLogin.fulfilled.type,
          payload: { token: mockToken, user: mockUser },
        },
      ];

      await store.dispatch(asyncLogin(loginData));

      expect(store.getActions().map((action) => action.type)).toEqual(
        expectedActions.map((action) => action.type)
      );
      expect(api.login).toHaveBeenCalledWith(loginData);
      expect(api.getOwnProfile).toHaveBeenCalledWith(mockToken);
    });

    it('should dispatch rejected on failed login', async () => {
      const errorMessage = 'Invalid credentials';
      api.login.mockRejectedValue(new Error(errorMessage));

      const expectedActions = [
        { type: asyncLogin.pending.type },
        {
          type: asyncLogin.rejected.type,
          payload: errorMessage,
        },
      ];

      await store.dispatch(asyncLogin(loginData));

      expect(store.getActions().map((action) => action.type)).toEqual(
        expectedActions.map((action) => action.type)
      );
      expect(api.getOwnProfile).not.toHaveBeenCalled();
    });
  });

  describe('asyncLogout', () => {
    it('should dispatch fulfilled on logout', async () => {
      const expectedActions = [
        { type: asyncLogout.pending.type },
        { type: asyncLogout.fulfilled.type, payload: true },
      ];

      await store.dispatch(asyncLogout());

      expect(store.getActions().map((action) => action.type)).toEqual(
        expectedActions.map((action) => action.type)
      );
    });
  });
});