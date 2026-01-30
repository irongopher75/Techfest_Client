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
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit' }}>
                    <img src="/assets/ambiora-logo.png" alt="Ambiora" style={{ height: '35px' }} />
                    <span className="tech-font" style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '2px' }}>
                        AMBIORA<span style={{ color: 'var(--primary)' }}>26</span>
                    </span>
                </Link>
                <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                    <Link to="/events" className="tech-font" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.8rem', transition: '0.3s' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'inherit'}>Events</Link>
                    {user ? (
                        <>
                            {user.role === 'superior_admin' && (
                                <Link to="/admin/superior" className="tech-font" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.75rem', transition: '0.3s' }}>SUPERIOR_CONSOLE</Link>
                            )}
                            {user.role === 'event_admin' && user.isApproved && (
                                <Link to="/admin/event" className="tech-font" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.75rem', transition: '0.3s' }}>EVENT_CONSOLE</Link>
                            )}
                            <Link to="/profile" className="tech-font" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.8rem', transition: '0.3s' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'inherit'}>Profile</Link>
                            <button onClick={logout} className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.75rem' }}>LOGOUT</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="tech-font" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.8rem', transition: '0.3s' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'inherit'}>Login</Link>
                            <Link to="/signup" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.75rem' }}>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
