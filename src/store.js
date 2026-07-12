import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from '@dimasmds/react-redux-loading-bar';
import authReducer from './features/auth/authSlice';
import threadsReducer from './features/threads/threadsSlice';
import commentsReducer from './features/comments/commentsSlice';
import usersReducer from './features/users/usersSlice';
import leaderboardReducer from './features/leaderboard/leaderboardSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    threads: threadsReducer,
    comments: commentsReducer,
    users: usersReducer,
    leaderboard: leaderboardReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;