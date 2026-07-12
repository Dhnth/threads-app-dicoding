import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { asyncGetThreads, asyncGetThreadDetail } from './threadsThunk';
import api from '../../api';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../api');

describe('threadsThunk', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: { token: 'fake-token', user: { id: 'user-1' } },
      threads: { threads: [], loading: false, error: null },
    });
    jest.clearAllMocks();
  });

  describe('asyncGetThreads', () => {
    it('should dispatch fulfilled on successful fetch', async () => {
      const mockThreads = [
        { id: 'thread-1', title: 'Test Thread 1' },
        { id: 'thread-2', title: 'Test Thread 2' },
      ];

      api.getThreads.mockResolvedValue({
        data: { threads: mockThreads },
      });

      const expectedActions = [
        { type: asyncGetThreads.pending.type },
        { type: asyncGetThreads.fulfilled.type, payload: mockThreads },
      ];

      await store.dispatch(asyncGetThreads());

      expect(store.getActions().map((action) => action.type)).toEqual(
        expectedActions.map((action) => action.type)
      );
      expect(api.getThreads).toHaveBeenCalled();
    });

    it('should dispatch rejected on failed fetch', async () => {
      const errorMessage = 'Network error';
      api.getThreads.mockRejectedValue(new Error(errorMessage));

      const expectedActions = [
        { type: asyncGetThreads.pending.type },
        { type: asyncGetThreads.rejected.type, payload: errorMessage },
      ];

      await store.dispatch(asyncGetThreads());

      expect(store.getActions().map((action) => action.type)).toEqual(
        expectedActions.map((action) => action.type)
      );
    });
  });

  describe('asyncGetThreadDetail', () => {
    it('should dispatch fulfilled on successful fetch', async () => {
      const mockDetail = {
        id: 'thread-1',
        title: 'Test Thread 1',
        body: 'Test body',
        comments: [],
      };

      api.getThreadDetail.mockResolvedValue({
        data: { detailThread: mockDetail },
      });

      const expectedActions = [
        { type: asyncGetThreadDetail.pending.type },
        { type: asyncGetThreadDetail.fulfilled.type, payload: mockDetail },
      ];

      await store.dispatch(asyncGetThreadDetail('thread-1'));

      expect(store.getActions().map((action) => action.type)).toEqual(
        expectedActions.map((action) => action.type)
      );
      expect(api.getThreadDetail).toHaveBeenCalledWith('thread-1');
    });
  });
});