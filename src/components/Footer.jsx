import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '60px', marginBottom: '60px' }}>
                    <div>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', letterSpacing: '-1px', marginBottom: '20px' }}>TECH<span style={{ color: 'var(--primary)' }}>FEST</span></h2>
                        </Link>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                            The ultimate destination for tech enthusiasts and innovators. Empowering the next generation of engineers.
                        </p>
                    </div>
                    <div>
                        <h4 style={{ marginBottom: '20px', fontSize: '1.1rem' }}>Quick Links</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <Link to="/events" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Events</Link>
                            <Link to="/signup" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Register</Link>
                            <Link to="/login" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Login</Link>
                        </div>
                    </div>
                    <div>
                        <h4 style={{ marginBottom: '20px', fontSize: '1.1rem' }}>Contact</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)' }}>
                            <p>IIT Madras Campus, Chennai</p>
                            <p>contact@techfest.in</p>
                            <p>+91 98765 43210</p>
                        </div>
                    </div>
                </div>
                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '30px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    © 2026 Techfest Innovation. Built with Passion.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
