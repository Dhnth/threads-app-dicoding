import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { asyncGetThreadDetail } from '../../features/threads/threadsThunk';
import { clearDetail, clearError } from '../../features/threads/threadsSlice';
import CommentForm from '../comments/CommentForm';
import CommentItem from '../comments/CommentItem';
import Loading from '../common/Loading';
import { formatDate, getVoteCount } from '../../utils/helper';

const ThreadDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { detail, loading, error } = useSelector((state) => state.threads);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(asyncGetThreadDetail(id));
    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  const handleClearError = () => {
    dispatch(clearError());
    navigate('/');
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={handleClearError} className="btn btn-primary btn-sm">
          Go Back
        </button>
      </div>
    );
  }

  if (!detail) {
    return null;
  }

  const voteCount = getVoteCount(detail.upVotesBy, detail.downVotesBy);

  return (
    <div className="thread-detail-container">
      <div className="thread-detail">
        <div className="thread-detail-header">
          <div className="thread-detail-meta">
            {detail.owner && (
              <div className="thread-detail-owner">
                <img
                  src={detail.owner.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(detail.owner.name)}&background=random`}
                  alt={detail.owner.name}
                  className="thread-detail-avatar"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(detail.owner.name)}&background=random`;
                  }}
                />
                <div className="thread-detail-owner-info">
                  <span className="thread-detail-owner-name">{detail.owner.name}</span>
                  <span className="thread-detail-date">{formatDate(detail.createdAt)}</span>
                </div>
              </div>
            )}
            {detail.category && (
              <span className="thread-detail-category">{detail.category}</span>
            )}
          </div>
        </div>

        <h1 className="thread-detail-title">{detail.title}</h1>

        {/* Render HTML content safely */}
        <div
          className="thread-detail-body"
          dangerouslySetInnerHTML={{ __html: detail.body }}
        />

        <div className="thread-detail-footer">
          <div className="thread-detail-votes">
            <span className="vote-label">Votes: {voteCount}</span>
          </div>
        </div>
      </div>

      <div className="thread-comments-section">
        <h3 className="comments-title">
          Comments ({detail.comments?.length || 0})
        </h3>

        {user && (
          <CommentForm threadId={id} />
        )}

        <div className="comments-list">
          {detail.comments?.length === 0 ? (
            <div className="empty-state">
              <p>No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            detail.comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} threadId={id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ThreadDetail;