import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetLeaderboards } from '../../features/leaderboard/leaderboardThunk';
import { clearError } from '../../features/leaderboard/leaderboardSlice';
import Loading from '../common/Loading';

const LeaderboardList = () => {
  const dispatch = useDispatch();
  const { leaderboards, loading, error } = useSelector((state) => state.leaderboard);

  useEffect(() => {
    dispatch(asyncGetLeaderboards());
  }, [dispatch]);

  const handleClearError = () => {
    dispatch(clearError());
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={handleClearError} className="btn btn-primary btn-sm">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">🏆 Leaderboard</h2>
      <p className="leaderboard-subtitle">Top contributors in the community</p>

      <div className="leaderboard-list">
        {leaderboards.length === 0 ? (
          <div className="empty-state">
            <p>No leaderboard data available</p>
          </div>
        ) : (
          leaderboards.map((item, index) => (
            <div key={item.user.id} className={`leaderboard-item ${index < 3 ? 'top' : ''}`}>
              <div className="leaderboard-rank">
                {index === 0 && '🥇'}
                {index === 1 && '🥈'}
                {index === 2 && '🥉'}
                {index >= 3 && `#${index + 1}`}
              </div>
              <div className="leaderboard-user">
                <img
                  src={item.user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.user.name)}&background=random`}
                  alt={item.user.name}
                  className="leaderboard-avatar"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.user.name)}&background=random`;
                  }}
                />
                <span className="leaderboard-name">{item.user.name}</span>
              </div>
              <div className="leaderboard-score">
                <span className="score-value">{item.score}</span>
                <span className="score-label">points</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LeaderboardList;