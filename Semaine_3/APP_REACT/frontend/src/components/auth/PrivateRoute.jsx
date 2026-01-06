// src/components/auth/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../../services/auth';

function PrivateRoute({ children, roles = [] }) {
    const user = authService.getCurrentUser();
    
    if (!user) {
        return <Navigate to="/login" />;
    }
    
    if (roles.length > 0 && !roles.includes(user.role)) {
        // Rediriger selon le rôle
        if (user.role === 'technicien') {
            return <Navigate to="/techniciens" />;
        }
        return <Navigate to="/unauthorized" />;
    }
    
    return children;
}

export default PrivateRoute;