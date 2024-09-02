import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const currentUser = useSelector(state => state.currentUser.value.length > 0 
      ? state.currentUser.value 
      : JSON.parse(sessionStorage.getItem('currentUser')) || []
    );
  const location = useLocation();

  if (!currentUser?.length) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return element;
};

export default ProtectedRoute;