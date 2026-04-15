import React from 'react';
import { Outlet } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
  // Always allow access for demo purposes
  return <Outlet />;
};

export default PrivateRoute;
