import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function ProtectedRoute() {
    const { isAuth, loading } = useAuth();

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="loader-container">
                <svg className="pl" viewBox="0 0 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="pl-grad1" x1="1" y1="0.5" x2="0" y2="0.5">
                            <stop offset="0%" stopColor="hsl(313,90%,55%)" />
                            <stop offset="100%" stopColor="hsl(223,90%,55%)" />
                        </linearGradient>
                        <linearGradient id="pl-grad2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="hsl(313,90%,55%)" />
                            <stop offset="100%" stopColor="hsl(223,90%,55%)" />
                        </linearGradient>
                    </defs>
                    <circle className="pl__ring" cx="100" cy="100" r="82" fill="none" stroke="url(#pl-grad1)" strokeWidth="36" strokeDasharray="0 257 1 257" strokeDashoffset="0.01" strokeLinecap="round" transform="rotate(-90,100,100)" />
                    <line className="pl__ball" stroke="url(#pl-grad2)" x1="100" y1="18" x2="100.01" y2="182" strokeWidth="36" strokeDasharray="1 165" strokeLinecap="round" />
                </svg>
                <p style={{ color: 'white', fontFamily: 'Inter, sans-serif' }}>Loading...</p>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuth) {
        return <Navigate to="/log-in" replace />;
    }

    // Render the protected route if authenticated
    return <Outlet />;
}

export default ProtectedRoute;