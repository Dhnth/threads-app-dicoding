import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { asyncCreateComment } from '../../features/comments/commentsThunk';
import { asyncGetThreadDetail } from '../../features/threads/threadsThunk';
import Button from '../common/Button';

const CommentForm = ({ threadId }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.comments);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError('Comment content is required');
      return;
    }
    if (content.trim().length < 3) {
      setError('Comment must be at least 3 characters');
      return;
    }

    try {
      await dispatch(asyncCreateComment({ threadId, content: content.trim() })).unwrap();
      setContent('');
      setError('');
      await dispatch(asyncGetThreadDetail(threadId));
    } catch (err) {
      setError(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <div className="comment-form-group">
        <label htmlFor="comment" className="comment-form-label">
          Write a comment
        </label>
        <textarea
          id="comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`comment-form-textarea ${error ? 'error' : ''}`}
          rows="3"
          placeholder="Share your thoughts..."
          disabled={loading}
        />
        {error && (
          <p className="comment-form-error">{error}</p>
        )}
      </div>
      <div className="comment-form-actions">
        <Button
          type="submit"
          variant="primary"
          size="sm"
          loading={loading}
          disabled={loading || !content.trim()}
        >
          Post Comment
        </Button>
      </div>
    </form>
  );
};

CommentForm.propTypes = {
  threadId: PropTypes.string.isRequired,
};

export default CommentForm;