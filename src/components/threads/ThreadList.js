import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetThreads } from '../../features/threads/threadsThunk';
import { setFilterCategory, clearError } from '../../features/threads/threadsSlice';
import ThreadCard from './ThreadCard';
import Loading from '../common/Loading';
import { getCategories } from '../../utils/helper';

const ThreadList = () => {
  const dispatch = useDispatch();
  const { threads, loading, error, filterCategory } = useSelector((state) => state.threads);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(asyncGetThreads());
  }, [dispatch]);

  const categories = getCategories(threads);

  const filteredThreads = threads.filter((thread) => {
    const matchesCategory = filterCategory === 'all' || thread.category === filterCategory;
    const matchesSearch = thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (thread.body && thread.body.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (category) => {
    dispatch(setFilterCategory(category));
  };

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
    <div className="thread-list-container">
      <div className="thread-list-header">
        <h2 className="thread-list-title">All Threads</h2>
        <div className="thread-list-controls">
          <input
            type="text"
            placeholder="Search threads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="thread-search"
          />
        </div>
      </div>

      <div className="thread-categories">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${filterCategory === category ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category)}
          >
            {category === 'all' ? 'All' : category}
          </button>
        ))}
      </div>

      {filteredThreads.length === 0 ? (
        <div className="empty-state">
          <p>No threads found</p>
        </div>
      ) : (
        <div className="thread-list">
          {filteredThreads.map((thread) => (
            <ThreadCard key={thread.id} thread={thread} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ThreadList;