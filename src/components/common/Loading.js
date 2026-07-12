import React from 'react';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="loading-skeleton">
          <div className="skeleton-line" style={{ width: '60%', height: '20px' }}></div>
          <div className="skeleton-line" style={{ width: '40%', height: '16px' }}></div>
          <div className="skeleton-line" style={{ width: '80%', height: '14px' }}></div>
          <div className="skeleton-line" style={{ width: '70%', height: '14px' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;