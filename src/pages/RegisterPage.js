import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="page auth-page">
      <div className="page-content">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;