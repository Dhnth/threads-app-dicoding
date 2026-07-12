import threadsReducer, { setFilterCategory, clearDetail, clearError } from './threadsSlice';
import { asyncGetThreads, asyncGetThreadDetail } from './threadsThunk';

describe('threadsSlice reducer', () => {
  const initialState = {
    threads: [],
    detail: null,
    loading: false,
    error: null,
    filterCategory: 'all',
  };

  const mockThreads = [
    {
      id: 'thread-1',
      title: 'Test Thread 1',
      body: 'Test body 1',
      category: 'General',
      createdAt: '2024-01-01T00:00:00.000Z',
      owner: { id: 'user-1', name: 'John Doe' },
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    },
    {
      id: 'thread-2',
      title: 'Test Thread 2',
      body: 'Test body 2',
      category: 'Tech',
      createdAt: '2024-01-02T00:00:00.000Z',
      owner: { id: 'user-2', name: 'Jane Doe' },
      upVotesBy: ['user-1'],
      downVotesBy: [],
      totalComments: 5,
    },
  ];

  it('should return initial state', () => {
    expect(threadsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setFilterCategory', () => {
    const newState = threadsReducer(initialState, setFilterCategory('Tech'));
    expect(newState.filterCategory).toBe('Tech');
  });

  it('should handle clearDetail', () => {
    const stateWithDetail = {
      ...initialState,
      detail: { id: 'thread-1', title: 'Test' },
    };
    const newState = threadsReducer(stateWithDetail, clearDetail());
    expect(newState.detail).toBeNull();
  });

  it('should handle clearError', () => {
    const stateWithError = {
      ...initialState,
      error: 'Failed to fetch threads',
    };
    const newState = threadsReducer(stateWithError, clearError());
    expect(newState.error).toBeNull();
  });

  it('should handle asyncGetThreads fulfilled', () => {
    const action = {
      type: asyncGetThreads.fulfilled.type,
      payload: mockThreads,
    };
    const newState = threadsReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.threads).toEqual(mockThreads);
    expect(newState.error).toBeNull();
  });

  it('should handle asyncGetThreads pending', () => {
    const action = { type: asyncGetThreads.pending.type };
    const newState = threadsReducer(initialState, action);
    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('should handle asyncGetThreads rejected', () => {
    const action = {
      type: asyncGetThreads.rejected.type,
      payload: 'Network error',
    };
    const newState = threadsReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('Network error');
  });

  it('should handle asyncGetThreadDetail fulfilled', () => {
    const mockDetail = {
      id: 'thread-1',
      title: 'Test Thread 1',
      body: 'Test body 1',
      category: 'General',
      createdAt: '2024-01-01T00:00:00.000Z',
      owner: { id: 'user-1', name: 'John Doe' },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: asyncGetThreadDetail.fulfilled.type,
      payload: mockDetail,
    };
    const newState = threadsReducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.detail).toEqual(mockDetail);
    expect(newState.error).toBeNull();
  });
});