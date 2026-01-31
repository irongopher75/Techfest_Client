import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="grid-bg">
            {/* Hero / Landing Section */}
            <section className="hero-section">
                {/* Visual HUD Frame Elements */}
                <div style={{
                    position: 'absolute',
                    top: '40px',
                    left: '40px',
                    width: '100px',
                    height: '100px',
                    borderLeft: '2px solid var(--primary)',
                    borderTop: '2px solid var(--primary)',
                    opacity: 0.3
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '40px',
                    right: '40px',
                    width: '100px',
                    height: '100px',
                    borderRight: '2px solid var(--primary)',
                    borderBottom: '2px solid var(--primary)',
                    opacity: 0.3
                }}></div>
                <div className="animate-fade-in" style={{ zIndex: 2, width: '100%' }}>
                    <div className="hero-logos">
                        <img src="/assets/nmims-shirpur-logo.png" alt="NMIMS Logo" className="hero-logo-img nmims-logo" />
                        <div className="hero-logo-divider"></div>
                        <img src="/assets/ambiora-logo.png" alt="Ambiora Logo" className="hero-logo-img ambiora-logo" />
                    </div>

                    <h4 className="tech-font hero-subtitle">INIT_PROTOCOL: GREETINGS_INNOVATORS</h4>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 10vw, 8rem)',
                        fontWeight: '900',
                        lineHeight: '1',
                        marginBottom: '20px',
                        letterSpacing: '-2px',
                        textShadow: '0 0 30px var(--primary-glow)'
                    }}>
                        AMBIORA <br />
                        <span className="gradient-text glow-text">26'</span>
                    </h1>

                    <p className="hero-description">
                        The annual Technical Festival of <span style={{ color: '#fff' }}>NMIMS MPSTME, Shirpur</span>.
                        A realm where silicon dreams meet engineering realities. Explore the future of technology.
                    </p>

                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/events" className="btn btn-primary hero-btn" aria-label="Enter the Arena to view events">Enter the Arena</Link>
                        {!user && <Link to="/signup" className="btn btn-outline hero-btn" aria-label="Join the Network and sign up">Join the Network</Link>}
                    </div>
                </div>

                <div className="hero-glow"></div>
            </section >

            {/* About Section */}
            <section className="container about-section">
                <div className="tech-card border-glow-purple" style={{ position: 'relative', overflow: 'hidden' }}>
                    <div className="about-grid">
                        <div>
                            <h2 className="section-title about-title">Fostering <br /> Innovation</h2>
                            <p className="about-description">
                                Ambiora is more than a festival; it's a testament to human creativity. Based in the serene Mukesh Patel Technology Park,
                                we bring together over 1500 visionaries to participate in technical seminars, battle-ready competitions, and future-forward workshops.
                            </p>
                            <div style={{ display: 'flex', gap: '30px' }}>
                                <div className="stat-box" style={{ borderLeft: '3px solid var(--primary)' }}>
                                    <h4 className="stat-number">1500+</h4>
                                    <p className="stat-label">ATTENDEES</p>
                                </div>
                                <div className="stat-box" style={{ borderLeft: '3px solid var(--secondary)' }}>
                                    <h4 className="stat-number">20+</h4>
                                    <p className="stat-label">EVENTS</p>
                                </div>
                            </div>
                        </div>
                        <div className="tech-categories-grid">
                            <div className="tech-card border-glow-cyan cat-item" style={{ background: 'rgba(6, 182, 212, 0.03)' }}>
                                <div className="cat-icon">🤖</div>
                                <h4 className="cat-text">ROBOTICS</h4>
                            </div>
                            <div className="tech-card border-glow-purple cat-item" style={{ background: 'rgba(168, 85, 247, 0.03)' }}>
                                <div className="cat-icon">💻</div>
                                <h4 className="cat-text">CODING</h4>
                            </div>
                            <div className="tech-card border-glow-cyan cat-item" style={{ background: 'rgba(6, 182, 212, 0.03)' }}>
                                <div className="cat-icon">🛰️</div>
                                <h4 className="cat-text">AERO</h4>
                            </div>
                            <div className="tech-card border-glow-purple cat-item" style={{ background: 'rgba(168, 85, 247, 0.03)' }}>
                                <div className="cat-icon">🎨</div>
                                <h4 className="cat-text">DESIGN</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    );
};

export default Home;
