import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await login(formData.email, formData.password);
            navigate('/profile');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="grid-bg" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh' }}>
            <div className="glass-morphism animate-fade-in" style={{ width: '100%', maxWidth: '450px', padding: '50px', border: '1px solid var(--glass-border)' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 className="tech-font" style={{ fontSize: '1.8rem', letterSpacing: '2px', color: '#fff' }}>USER_AUTH</h2>
                    <p className="tech-font" style={{ color: 'var(--primary)', fontSize: '0.7rem' }}>INITIALIZING_SECURE_SESSION</p>
                </div>

                {error && (
                    <div className="tech-font" style={{ background: 'rgba(255,0,212,0.1)', border: '1px solid var(--accent)', color: 'var(--accent)', padding: '12px', marginBottom: '30px', fontSize: '0.75rem', textAlign: 'center' }}>
                        ERROR:: {error.toUpperCase()}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '25px' }}>
                        <label className="tech-font" style={{ display: 'block', marginBottom: '10px', color: 'var(--text-muted)', fontSize: '0.7rem' }}>[ IDENTIFIER_EMAIL ]</label>
                        <input
                            type="email"
                            style={{
                                width: '100%',
                                padding: '15px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--glass-border)',
                                color: 'white',
                                borderRadius: '4px',
                                outline: 'none',
                                fontFamily: 'var(--font-body)'
                            }}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '35px' }}>
                        <label className="tech-font" style={{ display: 'block', marginBottom: '10px', color: 'var(--text-muted)', fontSize: '0.7rem' }}>[ ACCESS_KEY ]</label>
                        <input
                            type="password"
                            style={{
                                width: '100%',
                                padding: '15px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--glass-border)',
                                color: 'white',
                                borderRadius: '4px',
                                outline: 'none'
                            }}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>
                    <button disabled={submitting} className="btn btn-primary" style={{ width: '100%', padding: '15px' }}>
                        {submitting ? 'VALIDATING...' : 'ESTABLISH_CONNECTION'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <p className="tech-font" style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                        NEW_ENTITY? <Link to="/signup" style={{ color: 'var(--primary)', textDecoration: 'none' }}>REGISTER_HERE</Link>
                    </p>
                </div>
            </div>
        </div >
    );
};

export default Login;
