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
            <div className="container nav-container">
                <Link to="/" className="logo-container">
                    <img src="/assets/ambiora-logo.png" alt="Ambiora" />
                    <span className="tech-font">
                        AMBIORA<span style={{ color: 'var(--primary)' }}>26</span>
                    </span>
                </Link>
                <div className="nav-links">
                    <Link to="/events" className="tech-font" style={{ color: 'inherit', textDecoration: 'none', transition: '0.3s' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'inherit'}>Events</Link>
                    {user ? (
                        <>
                            {user.role === 'superior_admin' && (
                                <Link to="/admin/superior" className="tech-font" style={{ color: 'var(--primary)', textDecoration: 'none', transition: '0.3s' }}>SUPERIOR</Link>
                            )}
                            {user.role === 'event_admin' && user.isApproved && (
                                <Link to="/admin/event" className="tech-font" style={{ color: 'var(--primary)', textDecoration: 'none', transition: '0.3s' }}>CONSOLE</Link>
                            )}
                            <Link to="/profile" className="tech-font" style={{ color: 'inherit', textDecoration: 'none', transition: '0.3s' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'inherit'}>Profile</Link>
                            <button onClick={logout} className="btn btn-primary">LOGOUT</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="tech-font" style={{ color: 'inherit', textDecoration: 'none', transition: '0.3s' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'inherit'}>Login</Link>
                            <Link to="/signup" className="btn btn-primary">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
