import React from 'react';
import ThreadForm from '../components/threads/ThreadForm';
import ProtectedRoute from '../components/common/ProtectedRoute';

const CreateThreadPage = () => {
  return (
    <ProtectedRoute>
      <div className="page create-page">
        <div className="page-content">
          <ThreadForm />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CreateThreadPage;