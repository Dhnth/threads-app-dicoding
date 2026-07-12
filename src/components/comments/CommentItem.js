import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate, getVoteCount } from '../../utils/helper';
import {
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralVoteComment,
} from '../../features/comments/commentsThunk';
import { asyncGetThreadDetail } from '../../features/threads/threadsThunk';

const CommentItem = ({ comment, threadId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { id, content, createdAt, owner, upVotesBy, downVotesBy } = comment;

  const voteCount = getVoteCount(upVotesBy, downVotesBy);
  const userUpVote = user && upVotesBy.includes(user.id);
  const userDownVote = user && downVotesBy.includes(user.id);

  const handleUpVote = async () => {
    if (!user) return;
    if (userUpVote) {
      await dispatch(asyncNeutralVoteComment({ threadId, commentId: id }));
    } else {
      await dispatch(asyncUpVoteComment({ threadId, commentId: id }));
    }
    await dispatch(asyncGetThreadDetail(threadId));
  };

  const handleDownVote = async () => {
    if (!user) return;
    if (userDownVote) {
      await dispatch(asyncNeutralVoteComment({ threadId, commentId: id }));
    } else {
      await dispatch(asyncDownVoteComment({ threadId, commentId: id }));
    }
    await dispatch(asyncGetThreadDetail(threadId));
  };

  return (
    <div className="comment-item">
      <div className="comment-item-header">
        <div className="comment-item-owner">
          <img
            src={owner?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(owner?.name || 'User')}&background=random`}
            alt={owner?.name || 'User'}
            className="comment-item-avatar"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(owner?.name || 'User')}&background=random`;
            }}
          />
          <div className="comment-item-owner-info">
            <span className="comment-item-owner-name">{owner?.name || 'Unknown User'}</span>
            <span className="comment-item-date">{formatDate(createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Render HTML content safely */}
      <div
        className="comment-item-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <div className="comment-item-footer">
        <div className="comment-item-votes">
          <button
            className={`vote-btn vote-up ${userUpVote ? 'active' : ''}`}
            onClick={handleUpVote}
            disabled={!user}
          >
            ▲
          </button>
          <span className="vote-count">{voteCount}</span>
          <button
            className={`vote-btn vote-down ${userDownVote ? 'active' : ''}`}
            onClick={handleDownVote}
            disabled={!user}
          >
            ▼
          </button>
        </div>
      </div>
    </div>
  );
};

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

CommentItem.propTypes = {
  threadId: PropTypes.string.isRequired,
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape(userShape).isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default CommentItem;