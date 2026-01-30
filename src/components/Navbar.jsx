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
        <nav className={`glass-morphism ${scrolled ? 'scrolled' : ''}`} style={{
            borderLeft: 'none',
            borderRight: 'none',
            borderTop: '2px solid var(--primary)',
            borderBottom: `1px solid ${scrolled ? 'var(--primary)' : 'var(--glass-border)'}`,
            background: scrolled ? 'rgba(0, 0, 0, 0.95)' : 'rgba(0, 0, 0, 0.4)',
            boxShadow: scrolled ? '0 4px 20px rgba(0, 242, 255, 0.15)' : '0 0 20px var(--primary-glow)'
        }}>
            <div className="container nav-container">
                <Link to="/" className="logo-container" style={{ filter: 'drop-shadow(0 0 8px var(--primary-glow))' }}>
                    <img src="/assets/ambiora-logo.png" alt="Ambiora" />
                    <span className="tech-font" style={{ letterSpacing: '2px' }}>
                        AMBIORA<span style={{ color: 'var(--primary)' }}> 26'</span>
                    </span>
                </Link>
                <div className="nav-links">
                    <Link to="/events" className="tech-font" style={{
                        color: 'inherit',
                        textDecoration: 'none',
                        transition: '0.3s',
                        fontSize: '0.8rem',
                        letterSpacing: '1px'
                    }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'inherit'}>Events</Link>
                    {user ? (
                        <>
                            {user.role === 'superior_admin' && (
                                <Link to="/admin/superior" className="tech-font" style={{ color: 'var(--primary)', textDecoration: 'none', transition: '0.3s', fontSize: '0.8rem' }}>SUPERIOR</Link>
                            )}
                            {user.role === 'event_admin' && user.isApproved && (
                                <Link to="/admin/event" className="tech-font" style={{ color: 'var(--primary)', textDecoration: 'none', transition: '0.3s', fontSize: '0.8rem' }}>CONSOLE</Link>
                            )}
                            <Link to="/profile" className="tech-font" style={{
                                color: 'inherit',
                                textDecoration: 'none',
                                transition: '0.3s',
                                fontSize: '0.8rem'
                            }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'inherit'}>Profile</Link>
                            <button onClick={logout} className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.7rem' }}>LOGOUT</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="tech-font" style={{
                                color: 'inherit',
                                textDecoration: 'none',
                                transition: '0.3s',
                                fontSize: '0.8rem'
                            }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'inherit'}>Login</Link>
                            <Link to="/signup" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.7rem' }}>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
