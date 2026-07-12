import React from 'react';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="page auth-page">
      <div className="page-content">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;