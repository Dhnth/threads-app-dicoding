import React from 'react';
import ThreadList from '../components/threads/ThreadList';

const HomePage = () => {
  return (
    <div className="page home-page">
      <div className="page-content">
        <ThreadList />
      </div>
    </div>
  );
};

export default HomePage;