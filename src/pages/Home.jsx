import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="grid-bg">
            {/* Hero / Landing Section */}
            <section style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: window.innerWidth < 768 ? '120px 15px 60px' : '100px 20px',
                position: 'relative',
                overflow: 'hidden'
            }}>
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
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: window.innerWidth < 480 ? '8px' : (window.innerWidth < 768 ? '15px' : '30px'),
                        marginBottom: window.innerWidth < 480 ? '20px' : '40px',
                        alignItems: 'center'
                    }}>
                        <img src="/assets/nmims-shirpur-logo.png" alt="NMIMS Logo" style={{ height: window.innerWidth < 480 ? '30px' : (window.innerWidth < 768 ? '40px' : '60px'), width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
                        <div style={{ width: '2px', height: window.innerWidth < 480 ? '20px' : (window.innerWidth < 768 ? '30px' : '50px'), background: 'var(--glass-border)' }}></div>
                        <img src="/assets/ambiora-logo.png" alt="Ambiora Logo" style={{ height: window.innerWidth < 480 ? '30px' : (window.innerWidth < 768 ? '40px' : '60px'), width: 'auto', objectFit: 'contain' }} />
                    </div>

                    <h4 className="tech-font" style={{ color: 'var(--primary)', marginBottom: '10px', fontSize: window.innerWidth < 768 ? '0.9rem' : '1.2rem', letterSpacing: '4px' }}>INIT_PROTOCOL: GREETINGS_INNOVATORS</h4>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 10vw, 8rem)',
                        fontWeight: '900',
                        lineHeight: '1',
                        marginBottom: '20px',
                        letterSpacing: '-2px',
                        textShadow: '0 0 30px var(--primary-glow)'
                    }}>
                        AMBIORA <br />
                        <span className="gradient-text glow-text">2026</span>
                    </h1>

                    <p style={{
                        maxWidth: '800px',
                        fontSize: window.innerWidth < 768 ? '0.95rem' : '1.2rem',
                        color: 'var(--text-muted)',
                        margin: '0 auto 50px',
                        fontWeight: '400',
                        padding: '0 10px'
                    }}>
                        The annual Technical Festival of <span style={{ color: '#fff' }}>NMIMS MPSTME, Shirpur</span>.
                        A realm where silicon dreams meet engineering realities. Explore the future of technology.
                    </p>

                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/events" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.75rem' }}>Enter the Arena</Link>
                        <Link to="/signup" className="btn btn-outline" style={{ padding: '10px 20px', fontSize: '0.75rem' }}>Join the Network</Link>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: window.innerWidth < 768 ? '150px' : '300px',
                    height: window.innerWidth < 768 ? '150px' : '300px',
                    background: 'var(--primary)',
                    filter: 'blur(100px)',
                    opacity: '0.1',
                    pointerEvents: 'none'
                }}></div>
            </section >

            {/* About Section */}
            <section className="container" style={{ padding: window.innerWidth < 768 ? '80px 0' : '150px 0' }}>
                <div className="tech-card border-glow-purple" style={{ position: 'relative', overflow: 'hidden' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: window.innerWidth < 768 ? '40px' : '80px' }}>
                        <div>
                            <h2 className="section-title" style={{ fontSize: window.innerWidth < 768 ? '1.8rem' : '3.5rem' }}>Fostering <br /> Innovation</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '40px', lineHeight: '1.8' }}>
                                Ambiora is more than a festival; it's a testament to human creativity. Based in the serene Mukesh Patel Technology Park,
                                we bring together over 1500 visionaries to participate in technical seminars, battle-ready competitions, and future-forward workshops.
                            </p>
                            <div style={{ display: 'flex', gap: '30px' }}>
                                <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '20px' }}>
                                    <h4 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '5px' }}>1500+</h4>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '2px' }}>ATTENDEES</p>
                                </div>
                                <div style={{ borderLeft: '3px solid var(--secondary)', paddingLeft: '20px' }}>
                                    <h4 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '5px' }}>20+</h4>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '2px' }}>EVENTS</p>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="tech-card border-glow-cyan" style={{ padding: '30px', textAlign: 'center', background: 'rgba(6, 182, 212, 0.03)' }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🤖</div>
                                <h4 style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>ROBOTICS</h4>
                            </div>
                            <div className="tech-card border-glow-purple" style={{ padding: '30px', textAlign: 'center', background: 'rgba(168, 85, 247, 0.03)' }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>💻</div>
                                <h4 style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>CODING</h4>
                            </div>
                            <div className="tech-card border-glow-cyan" style={{ padding: '30px', textAlign: 'center', background: 'rgba(6, 182, 212, 0.03)' }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🛰️</div>
                                <h4 style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>AERO</h4>
                            </div>
                            <div className="tech-card border-glow-purple" style={{ padding: '30px', textAlign: 'center', background: 'rgba(168, 85, 247, 0.03)' }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🎨</div>
                                <h4 style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>DESIGN</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    );
};

export default Home;
