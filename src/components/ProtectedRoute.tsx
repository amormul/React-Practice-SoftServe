import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.tsx";

interface ProtectedRouteProps {
    children: React.ReactElement;
    requiredRoleId?: number;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRoleId }) => {
    const { isAuthenticated, user } = useAuth();
    const location = useLocation();

    // Only encode the current path, not any existing query parameters
    const backUrl = encodeURIComponent(location.pathname);
    
    // Check if user is authenticated and has the required role
    const isAuthorized = isAuthenticated && (!requiredRoleId || user?.role_id === requiredRoleId);

    // Add debugging
    useEffect(() => {
        console.log("ProtectedRoute state:", {
            isAuthenticated,
            userRole: user?.role_id,
            requiredRole: requiredRoleId,
            isAuthorized,
            currentPath: location.pathname
        });
    }, [isAuthenticated, user, requiredRoleId, isAuthorized, location.pathname]);

    if (!isAuthenticated) {
        // User is not logged in at all
        console.log("User not authenticated, redirecting to login");
        const loginPath = requiredRoleId === 3 ? "/admin/login" : "/login";
        return <Navigate to={`${loginPath}?back=${backUrl}`} replace />;
    } else if (!isAuthorized) {
        // User is logged in but doesn't have the required role
        console.log("User authenticated but not authorized for this route");
        return <Navigate to="/" replace />;
    }

    // User is authenticated and authorized
    return children;
};

export default ProtectedRoute;
