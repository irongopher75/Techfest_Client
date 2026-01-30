import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', college: '' });
    const [isAdminRequest, setIsAdminRequest] = useState(false);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const { signup } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const data = {
                ...formData,
                role: isAdminRequest ? 'event_admin' : 'user'
            };
            await signup(data);

            if (isAdminRequest) {
                alert('Admin request submitted. Please wait for superior approval.');
            }
            navigate('/profile');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="grid-bg" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '100px 20px' }}>
            <div className="glass-morphism animate-fade-in" style={{ width: '100%', maxWidth: '500px', padding: '50px', border: '1px solid var(--glass-border)' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 className="tech-font" style={{ fontSize: '1.8rem', letterSpacing: '2px', color: '#fff' }}>INITIALIZE_ENTITY</h2>
                    <p className="tech-font" style={{ color: 'var(--primary)', fontSize: '0.7rem' }}>NEW_RECRUIT_ONBOARDING_PROTOCOL</p>
                </div>

                {error && (
                    <div className="tech-font" style={{ background: 'rgba(255,0,212,0.1)', border: '1px solid var(--accent)', color: 'var(--accent)', padding: '12px', marginBottom: '30px', fontSize: '0.75rem', textAlign: 'center' }}>
                        ERROR:: {error.toUpperCase()}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label className="tech-font" style={{ display: 'block', marginBottom: '10px', color: 'var(--text-muted)', fontSize: '0.7rem' }}>[ FULL_NAME ]</label>
                        <input
                            type="text"
                            style={{
                                width: '100%',
                                padding: '15px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--glass-border)',
                                color: 'white',
                                borderRadius: '4px',
                                outline: 'none'
                            }}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label className="tech-font" style={{ display: 'block', marginBottom: '10px', color: 'var(--text-muted)', fontSize: '0.7rem' }}>[ COMMUNICATION_PORT_EMAIL ]</label>
                        <input
                            type="email"
                            style={{
                                width: '100%',
                                padding: '15px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--glass-border)',
                                color: 'white',
                                borderRadius: '4px',
                                outline: 'none'
                            }}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label className="tech-font" style={{ display: 'block', marginBottom: '10px', color: 'var(--text-muted)', fontSize: '0.7rem' }}>[ SCHOOL_NAME ]</label>
                        <input
                            type="text"
                            placeholder="e.g. NMIMS MPSTME Shirpur"
                            style={{
                                width: '100%',
                                padding: '15px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--glass-border)',
                                color: 'white',
                                borderRadius: '4px',
                                outline: 'none'
                            }}
                            value={formData.college}
                            onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                        />
                    </div>
                    <div style={{ marginBottom: '35px' }}>
                        <label className="tech-font" style={{ display: 'block', marginBottom: '10px', color: 'var(--text-muted)', fontSize: '0.7rem' }}>[ SECURE_KEY_PASSWORD ]</label>
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

                    <div style={{ marginBottom: '35px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input
                            type="checkbox"
                            id="adminRequest"
                            checked={isAdminRequest}
                            onChange={(e) => setIsAdminRequest(e.target.checked)}
                            style={{ cursor: 'pointer' }}
                        />
                        <label htmlFor="adminRequest" className="tech-font" style={{ color: 'var(--primary)', fontSize: '0.65rem', cursor: 'pointer' }}>
                            [ REQUEST_ADMIN_ACCESS ] :: REQUIRE SUPERIOR_CLEARANCE
                        </label>
                    </div>
                    <button disabled={submitting} className="btn btn-primary" style={{ width: '100%', padding: '15px' }}>
                        {submitting ? 'PROCESSING...' : 'COMPLETE_ONBOARDING'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <p className="tech-font" style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                        ALREADY_ENTITY? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none' }}>AUTHENTICATE_HERE</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
