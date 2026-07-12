/* global describe, it, expect, jest, beforeEach, afterEach */
import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import { 
  asyncGetThreads, 
  asyncGetThreadDetail, 
  asyncCreateThread, 
  asyncUpVoteThread, 
  asyncDownVoteThread, 
  asyncNeutralVoteThread 
} from './threadsThunk';
import api from '../../api';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('threadsThunk async actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: { token: 'fake-token', user: { id: 'user-1' } },
      threads: { threads: [], loading: false, error: null },
    });
    
    jest.spyOn(api, 'getThreads').mockImplementation(() => Promise.resolve({ data: { threads: [] } }));
    jest.spyOn(api, 'getThreadDetail').mockImplementation(() => Promise.resolve({ data: { detailThread: {} } }));
    jest.spyOn(api, 'createThread').mockImplementation(() => Promise.resolve({ data: { thread: {} } }));
    jest.spyOn(api, 'upVoteThread').mockImplementation(() => Promise.resolve({}));
    jest.spyOn(api, 'downVoteThread').mockImplementation(() => Promise.resolve({}));
    jest.spyOn(api, 'neutralVoteThread').mockImplementation(() => Promise.resolve({}));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Get Threads
  it('should dispatch fulfilled on successful fetch threads', async () => {
    api.getThreads.mockResolvedValue({ data: { threads: [{ id: '1' }] } });
    await store.dispatch(asyncGetThreads());
    expect(store.getActions().some(a => a.type === asyncGetThreads.fulfilled.type)).toBe(true);
  });

  it('should dispatch rejected on failed fetch threads', async () => {
    api.getThreads.mockRejectedValue(new Error('Failed'));
    await store.dispatch(asyncGetThreads());
    expect(store.getActions().some(a => a.type === asyncGetThreads.rejected.type)).toBe(true);
  });

  // Get Thread Detail
  it('should dispatch fulfilled on successful fetch detail', async () => {
    api.getThreadDetail.mockResolvedValue({ data: { detailThread: { id: '1' } } });
    await store.dispatch(asyncGetThreadDetail('1'));
    expect(store.getActions().some(a => a.type === asyncGetThreadDetail.fulfilled.type)).toBe(true);
  });

  it('should dispatch rejected on failed fetch detail', async () => {
    api.getThreadDetail.mockRejectedValue(new Error('Failed'));
    await store.dispatch(asyncGetThreadDetail('1'));
    expect(store.getActions().some(a => a.type === asyncGetThreadDetail.rejected.type)).toBe(true);
  });

  // Create Thread
  it('should dispatch fulfilled on successful create thread', async () => {
    api.createThread.mockResolvedValue({ data: { thread: { id: 'new-1' } } });
    await store.dispatch(asyncCreateThread({ title: 'T', body: 'B', category: 'C' }));
    expect(store.getActions().some(a => a.type === asyncCreateThread.fulfilled.type)).toBe(true);
  });

  it('should dispatch rejected if no token present on create thread', async () => {
    store = mockStore({ auth: { token: null } });
    await store.dispatch(asyncCreateThread({ title: 'T', body: 'B', category: 'C' }));
    expect(store.getActions().some(a => a.type === asyncCreateThread.rejected.type)).toBe(true);
  });

  // Upvote
  it('should dispatch fulfilled on successful upvote', async () => {
    await store.dispatch(asyncUpVoteThread('1'));
    expect(store.getActions().some(a => a.type === asyncUpVoteThread.fulfilled.type)).toBe(true);
  });

  it('should dispatch rejected if no token present on upvote', async () => {
    store = mockStore({ auth: { token: null } });
    await store.dispatch(asyncUpVoteThread('1'));
    expect(store.getActions().some(a => a.type === asyncUpVoteThread.rejected.type)).toBe(true);
  });

  // Downvote
  it('should dispatch fulfilled on successful downvote', async () => {
    await store.dispatch(asyncDownVoteThread('1'));
    expect(store.getActions().some(a => a.type === asyncDownVoteThread.fulfilled.type)).toBe(true);
  });

  it('should dispatch rejected if no token present on downvote', async () => {
    store = mockStore({ auth: { token: null } });
    await store.dispatch(asyncDownVoteThread('1'));
    expect(store.getActions().some(a => a.type === asyncDownVoteThread.rejected.type)).toBe(true);
  });

  // Neutral vote
  it('should dispatch fulfilled on successful neutral vote', async () => {
    await store.dispatch(asyncNeutralVoteThread('1'));
    expect(store.getActions().some(a => a.type === asyncNeutralVoteThread.fulfilled.type)).toBe(true);
  });

  it('should dispatch rejected if no token present on neutral vote', async () => {
    store = mockStore({ auth: { token: null } });
    await store.dispatch(asyncNeutralVoteThread('1'));
    expect(store.getActions().some(a => a.type === asyncNeutralVoteThread.rejected.type)).toBe(true);
  });
});