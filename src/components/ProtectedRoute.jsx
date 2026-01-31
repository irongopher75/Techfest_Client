import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div className="grid-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="tech-font animate-pulse">AUTHORIZING_ACCESS...</div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    if (user.role === 'event_admin' && !user.isApproved) {
        return (
            <div className="grid-bg" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
                <h2 className="tech-font" style={{ fontSize: '1.5rem', color: 'var(--accent)', marginBottom: '20px' }}>ACCOUNT_PENDING_APPROVAL</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Your admin account is currently awaiting superior admin approval.</p>
                <button
                    onClick={() => window.location.href = '/'}
                    className="btn btn-primary"
                >
                    RETURN_HOME
                </button>
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;
