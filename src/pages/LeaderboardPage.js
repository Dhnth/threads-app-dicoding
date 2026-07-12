import React from 'react';
import LeaderboardList from '../components/leaderboard/LeaderboardList';

const LeaderboardPage = () => {
  return (
    <div className="page leaderboard-page">
      <div className="page-content">
        <LeaderboardList />
      </div>
    </div>
  );
};

export default LeaderboardPage;