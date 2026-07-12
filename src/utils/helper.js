export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
};

export const getVoteCount = (upVotesBy = [], downVotesBy = []) => {
  return upVotesBy.length - downVotesBy.length;
};

export const getUserVote = (votesBy = [], userId) => {
  if (votesBy.includes(userId)) {
    return 1;
  }
  return 0;
};

export const getCategories = (threads) => {
  const categories = new Set();
  threads.forEach((thread) => {
    if (thread.category) {
      categories.add(thread.category);
    }
  });
  return ['all', ...Array.from(categories)];
};

// Fungsi untuk menghilangkan HTML tags dari string
export const stripHtml = (html) => {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};