import { checkIsTokenValid } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const isAuthenticate = checkIsTokenValid();
        setIsAuthenticated(isAuthenticate);
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return null;
    }

    if (isAuthenticated) {
        return <Outlet />;
    }

    return <Navigate to="/" replace />;
};

export default ProtectedRoutes;