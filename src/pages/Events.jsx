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

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleRegister = async (event) => {
        if (!user) {
            navigate('/login');
            return;
        }

        const res = await loadRazorpay();
        if (!res) {
            alert('Razorpay SDK failed to load.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const orderRes = await axios.post(`${API_BASE_URL}/api/payments/create-order`,
                { eventId: event._id },
                { headers: { 'x-auth-token': token } }
            );

            const { amount, id: order_id, currency } = orderRes.data;

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'your_test_key',
                amount: amount.toString(),
                currency: currency,
                name: "Techfest Portal",
                description: `Payment for ${event.title}`,
                order_id: order_id,
                handler: async (response) => {
                    try {
                        const verifyRes = await axios.post(`${API_BASE_URL}/api/payments/verify`,
                            response,
                            { headers: { 'x-auth-token': token } }
                        );
                        if (verifyRes.data.success) {
                            alert('Payment successful!');
                            navigate('/profile');
                        }
                    } catch (err) {
                        alert('Verification failed');
                    }
                },
                prefill: { name: user.name, email: user.email },
                theme: { color: "#6366f1" }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            alert('Error with payment order');
        }
    };

    if (loading) return (
        <div className="container" style={{ textAlign: 'center', padding: '150px 0' }}>
            <div className="animate-pulse" style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>Initializing Events...</div>
        </div>
    );

    return (
        <div className="container animate-fade-in" style={{ paddingBottom: '100px' }}>
            <header style={{ textAlign: 'center', padding: '60px 0' }}>
                <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '16px' }}>
                    Unleash Your <span style={{ color: 'var(--primary)' }}>Potential</span>
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Browse and register for the most exciting tech challenges.</p>
            </header>

            {/* Category Filter */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '60px', flexWrap: 'wrap' }}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`btn ${category === cat ? 'btn-primary' : 'glass-morphism'}`}
                        style={{ padding: '10px 24px', borderRadius: '30px' }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Events Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '40px' }}>
                {filteredEvents.map(event => (
                    <div key={event._id} className="glass-morphism event-card-enhanced" style={{ transition: 'all 0.3s ease' }}>
                        <div style={{
                            height: '180px',
                            background: `linear-gradient(135deg, ${event.category === 'Technical' ? 'var(--primary)' : event.category === 'Workshop' ? 'var(--secondary)' : 'var(--accent)'}, #000)`,
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{ position: 'absolute', bottom: '15px', left: '20px', background: 'rgba(0,0,0,0.5)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', backdropFilter: 'blur(4px)' }}>
                                {event.category.toUpperCase()}
                            </div>
                        </div>
                        <div style={{ padding: '25px' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{event.title}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px', height: '60px', overflow: 'hidden' }}>{event.description}</p>

                            <div style={{ display: 'flex', gap: '15px', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>
                                <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                                <span>📍 {event.venue}</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '20px' }}>
                                <div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Entry Fee</div>
                                    <div style={{ fontSize: '1.4rem', fontWeight: '800' }}>₹{event.fee}</div>
                                </div>
                                <button onClick={() => handleRegister(event)} className="btn btn-primary" style={{ padding: '12px 28px' }}>Register</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredEvents.length === 0 && (
                <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-muted)' }}>
                    No events found in this category. Check back soon!
                </div>
            )}
        </div>
    );
};

export default Events;
