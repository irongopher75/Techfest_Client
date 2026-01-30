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

    const handleRegister = async (event) => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (!window.confirm(`Register for ${event.title}?`)) return;

        setSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`${API_BASE_URL}/api/registrations/register`,
                { eventId: event._id },
                { headers: { 'x-auth-token': token } }
            );

            alert(res.data.message || 'Registration successful!');
            navigate('/profile');
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.response?.data?.error || err.message || 'Error during registration';
            alert(`Registration failed: ${errorMsg}`);
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
            <div className="container animate-fade-in" style={{ paddingBottom: '100px', paddingTop: window.innerWidth < 768 ? '40px' : '60px' }}>
                <header style={{ textAlign: 'center', padding: window.innerWidth < 768 ? '40px 0' : '60px 0' }}>
                    <h1 className="section-title" style={{ fontSize: window.innerWidth < 768 ? '2rem' : '3.5rem' }}>THE ARENA</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: window.innerWidth < 768 ? '0.9rem' : '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                        Browse the specialized zones and claim your spot in the future of innovation.
                    </p>
                </header>

                {/* Category Filter */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: window.innerWidth < 768 ? '10px' : '15px', marginBottom: window.innerWidth < 768 ? '40px' : '80px', flexWrap: 'wrap', padding: '0 10px' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`btn ${category === cat ? 'btn-primary' : 'btn-outline'}`}
                            style={{ padding: window.innerWidth < 768 ? '6px 15px' : '8px 25px', fontSize: window.innerWidth < 768 ? '0.65rem' : '0.75rem' }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Events Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: window.innerWidth < 768 ? '20px' : '40px' }}>
                    {filteredEvents.map(event => (
                        <div key={event._id} className="glass-morphism" style={{ border: '1px solid var(--glass-border)', overflow: 'hidden' }}>
                            <div style={{
                                height: window.innerWidth < 768 ? '100px' : '140px',
                                background: `linear-gradient(135deg, ${event.category === 'Technical' ? 'var(--primary)' : event.category === 'Workshop' ? 'var(--secondary)' : 'var(--accent)'}, #000)`,
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <div className="tech-font" style={{ opacity: 0.1, fontSize: window.innerWidth < 768 ? '2.5rem' : '4rem', fontWeight: '900', color: '#fff' }}>
                                    {event.category.substring(0, 4)}
                                </div>
                                <div style={{ position: 'absolute', bottom: '10px', right: '15px', color: 'rgba(255,255,255,0.7)', fontSize: '0.6rem', fontWeight: '800' }}>
                                    ZONE_{event.category.toUpperCase()}
                                </div>
                            </div>
                            <div style={{ padding: window.innerWidth < 768 ? '20px' : '30px' }}>
                                <h3 className="tech-font" style={{ fontSize: window.innerWidth < 768 ? '1.1rem' : '1.3rem', marginBottom: '10px', color: '#fff' }}>{event.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px', height: window.innerWidth < 768 ? 'auto' : '55px', overflow: 'hidden' }}>{event.description}</p>

                                <div style={{
                                    display: 'flex',
                                    flexDirection: window.innerWidth < 375 ? 'column' : 'row',
                                    gap: window.innerWidth < 375 ? '5px' : '20px',
                                    color: 'var(--text-muted)',
                                    fontSize: '0.7rem',
                                    marginBottom: '20px',
                                    fontFamily: 'var(--font-tech)'
                                }}>
                                    <span>[ DATE: {new Date(event.date).toLocaleDateString()} ]</span>
                                    <span>[ LOC: {event.venue} ]</span>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '20px' }}>
                                    <div>
                                        <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Protocol Fee</div>
                                        <div className="tech-font" style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--primary)' }}>₹{event.fee}</div>
                                    </div>
                                    <button
                                        onClick={() => handleRegister(event)}
                                        disabled={submitting}
                                        className="btn btn-primary"
                                        style={{ padding: '8px 20px', fontSize: '0.7rem' }}
                                    >
                                        {submitting ? '...' : 'INITIALIZE'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

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
