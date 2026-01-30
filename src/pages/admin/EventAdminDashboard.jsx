import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config/api';

const EventAdminDashboard = () => {
    const [registrations, setRegistrations] = useState([]);
    const [events, setEvents] = useState([]); // Only assigned events
    const [loading, setLoading] = useState(true);
    const [editingEvent, setEditingEvent] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const headers = { 'x-auth-token': token };

            const [regsRes, eventsRes] = await Promise.all([
                axios.get(`${API_BASE_URL}/api/registrations/all`, { headers }),
                axios.get(`${API_BASE_URL}/api/events`, { headers }) // We will filter this on frontend for now or use a specialized route
            ]);

            setRegistrations(regsRes.data);

            // Get user info from local storage to find assigned IDs
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.role !== 'superior_admin') {
                const assignedIds = user.assignedEvents || [];
                setEvents(eventsRes.data.filter(e => assignedIds.includes(e._id)));
            } else {
                setEvents(eventsRes.data); // Superior sees all
            }
        } catch (err) {
            console.error('Error fetching event admin data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateEvent = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${API_BASE_URL}/api/events/${editingEvent._id}`,
                editingEvent,
                { headers: { 'x-auth-token': token } }
            );
            alert('Event sector updated successfully.');
            setEditingEvent(null);
            fetchData();
        } catch (err) {
            alert('Update failed: ' + (err.response?.data?.message || err.message));
        }
    };

    if (loading) return <div className="grid-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="tech-font animate-pulse">ACCESSING_ASSIGNED_SECTORS...</div></div>;

    return (
        <div className="grid-bg" style={{ minHeight: '100vh', paddingTop: '60px' }}>
            <div className="container animate-fade-in" style={{ paddingBottom: '100px' }}>
                <header style={{ marginBottom: '60px' }}>
                    <h1 className="section-title">SECTOR_CONTROL</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Managing delegated infrastructure and participant streams.</p>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px', marginBottom: '80px' }}>
                    {events.map(event => (
                        <div key={event._id} className="glass-morphism" style={{ padding: '30px', borderTop: '3px solid var(--primary)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <span className="tech-font" style={{ fontSize: '0.6rem', color: 'var(--primary)' }}>[ ID::{event._id.substring(0, 8)} ]</span>
                                <button onClick={() => setEditingEvent(event)} className="btn btn-outline" style={{ padding: '4px 12px', fontSize: '0.6rem' }}>MODIFY_SECTOR</button>
                            </div>
                            <h3 className="tech-font" style={{ marginBottom: '10px' }}>{event.title}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '20px' }}>{event.description.substring(0, 100)}...</p>
                            <div className="tech-font" style={{ fontSize: '0.7rem', display: 'flex', gap: '15px' }}>
                                <span>LOC: {event.venue}</span>
                                <span>PRICE: ₹{event.fee}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {editingEvent && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
                        <div className="glass-morphism" style={{ width: '100%', maxWidth: '600px', padding: '40px', border: '1px solid var(--primary)' }}>
                            <h2 className="tech-font" style={{ marginBottom: '30px' }}>RECONFIGURE_SECTOR</h2>
                            <form onSubmit={handleUpdateEvent}>
                                <div style={{ marginBottom: '20px' }}>
                                    <label className="tech-font" style={{ display: 'block', fontSize: '0.6rem', marginBottom: '8px' }}>TITLE</label>
                                    <input
                                        type="text"
                                        className="tech-font"
                                        style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: '#fff' }}
                                        value={editingEvent.title}
                                        onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                                    />
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <label className="tech-font" style={{ display: 'block', fontSize: '0.6rem', marginBottom: '8px' }}>DESCRIPTION</label>
                                    <textarea
                                        style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: '#fff', height: '100px' }}
                                        value={editingEvent.description}
                                        onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                                    />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                                    <div>
                                        <label className="tech-font" style={{ display: 'block', fontSize: '0.6rem', marginBottom: '8px' }}>VENUE</label>
                                        <input
                                            type="text"
                                            style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: '#fff' }}
                                            value={editingEvent.venue}
                                            onChange={(e) => setEditingEvent({ ...editingEvent, venue: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="tech-font" style={{ display: 'block', fontSize: '0.6rem', marginBottom: '8px' }}>FEE (INR)</label>
                                        <input
                                            type="number"
                                            style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: '#fff' }}
                                            value={editingEvent.fee}
                                            onChange={(e) => setEditingEvent({ ...editingEvent, fee: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '15px' }}>
                                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>SAVE_CHANGES</button>
                                    <button type="button" onClick={() => setEditingEvent(null)} className="btn btn-outline" style={{ flex: 1 }}>ABORT</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <h2 className="tech-font" style={{ marginBottom: '40px', fontSize: '1.2rem', color: 'var(--primary)' }}>PARTICIPANT_STREAM</h2>
                <div className="glass-morphism" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff', fontSize: '0.8rem' }}>
                            <thead>
                                <tr style={{ background: 'rgba(255,255,255,0.03)', textAlign: 'left' }}>
                                    <th style={{ padding: '20px' }}>UNIT_NAME</th>
                                    <th style={{ padding: '20px' }}>PORT_EMAIL</th>
                                    <th style={{ padding: '20px' }}>TARGET_EVENT</th>
                                    <th style={{ padding: '20px' }}>CAMPUS</th>
                                    <th style={{ padding: '20px' }}>STAMP</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registrations.map(reg => (
                                    <tr key={reg._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '20px' }}>{reg.user?.name}</td>
                                        <td style={{ padding: '20px' }}>{reg.user?.email}</td>
                                        <td style={{ padding: '20px' }} className="tech-font">{reg.event?.title}</td>
                                        <td style={{ padding: '20px' }}>{reg.user?.college}</td>
                                        <td style={{ padding: '20px' }}>{new Date(reg.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventAdminDashboard;
