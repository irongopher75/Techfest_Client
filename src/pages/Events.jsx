import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import ConfirmModal from '../components/ConfirmModal';

const Events = () => {
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [category, setCategory] = useState('All');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [submitting, setSubmitting] = useState(false);
    const [showTeamModal, setShowTeamModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [teamName, setTeamName] = useState('');
    const [teamMembers, setTeamMembers] = useState([]); // List of user objects
    const [searchUsername, setSearchUsername] = useState('');
    const [searching, setSearching] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [eventToRegister, setEventToRegister] = useState(null);

    const categories = ['All', 'Technical', 'Workshop', 'Cultural', 'Gaming', 'Creative'];

    const { data: events = [], isLoading: eventsLoading } = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const res = await api.get('/api/events');
            return res.data;
        }
    });

    useEffect(() => {
        if (!searchUsername) return;
        const delayDebounceFn = setTimeout(() => {
            handleFindMember();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchUsername]);

    useEffect(() => {
        if (category === 'All') {
            setFilteredEvents(events);
        } else {
            setFilteredEvents(events.filter(e => e.category === category));
        }
    }, [category, events]);

    const handleRegister = (event) => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (event.eventType === 'group') {
            setSelectedEvent(event);
            setTeamMembers([]);
            setTeamName('');
            setShowTeamModal(true);
            return;
        }

        if (event.fee > 0) {
            navigate('/payment', { state: { event } });
        } else {
            setEventToRegister(event);
            setShowConfirmModal(true);
        }
    };

    const handleFindMember = async () => {
        if (teamMembers.some(m => m.username === searchUsername) || user.username === searchUsername) {
            return toast.error('User already in team');
        }

        setSearching(true);
        try {
            const res = await api.get(`/api/users/find/${searchUsername}`);
            setTeamMembers([...teamMembers, res.data]);
            setSearchUsername('');
            toast.success('Operative added to squad.');
        } catch (err) {
            // Silently fail or minimal feedback for debounced search
        } finally {
            setSearching(false);
        }
    };

    const handleProceed = () => {
        if (!teamName) return toast.error('Enter team name');
        if (teamMembers.length + 1 < 2) return toast.error('Add at least one teammate');

        const teamData = {
            teamName,
            teamMembers: teamMembers.map(m => m._id),
            teamMemberNames: teamMembers.map(m => m.username)
        };

        if (selectedEvent.fee > 0) {
            navigate('/payment', { state: { event: selectedEvent, ...teamData } });
        } else {
            registerDirectly(selectedEvent, teamData);
        }
    };

    const registerDirectly = async (event, teamData = {}) => {
        setSubmitting(true);
        try {
            await api.post('/api/registrations/register', { eventId: event._id, ...teamData });
            toast.success('Registration successful!');
            navigate('/profile');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed');
        } finally {
            setSubmitting(false);
        }
    };

    if (eventsLoading) return (
        <div className="container" style={{ textAlign: 'center', padding: '150px 0' }}>
            <div className="tech-font" style={{ fontSize: '1.2rem', color: 'var(--primary)', letterSpacing: '2px' }}>SYCHRONIZING DATA...</div>
        </div>
    );

    return (
        <div className="grid-bg" style={{ minHeight: '100vh' }}>
            <div className="container animate-fade-in" style={{ paddingBottom: '100px', paddingTop: window.innerWidth < 768 ? '40px' : '100px' }}>
                <header style={{ textAlign: 'center', position: 'relative' }} className="responsive-header">
                    {/* Header Decorative Elements */}
                    <div style={{
                        position: 'absolute',
                        top: '0',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '200px',
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
                        opacity: 0.5
                    }}></div>

                    <h1 className="section-title responsive-title" style={{ textShadow: '0 0 20px var(--primary-glow)' }}>THE ARENA</h1>
                    <p className="tech-font" style={{ color: 'var(--primary)', fontSize: '0.8rem', letterSpacing: '4px', marginBottom: '15px' }}>SECTOR: GLOBAL_COMPETITIONS</p>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.8' }} className="responsive-p">
                        Browse the specialized zones and claim your spot in the future of innovation. Synchronize your skills with industry pioneers.
                    </p>
                </header>

                {/* Category Filter */}
                <div className="filter-container">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            aria-label={`Filter events by ${cat} category`}
                            onClick={() => setCategory(cat)}
                            className={`btn ${category === cat ? 'btn-primary' : 'btn-outline'} filter-btn`}
                            style={{
                                border: category === cat ? 'none' : '1px solid var(--glass-border)'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Events Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: window.innerWidth < 768 ? '25px' : '40px' }}>
                    {filteredEvents.map(event => (
                        <div key={event._id} className={`tech-card ${event.category === 'Technical' || event.category === 'Coding' ? 'border-glow-purple' : 'border-glow-cyan'}`} style={{ padding: '0', overflow: 'hidden', background: 'var(--glass)' }}>
                            <div style={{
                                height: window.innerWidth < 768 ? '120px' : '160px',
                                background: `linear-gradient(135deg, ${event.category === 'Technical' || event.category === 'Coding' ? 'var(--primary)' : 'var(--secondary)'}, #000)`,
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <div className="tech-font" style={{ opacity: 0.1, fontSize: window.innerWidth < 768 ? '3rem' : '5rem', fontWeight: '900', color: '#fff' }}>
                                    {event.category.substring(0, 4)}
                                </div>
                                <div className="tech-font" style={{ position: 'absolute', bottom: '15px', right: '20px', color: 'rgba(255,255,255,0.7)', fontSize: '0.65rem', fontWeight: '800', letterSpacing: '2px' }}>
                                    SYSTEM_{event.category.toUpperCase()}
                                </div>
                            </div>
                            <div style={{ padding: window.innerWidth < 768 ? '25px' : '35px' }}>
                                <h3 className="tech-font" style={{ fontSize: window.innerWidth < 768 ? '1.2rem' : '1.5rem', marginBottom: '15px', color: '#fff', letterSpacing: '1px' }}>{event.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '25px', height: '60px', overflow: 'hidden', lineHeight: '1.6' }}>{event.description}</p>

                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px',
                                    color: 'var(--primary)',
                                    fontSize: '0.7rem',
                                    marginBottom: '25px',
                                    fontFamily: 'var(--font-tech)',
                                    letterSpacing: '1px'
                                }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '4px', height: '4px', background: 'var(--primary)' }}></div>
                                        SCHEDULE: {new Date(event.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '4px', height: '4px', background: 'var(--accent)' }}></div>
                                        MODE: {event.eventType === 'group' ? `TEAM (MAX ${event.maxTeamSize})` : 'SOLO'}
                                    </span>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '25px' }}>
                                    <div>
                                        <div className="tech-font" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px' }}>STAKE_CREDITS</div>
                                        <div className="tech-font" style={{ fontSize: '1.2rem', fontWeight: '800', color: '#fff' }}>₹{event.fee}</div>
                                    </div>
                                    <button
                                        onClick={() => handleRegister(event)}
                                        disabled={submitting}
                                        aria-label={event.eventType === 'group' ? `Initialize team registration for ${event.title}` : `Register for ${event.title}`}
                                        className="btn btn-primary"
                                        style={{ padding: '12px 25px', fontSize: '0.8rem' }}
                                    >
                                        {submitting ? '...' : (event.eventType === 'group' ? 'INIT_TEAM' : 'ACCESS_PROTOCOL')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Team Registration Modal */}
                {showTeamModal && selectedEvent && (
                    <div style={{
                        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                        background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
                        zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
                    }}>
                        <div className="glass-morphism animate-fade-in" style={{ width: '100%', maxWidth: '500px', padding: '40px', border: '1px solid var(--primary)' }}>
                            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                                <h3 className="tech-font" style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '10px' }}>SQUAD_CONFIG</h3>
                                <p className="tech-font" style={{ color: 'var(--primary)', fontSize: '0.7rem' }}>EVENT: {selectedEvent.title.toUpperCase()}</p>
                            </div>

                            <div style={{ marginBottom: '25px' }}>
                                <label className="tech-font" style={{ display: 'block', marginBottom: '10px', color: 'var(--text-muted)', fontSize: '0.65rem' }}>[ TEAM_NAME ]</label>
                                <input className="glass-morphism" value={teamName} onChange={e => setTeamName(e.target.value)} placeholder="e.g. CYBER_SHARKS" style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid var(--glass-border)', outline: 'none' }} />
                            </div>

                            <div style={{ marginBottom: '30px' }}>
                                <label className="tech-font" style={{ display: 'block', marginBottom: '10px', color: 'var(--text-muted)', fontSize: '0.65rem' }}>[ ADD_OPERATIVES_BY_USERNAME ]</label>
                                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                                    <input className="glass-morphism" value={searchUsername} onChange={e => setSearchUsername(e.target.value)} placeholder="username" style={{ flex: 1, padding: '10px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid var(--glass-border)', fontSize: '0.85rem', outline: 'none' }} />
                                    {searching && <div className="tech-font" style={{ fontSize: '0.6rem', color: 'var(--primary)' }}>SCANNING...</div>}
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div className="tech-font" style={{ fontSize: '0.75rem', color: 'var(--primary)', padding: '10px', background: 'rgba(0, 242, 255, 0.05)', borderRadius: '4px' }}>
                                        👤 {user.username} (LEADER)
                                    </div>
                                    {teamMembers.map(member => (
                                        <div key={member._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: '1px solid var(--glass-border)', borderRadius: '4px' }}>
                                            <span style={{ fontSize: '0.85rem', color: '#fff' }}>👤 {member.username}</span>
                                            <button onClick={() => setTeamMembers(teamMembers.filter(m => m._id !== member._id))} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
                                        </div>
                                    ))}
                                    <div style={{ textAlign: 'center', marginTop: '10px', color: 'var(--text-muted)', fontSize: '0.65rem' }} className="tech-font">
                                        CAPACITY: {teamMembers.length + 1} / {selectedEvent.maxTeamSize}
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '15px' }}>
                                <button onClick={() => setShowTeamModal(false)} className="btn btn-outline" style={{ flex: 1 }}>CANCEL</button>
                                <button onClick={handleProceed} disabled={!teamName || teamMembers.length < 1} className="btn btn-primary" style={{ flex: 1 }}>PROCEED</button>
                            </div>
                        </div>
                    </div>
                )}

                {filteredEvents.length === 0 && (
                    <div className="tech-font" style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-muted)', letterSpacing: '2px' }}>
                        DATA_NOT_FOUND: NO ENTRIES IN THIS SECTOR.
                    </div>
                )}
            </div>

            <ConfirmModal
                isOpen={showConfirmModal}
                title="CONFIRM_REGISTRATION"
                message={`Are you sure you want to register for ${eventToRegister?.title}? This action cannot be undone.`}
                onConfirm={() => {
                    registerDirectly(eventToRegister);
                    setShowConfirmModal(false);
                }}
                onCancel={() => setShowConfirmModal(false)}
            />
        </div>
    );
};

export default Events;
