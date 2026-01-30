import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Footer = () => {
    const { user } = useContext(AuthContext);

    return (
        <footer style={{ marginTop: '0', background: 'var(--bg)', borderTop: '2px solid var(--primary)', boxShadow: '0 -10px 30px rgba(0,0,0,0.5)' }}>
            <div className="container" style={{ padding: '100px 30px 40px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', marginBottom: '80px', alignItems: 'start' }}>
                    <div>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'block', margin: '0', padding: '0' }}>
                            <h2 className="tech-font" style={{ fontSize: '1.8rem', fontWeight: '800', letterSpacing: '2px', margin: '0 0 25px 0', padding: '0', filter: 'drop-shadow(0 0 10px var(--primary-glow))', lineHeight: '1' }}>
                                AMBIORA<span style={{ color: 'var(--primary)' }}> 26'</span>
                            </h2>
                        </Link>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', maxWidth: '400px', fontSize: '0.95rem' }}>
                            The annual Technical Festival of NMIMS MPSTME, Shirpur.
                            Empowering the next generation of engineers through innovation, creativity, and knowledge sharing.
                        </p>
                    </div>
                    <div>
                        <h4 className="tech-font" style={{ margin: '0 0 30px 0', padding: '0', fontSize: '0.9rem', color: '#fff', letterSpacing: '2px', lineHeight: '1.2' }}>SYSTEM_NAVIGATION</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                            <Link to="/events" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: '0.3s', fontSize: '0.9rem' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Event Arena</Link>
                            {!user && <Link to="/signup" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: '0.3s', fontSize: '0.9rem' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Registration</Link>}
                            <Link to={user ? "/profile" : "/login"} style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: '0.3s', fontSize: '0.9rem' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>{user ? "User Profile" : "User Console"}</Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="tech-font" style={{ margin: '0 0 30px 0', padding: '0', fontSize: '0.9rem', color: '#fff', letterSpacing: '2px', lineHeight: '1.2' }}>LOCATION_DATA</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                            <p>SVKM's NMIMS, Mukesh Patel Technology Park, Babulde, Bank of Tapi River, Mumbai-Agra Road (NH3), Shirpur – 425 405, Dist. Dhule, Maharashtra</p>
                            <p style={{ marginTop: '15px', color: 'var(--primary)', fontWeight: '700' }}>02563-295545 / 46 / 47</p>
                            <p style={{ margin: '0' }}>ambiora@nmims.edu</p>
                        </div>
                    </div>
                </div>
                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '40px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    <p className="tech-font" style={{ letterSpacing: '1px' }}>© 2026 AMBIORA - MPSTME SHIRPUR. ARCHITECTED FOR THE FUTURE.</p>
                    <p className="tech-font" style={{ marginTop: '15px', fontSize: '0.7rem', color: 'var(--primary)', letterSpacing: '3px', textShadow: '0 0 10px var(--primary-glow)', opacity: 0.9 }}>CREATED BY VISHNU PANICKER</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
