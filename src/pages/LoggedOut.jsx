import { Link } from 'react-router-dom';

const LoggedOut = () => {
    return (
        <div className="grid-bg" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'calc(100vh - 80px)',
            textAlign: 'center',
            padding: '20px'
        }}>
            <div className="glass-morphism animate-fade-in" style={{
                width: '100%',
                maxWidth: '600px',
                padding: '60px 40px',
                border: '1px solid var(--primary)'
            }}>
                <div style={{ marginBottom: '40px' }}>
                    <div style={{
                        fontSize: '4rem',
                        marginBottom: '20px',
                        filter: 'drop-shadow(0 0 10px var(--primary-glow))'
                    }}>🔒</div>
                    <h1 className="tech-font" style={{
                        fontSize: '2rem',
                        color: '#fff',
                        marginBottom: '10px',
                        letterSpacing: '2px'
                    }}>SESSION_TERMINATED</h1>
                    <p className="tech-font" style={{
                        color: 'var(--primary)',
                        fontSize: '0.8rem',
                        letterSpacing: '4px'
                    }}>STATUS: DISCONNECTED_FROM_GRID</p>
                </div>

                <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '1.1rem',
                    marginBottom: '50px',
                    lineHeight: '1.8'
                }}>
                    Your connection to the Ambiora network has been securely severed.
                    All active protocols have been synchronized and stored.
                    See you in the next iteration, operative.
                </p>

                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/login" className="btn btn-primary" style={{ padding: '12px 30px' }}>RE_AUTHENTICATE</Link>
                    <Link to="/" className="btn btn-outline" style={{ padding: '12px 30px' }}>RETURN_TO_HOME</Link>
                </div>
            </div>

            {/* Visual HUD Decoration */}
            <div style={{
                position: 'fixed',
                bottom: '40px',
                left: '40px',
                fontFamily: 'var(--font-tech)',
                fontSize: '0.6rem',
                color: 'var(--primary)',
                opacity: 0.4,
                display: window.innerWidth < 768 ? 'none' : 'block'
            }}>
                ID_LOGOUT_SUCCESSFUL<br />
                TIMESTAMP: {new Date().toLocaleTimeString()}
            </div>
        </div>
    );
};

export default LoggedOut;
