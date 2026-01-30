import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/api';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [category, setCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [submitting, setSubmitting] = useState(false);
    const [showTeamModal, setShowTeamModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [teamName, setTeamName] = useState('');
    const [teamMembers, setTeamMembers] = useState([]); // List of user objects
    const [searchUsername, setSearchUsername] = useState('');
    const [searching, setSearching] = useState(false);

    const categories = ['All', 'Technical', 'Workshop', 'Cultural', 'Gaming', 'Creative'];

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/events`);
                setEvents(res.data);
                setFilteredEvents(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching events', err);
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

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
            if (!window.confirm(`Register for ${event.title}?`)) return;
            registerDirectly(event);
        }
    };

    const handleFindMember = async () => {
        if (!searchUsername) return;
        if (teamMembers.some(m => m.username === searchUsername) || user.username === searchUsername) {
            return alert('User already in team');
        }

        setSearching(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${API_BASE_URL}/api/users/find/${searchUsername}`, {
                headers: { 'x-auth-token': token }
            });
            setTeamMembers([...teamMembers, res.data]);
            setSearchUsername('');
        } catch (err) {
            alert(err.response?.data?.message || 'User not found');
        } finally {
            setSearching(false);
        }
    };

    const handleProceed = () => {
        if (!teamName) return alert('Enter team name');
        if (teamMembers.length + 1 < 2) return alert('Add at least one teammate');

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
            const token = localStorage.getItem('token');
            await axios.post(`${API_BASE_URL}/api/registrations/register`,
                { eventId: event._id, ...teamData },
                { headers: { 'x-auth-token': token } }
            );
            alert('Registration successful!');
            navigate('/profile');
        } catch (err) {
            alert(err.response?.data?.message || 'Registration failed');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="container" style={{ textAlign: 'center', padding: '150px 0' }}>
            <div className="tech-font" style={{ fontSize: '1.2rem', color: 'var(--primary)', letterSpacing: '2px' }}>SYCHRONIZING DATA...</div>
        </div>
    );

    return (
        <div className="grid-bg" style={{ minHeight: '100vh' }}>
            <div className="container animate-fade-in" style={{ paddingBottom: '100px', paddingTop: window.innerWidth < 768 ? '40px' : '100px' }}>
                <header style={{ textAlign: 'center', padding: window.innerWidth < 768 ? '40px 0' : '80px 0', position: 'relative' }}>
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

                    <h1 className="section-title" style={{ fontSize: window.innerWidth < 768 ? '2rem' : '4rem', textShadow: '0 0 20px var(--primary-glow)' }}>THE ARENA</h1>
                    <p className="tech-font" style={{ color: 'var(--primary)', fontSize: '0.8rem', letterSpacing: '4px', marginBottom: '15px' }}>SECTOR: GLOBAL_COMPETITIONS</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: window.innerWidth < 768 ? '0.9rem' : '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.8' }}>
                        Browse the specialized zones and claim your spot in the future of innovation. Synchronize your skills with industry pioneers.
                    </p>
                </header>

                {/* Category Filter */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: window.innerWidth < 768 ? '10px' : '15px', marginBottom: window.innerWidth < 768 ? '40px' : '80px', flexWrap: 'wrap', padding: '0 10px' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`btn ${category === cat ? 'btn-primary' : 'btn-outline'}`}
                            style={{
                                padding: window.innerWidth < 768 ? '8px 15px' : '12px 30px',
                                fontSize: window.innerWidth < 768 ? '0.65rem' : '0.8rem',
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
                                    <button onClick={handleFindMember} disabled={searching || teamMembers.length + 1 >= selectedEvent.maxTeamSize} className="btn btn-outline" style={{ padding: '0 15px', fontSize: '0.7rem' }}>
                                        {searching ? '...' : 'SEARCH'}
                                    </button>
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
        </div>
    );
};

export default Events;
