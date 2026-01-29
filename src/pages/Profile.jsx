import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import API_BASE_URL from '../config/api';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${API_BASE_URL}/api/registrations/my`, {
                    headers: { 'x-auth-token': token }
                });
                setRegistrations(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching registrations', err);
                setLoading(false);
            }
        };
        if (user) fetchRegistrations();
    }, [user]);

    if (!user) return (
        <div className="container" style={{ textAlign: 'center', padding: '150px 0' }}>
            <h2 style={{ marginBottom: '20px' }}>Authentication Required</h2>
            <p style={{ color: 'var(--text-muted)' }}>Please log in to view your festival profile.</p>
        </div>
    );

    return (
        <div className="container animate-fade-in" style={{ paddingBottom: '100px' }}>
            <div className="glass-morphism" style={{ padding: '60px', marginBottom: '60px', borderLeft: '6px solid var(--primary)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'var(--primary)', filter: 'blur(150px)', opacity: '0.1', zIndex: '1' }}></div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '40px', position: 'relative', zIndex: '2', flexWrap: 'wrap' }}>
                    <div style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '30px',
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '3.5rem',
                        fontWeight: '800',
                        color: 'white',
                        boxShadow: 'var(--glow)'
                    }}>
                        {user.name.charAt(0)}
                    </div>
                    <div>
                        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '8px' }}>{user.name}</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '4px' }}>{user.email}</p>
                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                            <span style={{ padding: '4px 12px', background: 'var(--glass)', borderRadius: '20px', fontSize: '0.9rem', color: 'var(--primary)' }}>
                                🏛️ {user.college || 'General Invitee'}
                            </span>
                            <span style={{ padding: '4px 12px', background: 'var(--glass)', borderRadius: '20px', fontSize: '0.9rem', color: 'var(--secondary)' }}>
                                🆔 {user.role?.toUpperCase() || 'STUDENT'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '40px' }}>
                My <span style={{ color: 'var(--primary)' }}>Registrations</span>
            </h2>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '100px 0' }}>
                    <div className="animate-pulse" style={{ color: 'var(--text-muted)' }}>Syncing your event history...</div>
                </div>
            ) : registrations.length === 0 ? (
                <div className="glass-morphism" style={{ padding: '80px', textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📅</div>
                    <h3 style={{ marginBottom: '12px' }}>No Events Registered</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '400px', margin: '0 auto' }}>
                        You haven't secured any seats yet. Innovation awaits you at the arena!
                    </p>
                    <a href="/events" className="btn btn-primary" style={{ padding: '14px 32px' }}>Explore Events</a>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '30px' }}>
                    {registrations.map(reg => (
                        <div key={reg._id} className="glass-morphism" style={{ padding: '30px', borderTop: `4px solid ${reg.status === 'paid' ? '#4ade80' : '#fbbf24'}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <span style={{
                                    padding: '6px 14px',
                                    background: reg.status === 'paid' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(251, 191, 36, 0.1)',
                                    color: reg.status === 'paid' ? '#4ade80' : '#fbbf24',
                                    borderRadius: '30px',
                                    fontSize: '0.75rem',
                                    fontWeight: '800',
                                    letterSpacing: '1px'
                                }}>
                                    {reg.status.toUpperCase()}
                                </span>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{new Date(reg.createdAt).toLocaleDateString()}</span>
                            </div>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>{reg.event?.title || 'Unknown Event'}</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>🎫 Access Pass Issued</p>
                                <p style={{ color: 'var(--text)', fontWeight: '700' }}>₹{reg.amountPaid}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Profile;
