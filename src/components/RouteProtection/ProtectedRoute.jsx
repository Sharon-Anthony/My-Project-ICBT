import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser) {
        return <Navigate to="/" />;
    }

    const userIdPrefix = storedUser.userId.charAt(0).toLowerCase();

    if (!allowedRoles.includes(userIdPrefix)) {
        return <Navigate to="/" />;
    }
    return children;
};

export default ProtectedRoute;
