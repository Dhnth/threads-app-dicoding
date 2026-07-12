/* global describe, it, expect, jest, beforeEach, afterEach */
import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import { asyncRegister, asyncLogin, asyncGetOwnProfile, asyncLogout } from './authThunk';
import api from '../../api';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('authThunk async actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({ auth: { token: 'fake-token', user: null } });
    jest.spyOn(api, 'register').mockImplementation(() => Promise.resolve({ data: { user: {} } }));
    jest.spyOn(api, 'login').mockImplementation(() => Promise.resolve({ data: { token: 'tok' } }));
    jest.spyOn(api, 'getOwnProfile').mockImplementation(() => Promise.resolve({ data: { user: {} } }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should dispatch fulfilled on successful registration', async () => {
    await store.dispatch(asyncRegister({ name: 'N', email: 'E', password: 'P' }));
    expect(store.getActions().some(a => a.type === asyncRegister.fulfilled.type)).toBe(true);
  });

  it('should dispatch rejected on failed registration', async () => {
    api.register.mockRejectedValue(new Error('Reg failed'));
    await store.dispatch(asyncRegister({ name: 'N', email: 'E', password: 'P' }));
    expect(store.getActions().some(a => a.type === asyncRegister.rejected.type)).toBe(true);
  });

  it('should dispatch fulfilled on successful login', async () => {
    await store.dispatch(asyncLogin({ email: 'E', password: 'P' }));
    expect(store.getActions().some(a => a.type === asyncLogin.fulfilled.type)).toBe(true);
  });

  it('should dispatch rejected on failed login', async () => {
    api.login.mockRejectedValue(new Error('Login failed'));
    await store.dispatch(asyncLogin({ email: 'E', password: 'P' }));
    expect(store.getActions().some(a => a.type === asyncLogin.rejected.type)).toBe(true);
  });

  it('should dispatch fulfilled on successful profile fetching', async () => {
    await store.dispatch(asyncGetOwnProfile());
    expect(store.getActions().some(a => a.type === asyncGetOwnProfile.fulfilled.type)).toBe(true);
  });

  it('should dispatch rejected if token not found on profile fetching', async () => {
    store = mockStore({ auth: { token: null } });
    await store.dispatch(asyncGetOwnProfile());
    expect(store.getActions().some(a => a.type === asyncGetOwnProfile.rejected.type)).toBe(true);
  });

  it('should dispatch fulfilled on logout', async () => {
    await store.dispatch(asyncLogout());
    expect(store.getActions().some(a => a.type === asyncLogout.fulfilled.type)).toBe(true);
  });
});