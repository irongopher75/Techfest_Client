import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="animate-fade-in">
            {/* Enhanced Hero Section */}
            <section className="hero-section">
                <div className="container hero-content">
                    <h1 style={{ fontSize: 'clamp(3rem, 10vw, 5.5rem)', fontWeight: '900', marginBottom: '24px', lineHeight: '1', letterSpacing: '-0.02em' }}>
                        LIMITLESS <br />
                        <span style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>INNOVATION</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '750px', margin: '0 auto 48px', fontWeight: '400' }}>
                        Experience India's premier technology festival. Where visionary minds converge to redefine the boundaries of what's possible.
                    </p>
                    <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/events" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '16px 40px' }}>Explore Events</Link>
                        <Link to="/signup" className="btn glass-morphism" style={{ fontSize: '1.1rem', padding: '16px 40px' }}>Join the Movement</Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="container" style={{ marginTop: '-80px', position: 'relative', zIndex: '10' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
                    <div className="glass-morphism stat-card">
                        <div className="stat-number">50+</div>
                        <div style={{ color: 'var(--text-muted)', fontWeight: '600', letterSpacing: '2px', fontSize: '0.8rem' }}>EVENTS</div>
                    </div>
                    <div className="glass-morphism stat-card">
                        <div className="stat-number">20K+</div>
                        <div style={{ color: 'var(--text-muted)', fontWeight: '600', letterSpacing: '2px', fontSize: '0.8rem' }}>PARTICIPANTS</div>
                    </div>
                    <div className="glass-morphism stat-card">
                        <div className="stat-number">₹5L+</div>
                        <div style={{ color: 'var(--text-muted)', fontWeight: '600', letterSpacing: '2px', fontSize: '0.8rem' }}>PRIZE POOL</div>
                    </div>
                    <div className="glass-morphism stat-card">
                        <div className="stat-number">100+</div>
                        <div style={{ color: 'var(--text-muted)', fontWeight: '600', letterSpacing: '2px', fontSize: '0.8rem' }}>COLLEGES</div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="container" style={{ padding: '120px 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
                    <div className="glass-morphism" style={{ padding: '60px', borderLeft: '4px solid var(--primary)' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '24px' }}>Beyond <span style={{ color: 'var(--primary)' }}>Excellence</span></h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '32px' }}>
                            Techfest is not just an event; it's an ecosystem for tinkerers, creators, and leaders. From edge-of-the-seat Robo-wars to insightful tech talks from Silicon Valley veterans, we're building the future, today.
                        </p>
                        <Link to="/events" style={{ color: 'var(--primary)', fontWeight: '700', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            VIEW ALL COMPETITIONS <span style={{ fontSize: '1.2rem' }}>→</span>
                        </Link>
                    </div>
                    <div style={{ display: 'grid', gap: '30px' }}>
                        <div className="glass-morphism" style={{ padding: '30px' }}>
                            <h3 style={{ color: 'var(--secondary)', marginBottom: '10px' }}>Global Network</h3>
                            <p style={{ color: 'var(--text-muted)' }}>Connect with peers and mentors from across the globe in a truly international environment.</p>
                        </div>
                        <div className="glass-morphism" style={{ padding: '30px' }}>
                            <h3 style={{ color: 'var(--accent)', marginBottom: '10px' }}>Industry Connect</h3>
                            <p style={{ color: 'var(--text-muted)' }}>Direct access to recruitment opportunities at top-tier tech companies and innovative startups.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
