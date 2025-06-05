import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const PrivateRoute: React.FC = () => {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;