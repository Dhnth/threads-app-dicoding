import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncCreateThread } from '../../features/threads/threadsThunk';
import Button from '../common/Button';

const ThreadForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.threads);
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: '',
    body: '',
    category: 'General',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    if (!formData.body.trim()) {
      newErrors.body = 'Body is required';
    }
    if (formData.body.trim().length < 10) {
      newErrors.body = 'Body must be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await dispatch(asyncCreateThread(formData)).unwrap();
      navigate('/');
    } catch (error) {
      setErrors({ submit: error });
    }
  };

  if (!user) {
    return (
      <div className="error-container">
        <p className="error-message">You must be logged in to create a thread.</p>
        <Button onClick={() => navigate('/login')}>Login</Button>
      </div>
    );
  }

  return (
    <div className="thread-form-container">
      <h2 className="thread-form-title">Create New Thread</h2>
      <form onSubmit={handleSubmit} className="thread-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`form-input ${errors.title ? 'error' : ''}`}
            placeholder="Enter thread title"
          />
          {errors.title && (
            <p className="form-error">{errors.title}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter category (e.g., General, Tech, Lifestyle)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="body" className="form-label">
            Body *
          </label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            className={`form-textarea ${errors.body ? 'error' : ''}`}
            rows="8"
            placeholder="Write your thread content..."
          />
          {errors.body && (
            <p className="form-error">{errors.body}</p>
          )}
        </div>

        {errors.submit && (
          <p className="form-error">{errors.submit}</p>
        )}

        <div className="form-actions">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            disabled={loading}
          >
            Create Thread
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ThreadForm;