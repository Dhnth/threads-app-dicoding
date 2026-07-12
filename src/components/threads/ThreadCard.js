import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate, getVoteCount, stripHtml } from '../../utils/helper';
import {
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
} from '../../features/threads/threadsThunk';

const ThreadCard = ({ thread }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { id, title, body, category, createdAt, owner, upVotesBy, downVotesBy, totalComments } = thread;

  const voteCount = getVoteCount(upVotesBy, downVotesBy);
  const userUpVote = user && upVotesBy.includes(user.id);
  const userDownVote = user && downVotesBy.includes(user.id);

  const handleUpVote = async (e) => {
    e.preventDefault();
    if (!user) return;
    if (userUpVote) {
      await dispatch(asyncNeutralVoteThread(id));
    } else {
      await dispatch(asyncUpVoteThread(id));
    }
  };

  const handleDownVote = async (e) => {
    e.preventDefault();
    if (!user) return;
    if (userDownVote) {
      await dispatch(asyncNeutralVoteThread(id));
    } else {
      await dispatch(asyncDownVoteThread(id));
    }
  };

  // Strip HTML tags for preview text
  const plainTextBody = stripHtml(body);

  return (
    <Link to={`/thread/${id}`} className="thread-card-link">
      <div className="thread-card">
        <div className="thread-card-header">
          <div className="thread-card-meta">
            {owner && (
              <div className="thread-card-owner">
                {owner.avatar && (
                  <img
                    src={owner.avatar}
                    alt={owner.name}
                    className="thread-card-avatar"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(owner.name)}&background=random`;
                    }}
                  />
                )}
                <span className="thread-card-owner-name">{owner.name}</span>
              </div>
            )}
            <span className="thread-card-date">{formatDate(createdAt)}</span>
          </div>
          {category && (
            <span className="thread-card-category">{category}</span>
          )}
        </div>

        <h3 className="thread-card-title">{title}</h3>
        {body && (
          <p className="thread-card-body">
            {plainTextBody.length > 150 ? `${plainTextBody.substring(0, 150)}...` : plainTextBody}
          </p>
        )}

        <div className="thread-card-footer">
          <div className="thread-card-votes">
            <button
              className={`vote-btn vote-up ${userUpVote ? 'active' : ''}`}
              onClick={handleUpVote}
              disabled={!user}
              type="button"
            >
              ▲
            </button>
            <span className="vote-count">{voteCount}</span>
            <button
              className={`vote-btn vote-down ${userDownVote ? 'active' : ''}`}
              onClick={handleDownVote}
              disabled={!user}
              type="button"
            >
              ▼
            </button>
          </div>
          <div className="thread-card-comments">
            💬 {totalComments || 0} comments
          </div>
        </div>
      </div>
    </Link>
  );
};

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string,
};

ThreadCard.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string,
    category: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape(ownerShape).isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    totalComments: PropTypes.number,
  }).isRequired,
};

export default ThreadCard;