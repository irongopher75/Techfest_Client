import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={scrolled ? 'scrolled' : ''}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" className="brand" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'inherit', textDecoration: 'none' }}>
                    TECH<span style={{ color: 'var(--primary)' }}>FEST</span>
                </Link>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <Link to="/events" style={{ color: 'inherit', textDecoration: 'none' }}>Events</Link>
                    {user ? (
                        <>
                            <Link to="/profile" style={{ color: 'inherit', textDecoration: 'none' }}>Profile</Link>
                            <button onClick={logout} className="btn btn-primary" style={{ padding: '8px 16px' }}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>Login</Link>
                            <Link to="/signup" className="btn btn-primary" style={{ padding: '8px 16px' }}>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
