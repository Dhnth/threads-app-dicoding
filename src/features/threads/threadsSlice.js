import { createSlice } from '@reduxjs/toolkit';
import {
  asyncGetThreads,
  asyncGetThreadDetail,
  asyncCreateThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
} from './threadsThunk';

const initialState = {
  threads: [],
  detail: null,
  loading: false,
  error: null,
  filterCategory: 'all',
};

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },
    clearDetail: (state) => {
      state.detail = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Threads
      .addCase(asyncGetThreads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetThreads.fulfilled, (state, action) => {
        state.loading = false;
        state.threads = action.payload;
        state.error = null;
      })
      .addCase(asyncGetThreads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch threads';
      })
      // Get Thread Detail
      .addCase(asyncGetThreadDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetThreadDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
        state.error = null;
      })
      .addCase(asyncGetThreadDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch thread detail';
      })
      // Create Thread
      .addCase(asyncCreateThread.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncCreateThread.fulfilled, (state, action) => {
        state.loading = false;
        state.threads = [action.payload, ...state.threads];
        state.error = null;
      })
      .addCase(asyncCreateThread.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create thread';
      })
      // Upvote Thread
      .addCase(asyncUpVoteThread.fulfilled, (state, action) => {
        const { threadId, userId } = action.payload;
        const updateThreadVotes = (thread) => {
          if (thread.id === threadId) {
            const upVotesBy = thread.upVotesBy || [];
            const downVotesBy = thread.downVotesBy || [];
            const userIndexUp = upVotesBy.indexOf(userId);
            const userIndexDown = downVotesBy.indexOf(userId);

            if (userIndexUp !== -1) {
              upVotesBy.splice(userIndexUp, 1);
            } else {
              if (userIndexDown !== -1) {
                downVotesBy.splice(userIndexDown, 1);
              }
              upVotesBy.push(userId);
            }
            return { ...thread, upVotesBy, downVotesBy };
          }
          return thread;
        };

        state.threads = state.threads.map(updateThreadVotes);
        if (state.detail) {
          state.detail = updateThreadVotes(state.detail);
        }
      })
      // Downvote Thread
      .addCase(asyncDownVoteThread.fulfilled, (state, action) => {
        const { threadId, userId } = action.payload;
        const updateThreadVotes = (thread) => {
          if (thread.id === threadId) {
            const upVotesBy = thread.upVotesBy || [];
            const downVotesBy = thread.downVotesBy || [];
            const userIndexDown = downVotesBy.indexOf(userId);
            const userIndexUp = upVotesBy.indexOf(userId);

            if (userIndexDown !== -1) {
              downVotesBy.splice(userIndexDown, 1);
            } else {
              if (userIndexUp !== -1) {
                upVotesBy.splice(userIndexUp, 1);
              }
              downVotesBy.push(userId);
            }
            return { ...thread, upVotesBy, downVotesBy };
          }
          return thread;
        };

        state.threads = state.threads.map(updateThreadVotes);
        if (state.detail) {
          state.detail = updateThreadVotes(state.detail);
        }
      })
      // Neutral Vote Thread
      .addCase(asyncNeutralVoteThread.fulfilled, (state, action) => {
        const { threadId, userId } = action.payload;
        const updateThreadVotes = (thread) => {
          if (thread.id === threadId) {
            const upVotesBy = thread.upVotesBy || [];
            const downVotesBy = thread.downVotesBy || [];
            const userIndexUp = upVotesBy.indexOf(userId);
            const userIndexDown = downVotesBy.indexOf(userId);

            if (userIndexUp !== -1) {
              upVotesBy.splice(userIndexUp, 1);
            }
            if (userIndexDown !== -1) {
              downVotesBy.splice(userIndexDown, 1);
            }
            return { ...thread, upVotesBy, downVotesBy };
          }
          return thread;
        };

        state.threads = state.threads.map(updateThreadVotes);
        if (state.detail) {
          state.detail = updateThreadVotes(state.detail);
        }
      });
  },
});

export const { setFilterCategory, clearDetail, clearError } = threadsSlice.actions;
export default threadsSlice.reducer;