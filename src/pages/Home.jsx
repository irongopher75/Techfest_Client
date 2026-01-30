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
                padding: '100px 20px',
                position: 'relative'
            }}>
                <div className="animate-fade-in" style={{ zIndex: 2 }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '40px' }}>
                        <img src="/assets/nmims-shirpur-logo.png" alt="NMIMS Logo" style={{ height: '60px', filter: 'brightness(0) invert(1)' }} />
                        <div style={{ width: '2px', background: 'var(--glass-border)' }}></div>
                        <img src="/assets/ambiora-logo.png" alt="Ambiora Logo" style={{ height: '60px' }} />
                    </div>

                    <h4 className="tech-font" style={{ color: 'var(--primary)', marginBottom: '10px', fontSize: '1.2rem' }}>Greetings, Innovators</h4>
                    <h1 style={{
                        fontSize: 'clamp(3.5rem, 12vw, 8rem)',
                        fontWeight: '900',
                        lineHeight: '0.9',
                        marginBottom: '20px',
                        letterSpacing: '-2px'
                    }}>
                        AMBIORA <br />
                        <span className="gradient-text glow-text">2026</span>
                    </h1>

                    <p style={{
                        maxWidth: '800px',
                        fontSize: '1.2rem',
                        color: 'var(--text-muted)',
                        margin: '0 auto 50px',
                        fontWeight: '400'
                    }}>
                        The annual Technical Festival of <span style={{ color: '#fff' }}>NMIMS MPSTME, Shirpur</span>.
                        A realm where silicon dreams meet engineering realities. Explore the future of technology through
                        workshops, seminars, and high-intensity competitions.
                    </p>

                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/events" className="btn btn-primary">Enter the Arena</Link>
                        <Link to="/signup" className="btn btn-outline">Join the Network</Link>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: '300px',
                    height: '300px',
                    background: 'var(--primary)',
                    filter: 'blur(150px)',
                    opacity: '0.1',
                    pointerEvents: 'none'
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '10%',
                    right: '10%',
                    width: '400px',
                    height: '400px',
                    background: 'var(--secondary)',
                    filter: 'blur(150px)',
                    opacity: '0.1',
                    pointerEvents: 'none'
                }}></div>
            </section >

            {/* About Section */}
            < section className="container" style={{ padding: '150px 0' }}>
                <div className="glass-morphism" style={{ padding: '80px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
                        <div>
                            <h2 className="section-title">Fostering <br /> Innovation</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '30px' }}>
                                Ambiora is more than a festival; it's a testament to human creativity. Based in the serene Mukesh Patel Technology Park,
                                we bring together over 1500 visionaries to participate in technical seminars, hands-on workshops, and battle-ready competitions.
                            </p>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div style={{ borderLeft: '2px solid var(--primary)', paddingLeft: '15px' }}>
                                    <h4 style={{ color: '#fff' }}>1500+</h4>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ATTENDEES</p>
                                </div>
                                <div style={{ borderLeft: '2px solid var(--secondary)', paddingLeft: '15px' }}>
                                    <h4 style={{ color: '#fff' }}>20+</h4>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>TECHNICAL EVENTS</p>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="glass-morphism" style={{ padding: '30px', textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🤖</div>
                                <h4 style={{ fontSize: '0.9rem' }}>ROBOTICS</h4>
                            </div>
                            <div className="glass-morphism" style={{ padding: '30px', textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>💻</div>
                                <h4 style={{ fontSize: '0.9rem' }}>CODING</h4>
                            </div>
                            <div className="glass-morphism" style={{ padding: '30px', textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🛰️</div>
                                <h4 style={{ fontSize: '0.9rem' }}>AERO</h4>
                            </div>
                            <div className="glass-morphism" style={{ padding: '30px', textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🎨</div>
                                <h4 style={{ fontSize: '0.9rem' }}>DESIGN</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    );
};

export default Home;
