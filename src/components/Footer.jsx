import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{ marginTop: '0', background: 'var(--surface)', borderTop: '1px solid var(--glass-border)' }}>
            <div className="container" style={{ padding: '80px 30px 40px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', marginBottom: '60px' }}>
                    <div>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <h2 className="tech-font" style={{ fontSize: '1.8rem', fontWeight: '800', letterSpacing: '-1px', marginBottom: '20px' }}>
                                AMBIORA<span style={{ color: 'var(--primary)' }}>2026</span>
                            </h2>
                        </Link>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', maxWidth: '400px' }}>
                            The annual Technical Festival of NMIMS MPSTME, Shirpur.
                            Empowering the next generation of engineers through innovation, creativity, and knowledge sharing.
                        </p>
                    </div>
                    <div>
                        <h4 className="tech-font" style={{ marginBottom: '25px', fontSize: '1rem', color: '#fff' }}>Quick Navigation</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <Link to="/events" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: '0.3s' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Event Arena</Link>
                            <Link to="/signup" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: '0.3s' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Registration</Link>
                            <Link to="/login" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: '0.3s' }} onMouseOver={e => e.target.style.color = 'var(--primary)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>User Console</Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="tech-font" style={{ marginBottom: '25px', fontSize: '1rem', color: '#fff' }}>Campus Location</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                            <p>SVKM's NMIMS, Mukesh Patel Technology Park, Babulde, Bank of Tapi River, Mumbai-Agra Road (NH3), Shirpur – 425 405, Dist. Dhule, Maharashtra</p>
                            <p style={{ marginTop: '10px', color: 'var(--primary)' }}>02563-295545 / 46 / 47</p>
                            <p>ambiora@nmims.edu</p>
                        </div>
                    </div>
                </div>
                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '30px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    <p className="tech-font">© 2026 AMBIORA - MPSTME SHIRPUR. ARCHITECTED FOR THE FUTURE.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
