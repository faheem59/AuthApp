import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const PrivateRoute: React.FC = () => {
    const { isAuthenticated, user} = useAuth();

    if (!isAuthenticated || user?.role !== 'admin') {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
