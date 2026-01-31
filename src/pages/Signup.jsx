import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', username: '', email: '', password: '', college: '' });
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
                toast.success('Admin request submitted. Please wait for superior approval.', { duration: 5000 });
            } else {
                toast.success('Onboarding complete! Welcome operative.');
            }
            navigate('/profile');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="grid-bg signup-container">
            <div className="glass-morphism animate-fade-in signup-card">
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
                        <label className="tech-font" style={{ display: 'block', marginBottom: '10px', color: 'var(--text-muted)', fontSize: '0.7rem' }}>[ UNIQUE_IDENTIFIER_USERNAME ]</label>
                        <input
                            type="text"
                            placeholder="e.g. vishnu_2026"
                            style={{
                                width: '100%',
                                padding: '15px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--glass-border)',
                                color: 'white',
                                borderRadius: '4px',
                                outline: 'none'
                            }}
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase().replace(/\s/g, '') })}
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
                        {formData.password && (
                            <div style={{ marginTop: '10px', fontSize: '0.6rem', fontFamily: 'var(--font-tech)' }}>
                                <div style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} style={{
                                            flex: 1, height: '3px',
                                            background: formData.password.length >= i * 2 ? (formData.password.length > 6 ? 'var(--primary)' : 'var(--accent)') : 'rgba(255,255,255,0.1)'
                                        }}></div>
                                    ))}
                                </div>
                                <span style={{ color: formData.password.length > 6 ? 'var(--primary)' : 'var(--accent)' }}>
                                    {formData.password.length > 6 ? 'SECURITY_OPTIMAL' : 'SECURITY_LOW'}
                                </span>
                            </div>
                        )}
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
                    <button disabled={submitting} className="btn btn-primary" style={{ width: '100%', padding: '15px' }} aria-label="Submit registration form highlighting complete onboarding">
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
