const BASE_URL = 'https://forum-api.dicoding.dev/v1';

const api = {
  async register({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Registration failed');
    }
    return result;
  },

  async login({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Login failed');
    }
    return result;
  },

  async getUsers() {
    const response = await fetch(`${BASE_URL}/users`);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch users');
    }
    return result;
  },

  async getOwnProfile(token) {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch profile');
    }
    return result;
  },

  async getThreads() {
    const response = await fetch(`${BASE_URL}/threads`);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch threads');
    }
    return result;
  },

  async getThreadDetail(threadId) {
    const response = await fetch(`${BASE_URL}/threads/${threadId}`);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch thread detail');
    }
    return result;
  },

  async createThread({ title, body, category = 'General' }, token) {
    const response = await fetch(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, body, category }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to create thread');
    }
    return result;
  },

  async createComment({ threadId, content }, token) {
    const response = await fetch(`${BASE_URL}/threads/${threadId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to create comment');
    }
    return result;
  },

  async upVoteThread(threadId, token) {
    const response = await fetch(`${BASE_URL}/threads/${threadId}/up-vote`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to upvote thread');
    }
    return result;
  },

  async downVoteThread(threadId, token) {
    const response = await fetch(`${BASE_URL}/threads/${threadId}/down-vote`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to downvote thread');
    }
    return result;
  },

  async neutralVoteThread(threadId, token) {
    const response = await fetch(`${BASE_URL}/threads/${threadId}/neutral-vote`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to neutralize vote');
    }
    return result;
  },

  async upVoteComment(threadId, commentId, token) {
    const response = await fetch(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to upvote comment');
    }
    return result;
  },

  async downVoteComment(threadId, commentId, token) {
    const response = await fetch(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to downvote comment');
    }
    return result;
  },

  async neutralVoteComment(threadId, commentId, token) {
    const response = await fetch(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to neutralize vote');
    }
    return result;
  },

  async getLeaderboards() {
    const response = await fetch(`${BASE_URL}/leaderboards`);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch leaderboards');
    }
    return result;
  },
};

export default api;