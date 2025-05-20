import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactElement;
    requiredRoleId?: number; // Наприклад, 1 — для адміна
}

function parseJwt(token: string): any | null {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRoleId }) => {
    const token = localStorage.getItem("token");
    const location = window.location.pathname;
    let url = requiredRoleId === 3 ? "/admin/login" : "/login"
    url = url + `?back=${encodeURIComponent(location)}`
    if (!token) {
        return <Navigate to={url} replace />;
    }

    const payload = parseJwt(token);

    if (!payload) {
        return <Navigate to={url} replace />;
    }

    const isExpired = payload.exp * 1000 < Date.now();
    const hasRequiredRole = requiredRoleId ? payload.role_id === requiredRoleId : true;

    if (isExpired || !hasRequiredRole) {
        return <Navigate to={url} replace />;
    }

    return children;
};

export default ProtectedRoute;
