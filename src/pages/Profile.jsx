import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

const Profile = () => {
    const { user } = useContext(AuthContext);

    const { data: registrations = [], isLoading: loading } = useQuery({
        queryKey: ['my-registrations'],
        enabled: !!user,
        queryFn: async () => {
            const res = await api.get('/api/registrations/my');
            return res.data;
        },
        onError: (err) => {
            console.error('Error fetching registrations', err);
            toast.error('Failed to fetch technical itinerary.');
        }
    });

    if (!user) return (
        <div className="grid-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="glass-morphism" style={{ padding: '60px', textAlign: 'center' }}>
                <h2 className="tech-font" style={{ marginBottom: '20px' }}>ACCESS_DENIED</h2>
                <p style={{ color: 'var(--text-muted)' }}>Security clearance required. Please initialize user session.</p>
                <a href="/login" className="btn btn-primary" style={{ marginTop: '30px' }}>Login</a>
            </div>
        </div>
    );

    return (
        <div className="grid-bg" style={{ minHeight: '100vh' }}>
            <div className="container animate-fade-in" style={{ paddingBottom: '100px', paddingTop: '100px' }}>
                <div className="glass-morphism" style={{ padding: '60px', marginBottom: '80px', borderLeft: '4px solid var(--primary)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '40px', position: 'relative', zIndex: '2', flexWrap: 'wrap' }}>
                        <div style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '4px',
                            border: '1px solid var(--primary)',
                            background: 'var(--surface)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '3.5rem',
                            fontWeight: '800',
                            color: 'var(--primary)',
                            fontFamily: 'var(--font-tech)',
                            boxShadow: '0 0 20px var(--primary-glow)'
                        }}>
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <h1 className="tech-font" style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '10px', color: '#fff' }}>{user.name}</h1>
                            <p className="tech-font" style={{ color: 'var(--primary)', fontSize: '0.9rem', marginBottom: '15px', letterSpacing: '1px' }}>{user.email.toUpperCase()}</p>
                            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                <span style={{ padding: '5px 15px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '4px', fontSize: '0.75rem', color: '#fff', fontFamily: 'var(--font-tech)' }}>
                                    CAMPUS: {user.college || 'NMIMS_SHIRPUR'}
                                </span>
                                <span style={{ padding: '5px 15px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--secondary)', fontFamily: 'var(--font-tech)' }}>
                                    ROLE: {user.role?.toUpperCase() || 'AGENT'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <h2 className="section-title">COMMAND_CENTER</h2>

                <h4 className="tech-font" style={{ marginBottom: '40px', fontSize: '1.1rem', color: '#fff' }}>ACTIVE_ENGAGEMENTS</h4>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '100px 0' }}>
                        <div className="tech-font animate-pulse" style={{ color: 'var(--text-muted)', letterSpacing: '3px' }}>FETCHING_DATA_STREAM...</div>
                    </div>
                ) : registrations.length === 0 ? (
                    <div className="glass-morphism" style={{ padding: '80px', textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⚠️</div>
                        <h3 className="tech-font" style={{ marginBottom: '15px' }}>NO_EVENTS_FOUND</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '35px', maxWidth: '400px', margin: '0 auto' }}>
                            Your technical itinerary is empty. Deploy yourself to the arena to participate.
                        </p>
                        <a href="/events" className="btn btn-primary">Locate Events</a>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '30px' }}>
                        {registrations.map(reg => (
                            <div key={reg._id} className="glass-morphism" style={{ padding: '35px', borderLeft: `4px solid ${reg.status === 'registered' || reg.status === 'paid' ? 'var(--primary)' : 'var(--accent)'}` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
                                    <span className="tech-font" style={{
                                        padding: '4px 12px',
                                        background: 'rgba(255,255,255,0.05)',
                                        color: reg.status === 'registered' || reg.status === 'paid' ? 'var(--primary)' : 'var(--accent)',
                                        borderRadius: '4px',
                                        fontSize: '0.65rem',
                                        fontWeight: '800'
                                    }}>
                                        STATUS::{reg.status.toUpperCase()}
                                    </span>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-tech)' }}>ID_{reg._id.substring(reg._id.length - 6).toUpperCase()}</span>
                                </div>
                                <h3 className="tech-font" style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#fff' }}>{reg.event?.title || 'NULL_ENTITY'}</h3>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '20px' }}>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-tech)' }}>ACCESS_TOKEN_VERIFIED</p>
                                    <p className="tech-font" style={{ color: 'var(--primary)', fontSize: '1rem' }}>₹{reg.event?.fee || 0}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
