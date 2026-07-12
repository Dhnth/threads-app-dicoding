/* global describe, it, expect */
import threadsReducer, { setFilterCategory, clearDetail, clearError } from './threadsSlice';
import { 
  asyncGetThreads, 
  asyncGetThreadDetail, 
  asyncCreateThread, 
  asyncUpVoteThread, 
  asyncDownVoteThread, 
  asyncNeutralVoteThread 
} from './threadsThunk';

describe('threadsSlice reducer and extraReducers', () => {
  const initialState = {
    threads: [],
    detail: null,
    loading: false,
    error: null,
    filterCategory: 'all',
  };

  it('should handle initial state', () => {
    expect(threadsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle reducers actions', () => {
    let state = threadsReducer(initialState, setFilterCategory('tech'));
    expect(state.filterCategory).toBe('tech');

    state = threadsReducer({ ...initialState, detail: {} }, clearDetail());
    expect(state.detail).toBeNull();

    state = threadsReducer({ ...initialState, error: 'error' }, clearError());
    expect(state.error).toBeNull();
  });

  it('should handle asyncGetThreads pending, fulfilled, and rejected', () => {
    let state = threadsReducer(initialState, { type: asyncGetThreads.pending.type });
    expect(state.loading).toBe(true);

    state = threadsReducer(initialState, { type: asyncGetThreads.fulfilled.type, payload: [1, 2] });
    expect(state.threads).toEqual([1, 2]);

    state = threadsReducer(initialState, { type: asyncGetThreads.rejected.type, payload: 'Error Msg' });
    expect(state.error).toBe('Error Msg');
  });

  it('should handle asyncGetThreadDetail pending, fulfilled, and rejected', () => {
    let state = threadsReducer(initialState, { type: asyncGetThreadDetail.pending.type });
    expect(state.loading).toBe(true);

    state = threadsReducer(initialState, { type: asyncGetThreadDetail.fulfilled.type, payload: { id: '1' } });
    expect(state.detail).toEqual({ id: '1' });

    state = threadsReducer(initialState, { type: asyncGetThreadDetail.rejected.type, payload: 'Error Msg' });
    expect(state.error).toBe('Error Msg');
  });

  it('should handle asyncCreateThread pending, fulfilled, and rejected', () => {
    let state = threadsReducer(initialState, { type: asyncCreateThread.pending.type });
    expect(state.loading).toBe(true);

    state = threadsReducer({ ...initialState, threads: [2] }, { type: asyncCreateThread.fulfilled.type, payload: 1 });
    expect(state.threads).toEqual([1, 2]);

    state = threadsReducer(initialState, { type: asyncCreateThread.rejected.type, payload: 'Error Msg' });
    expect(state.error).toBe('Error Msg');
  });

  it('should handle asyncUpVoteThread toggle logic', () => {
    const customState = {
      ...initialState,
      threads: [{ id: 't-1', upVotesBy: [], downVotesBy: ['user-1'] }],
      detail: { id: 't-1', upVotesBy: ['user-1'], downVotesBy: [] },
    };

    // Test upvote ketika user sebelumnya melakukan downvote
    let state = threadsReducer(customState, { 
      type: asyncUpVoteThread.fulfilled.type, 
      payload: { threadId: 't-1', userId: 'user-1' } 
    });
    expect(state.threads[0].upVotesBy).toContain('user-1');
    expect(state.threads[0].downVotesBy).not.toContain('user-1');

    // Test upvote membatalkan upvote jika diklik lagi
    state = threadsReducer(state, { 
      type: asyncUpVoteThread.fulfilled.type, 
      payload: { threadId: 't-1', userId: 'user-1' } 
    });
    expect(state.threads[0].upVotesBy).not.toContain('user-1');
  });

  it('should handle asyncDownVoteThread toggle logic', () => {
    const customState = {
      ...initialState,
      threads: [{ id: 't-1', upVotesBy: ['user-1'], downVotesBy: [] }],
    };

    let state = threadsReducer(customState, { 
      type: asyncDownVoteThread.fulfilled.type, 
      payload: { threadId: 't-1', userId: 'user-1' } 
    });
    expect(state.threads[0].downVotesBy).toContain('user-1');
    expect(state.threads[0].upVotesBy).not.toContain('user-1');
  });

  it('should handle asyncNeutralVoteThread logic', () => {
    const customState = {
      ...initialState,
      threads: [{ id: 't-1', upVotesBy: ['user-1'], downVotesBy: ['user-1'] }],
    };

    let state = threadsReducer(customState, { 
      type: asyncNeutralVoteThread.fulfilled.type, 
      payload: { threadId: 't-1', userId: 'user-1' } 
    });
    expect(state.threads[0].upVotesBy).not.toContain('user-1');
    expect(state.threads[0].downVotesBy).not.toContain('user-1');
  });
});