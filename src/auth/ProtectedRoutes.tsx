import { checkIsTokenValid } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ProtectedRoutes = () => {
    const navigate = useNavigate();
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

    if (!isAuthenticated) {
        toast.error("Session timed out or token invalid. Login first!");
        navigate("/");
        return;
    }

    if (isAuthenticated) {
        return <Outlet />;
    }

    return <Navigate to="/" replace />;
};

export default ProtectedRoutes;