import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  // Mengambil state authUser dari redux store kamu
  const authUser = useSelector((state) => state.auth?.user || state.authUser);
  const token = localStorage.getItem('token');

  // Jika tidak ada user dan tidak ada token di localStorage, tendang ke login
  if (!authUser && !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;