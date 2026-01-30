import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="grid-bg">
            {/* Hero / Landing Section */}
            {/* Hero / Landing Section */}
            <section style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: window.innerWidth < 768 ? '120px 15px 60px' : '100px 20px',
                position: 'relative'
            }}>
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

                    <h4 className="tech-font" style={{ color: 'var(--primary)', marginBottom: '10px', fontSize: window.innerWidth < 768 ? '0.9rem' : '1.2rem' }}>Greetings, Innovators</h4>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 10vw, 8rem)',
                        fontWeight: '900',
                        lineHeight: '1',
                        marginBottom: '20px',
                        letterSpacing: '-1px'
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
            < section className="container" style={{ padding: window.innerWidth < 768 ? '80px 0' : '150px 0' }}>
                <div className="glass-morphism" style={{ padding: window.innerWidth < 768 ? '30px 20px' : '80px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: window.innerWidth < 768 ? '40px' : '60px' }}>
                        <div>
                            <h2 className="section-title" style={{ fontSize: window.innerWidth < 768 ? '1.8rem' : '3rem' }}>Fostering <br /> Innovation</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '30px' }}>
                                Ambiora is more than a festival; it's a testament to human creativity. Based in the Mukesh Patel Technology Park,
                                we bring together visionaries to participate in technical seminars and battle-ready competitions.
                            </p>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ borderLeft: '2px solid var(--primary)', paddingLeft: '15px' }}>
                                    <h4 style={{ color: '#fff', fontSize: '1.2rem' }}>1500+</h4>
                                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ATTENDEES</p>
                                </div>
                                <div style={{ borderLeft: '2px solid var(--secondary)', paddingLeft: '15px' }}>
                                    <h4 style={{ color: '#fff', fontSize: '1.2rem' }}>20+</h4>
                                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>EVENTS</p>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div className="glass-morphism" style={{ padding: '20px', textAlign: 'center' }}>
                                <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>🤖</div>
                                <h4 style={{ fontSize: '0.75rem' }}>ROBOTICS</h4>
                            </div>
                            <div className="glass-morphism" style={{ padding: '20px', textAlign: 'center' }}>
                                <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>💻</div>
                                <h4 style={{ fontSize: '0.75rem' }}>CODING</h4>
                            </div>
                            <div className="glass-morphism" style={{ padding: '20px', textAlign: 'center' }}>
                                <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>🛰️</div>
                                <h4 style={{ fontSize: '0.75rem' }}>AERO</h4>
                            </div>
                            <div className="glass-morphism" style={{ padding: '20px', textAlign: 'center' }}>
                                <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>🎨</div>
                                <h4 style={{ fontSize: '0.75rem' }}>DESIGN</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    );
};

export default Home;
