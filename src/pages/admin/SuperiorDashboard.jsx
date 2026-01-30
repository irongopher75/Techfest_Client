import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config/api';

const SuperiorDashboard = () => {
    const [admins, setAdmins] = useState([]);
    const [events, setEvents] = useState([]);
    const [pendingAdmins, setPendingAdmins] = useState([]);
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const headers = { 'x-auth-token': token };

            const [adminsRes, eventsRes, regsRes] = await Promise.all([
                axios.get(`${API_BASE_URL}/api/auth/admins/all`, { headers }),
                axios.get(`${API_BASE_URL}/api/events`, { headers }),
                axios.get(`${API_BASE_URL}/api/registrations/all`, { headers })
            ]);

            setAdmins(adminsRes.data);
            setEvents(eventsRes.data);
            setRegistrations(regsRes.data);
            setPendingAdmins(adminsRes.data.filter(a => !a.isApproved));
        } catch (err) {
            console.error('Error fetching admin data:', err);
        } finally {
            setLoading(false);
        }
    };

    const [eventForm, setEventForm] = useState({
        title: '', description: '', fee: '', day: '', month: '', year: '', venue: '', category: 'Technical'
    });

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        try {
            const { title, description, fee, day, month, year, venue, category } = eventForm;

            // Format date correctly for backend
            const date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

            const token = localStorage.getItem('token');
            await axios.post(`${API_BASE_URL}/api/events`, {
                title, description, fee, date, venue, category
            }, { headers: { 'x-auth-token': token } });

            alert('Event created successfully!');
            setEventForm({ title: '', description: '', fee: '', day: '', month: '', year: '', venue: '', category: 'Technical' });
            fetchData();
        } catch (err) {
            console.error('Event Creation Error:', err);
            alert(`Failed to create event: ${err.response?.data?.message || err.message}`);
        }
    };

    const handleVerifyRegistration = async (regId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${API_BASE_URL}/api/registrations/verify/${regId}`, {}, { headers: { 'x-auth-token': token } });
            alert('Registration verified!');
            fetchData();
        } catch (err) {
            alert('Failed to verify');
        }
    };

    const handleEventDelete = async (eventId) => {
        if (!window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_BASE_URL}/api/events/${eventId}`, { headers: { 'x-auth-token': token } });
            alert('Event deleted successfully!');
            fetchData();
        } catch (err) {
            console.error('Event Deletion Error:', err);
            alert(`Failed to delete event: ${err.response?.data?.message || err.message}`);
        }
    };

    const handleApprove = async (adminId, assignedEvents) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${API_BASE_URL}/api/auth/admins/update/${adminId}`,
                { isApproved: true, assignedEvents },
                { headers: { 'x-auth-token': token } }
            );
            fetchData();
            alert('Admin approved and events assigned.');
        } catch (err) {
            alert('Failed to approve admin');
        }
    };

    const updateAssignments = async (adminId, assignedEvents) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${API_BASE_URL}/api/auth/admins/update/${adminId}`,
                { assignedEvents },
                { headers: { 'x-auth-token': token } }
            );
            fetchData();
            alert('Assignments updated.');
        } catch (err) {
            alert('Failed to update assignments');
        }
    };

    if (loading) return <div className="grid-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="tech-font animate-pulse">SYNCHRONIZING_GLOBAL_CONSOLE...</div></div>;

    const stats = {
        totalRegs: registrations.length,
        totalRevenue: registrations.reduce((acc, reg) => acc + (reg.event?.fee || 0), 0),
        activeAdmins: admins.filter(a => a.isApproved).length,
        pendingAdmins: pendingAdmins.length
    };

    return (
        <div className="grid-bg" style={{ minHeight: '100vh', paddingTop: '100px' }}>
            <div className="container animate-fade-in" style={{ paddingBottom: '100px' }}>
                <header style={{ marginBottom: '60px' }}>
                    <h1 className="section-title">SUPERIOR_CONSOLE</h1>
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        {['overview', 'admins', 'events', 'registrations'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-outline'}`}
                                style={{ padding: '8px 20px', fontSize: '0.7rem' }}
                            >
                                {tab.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </header>

                {activeTab === 'overview' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '30px', marginBottom: '60px' }}>
                        <div className="glass-morphism" style={{ padding: '30px', borderLeft: '4px solid var(--primary)' }}>
                            <div className="tech-font" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>TOTAL_REGISTRATIONS</div>
                            <div className="tech-font" style={{ fontSize: '2rem', color: '#fff' }}>{stats.totalRegs}</div>
                        </div>
                        <div className="glass-morphism" style={{ padding: '30px', borderLeft: '4px solid var(--secondary)' }}>
                            <div className="tech-font" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ESTIMATED_REVENUE</div>
                            <div className="tech-font" style={{ fontSize: '2rem', color: '#fff' }}>₹{stats.totalRevenue}</div>
                        </div>
                        <div className="glass-morphism" style={{ padding: '30px', borderLeft: '4px solid var(--accent)' }}>
                            <div className="tech-font" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>PENDING_APPROVALS</div>
                            <div className="tech-font" style={{ fontSize: '2rem', color: '#fff' }}>{stats.pendingAdmins}</div>
                        </div>
                    </div>
                )}

                {activeTab === 'admins' && (
                    <div className="glass-morphism" style={{ padding: '40px' }}>
                        <h3 className="tech-font" style={{ marginBottom: '30px', fontSize: '1.2rem', color: 'var(--primary)' }}>ENTITY_MANAGEMENT</h3>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff', fontSize: '0.85rem' }}>
                                <thead>
                                    <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                                        <th style={{ padding: '15px' }}>NAME</th>
                                        <th style={{ padding: '15px' }}>EMAIL</th>
                                        <th style={{ padding: '15px' }}>ROLE</th>
                                        <th style={{ padding: '15px' }}>STATUS</th>
                                        <th style={{ padding: '15px' }}>ASSIGNMENTS</th>
                                        <th style={{ padding: '15px' }}>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {admins.map(admin => (
                                        <tr key={admin._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <td style={{ padding: '15px' }}>{admin.name}</td>
                                            <td style={{ padding: '15px' }}>{admin.email}</td>
                                            <td style={{ padding: '15px' }} className="tech-font">{admin.role.toUpperCase()}</td>
                                            <td style={{ padding: '15px' }}>
                                                <span style={{ color: admin.isApproved ? 'var(--primary)' : 'var(--accent)' }}>
                                                    {admin.isApproved ? 'APPROVED' : 'PENDING'}
                                                </span>
                                            </td>
                                            <td style={{ padding: '15px' }}>
                                                {admin.assignedEvents?.map(e => e.title).join(', ') || 'NONE'}
                                            </td>
                                            <td style={{ padding: '15px' }}>
                                                {!admin.isApproved && (
                                                    <button
                                                        onClick={() => {
                                                            const ids = prompt('Enter comma separated Event IDs to assign:');
                                                            if (ids) handleApprove(admin._id, ids.split(',').map(id => id.trim()));
                                                            else handleApprove(admin._id, []);
                                                        }}
                                                        className="btn btn-primary"
                                                        style={{ padding: '5px 12px', fontSize: '0.6rem' }}
                                                    >
                                                        APPROVE
                                                    </button>
                                                )}
                                                {admin.role === 'event_admin' && admin.isApproved && (
                                                    <button
                                                        onClick={() => {
                                                            const ids = prompt('Enter NEW comma separated Event IDs:', admin.assignedEvents.map(e => e._id).join(', '));
                                                            if (ids !== null) updateAssignments(admin._id, ids.split(',').map(id => id.trim()));
                                                        }}
                                                        className="btn btn-outline"
                                                        style={{ padding: '5px 12px', fontSize: '0.6rem' }}
                                                    >
                                                        RE-ASSIGN
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'events' && (
                    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '40px' }}>
                        <div className="glass-morphism" style={{ padding: '30px' }}>
                            <h3 className="tech-font" style={{ marginBottom: '25px', fontSize: '1.1rem', color: 'var(--primary)' }}>CREATE_EVENT_INSTANCE</h3>
                            <form onSubmit={handleCreateEvent}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    <input className="glass-morphism" placeholder="TITLE" style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid var(--glass-border)' }} value={eventForm.title} onChange={e => setEventForm({ ...eventForm, title: e.target.value })} required />
                                    <textarea className="glass-morphism" placeholder="DESCRIPTION" style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid var(--glass-border)', minHeight: '100px' }} value={eventForm.description} onChange={e => setEventForm({ ...eventForm, description: e.target.value })} required />
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px' }}>
                                        <input type="number" className="glass-morphism" placeholder="FEE (₹)" style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid var(--glass-border)' }} value={eventForm.fee} onChange={e => setEventForm({ ...eventForm, fee: e.target.value })} required />
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr', gap: '5px' }}>
                                            <input type="number" className="glass-morphism" placeholder="DD" style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid var(--glass-border)', fontSize: '0.8rem' }} value={eventForm.day} onChange={e => { if (e.target.value.length <= 2) setEventForm({ ...eventForm, day: e.target.value }) }} required min="1" max="31" />
                                            <input type="number" className="glass-morphism" placeholder="MM" style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid var(--glass-border)', fontSize: '0.8rem' }} value={eventForm.month} onChange={e => { if (e.target.value.length <= 2) setEventForm({ ...eventForm, month: e.target.value }) }} required min="1" max="12" />
                                            <input type="number" className="glass-morphism" placeholder="YYYY" style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid var(--glass-border)', fontSize: '0.8rem' }} value={eventForm.year} onChange={e => { if (e.target.value.length <= 4) setEventForm({ ...eventForm, year: e.target.value }) }} required />
                                        </div>
                                    </div>
                                    <input className="glass-morphism" placeholder="VENUE" style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid var(--glass-border)' }} value={eventForm.venue} onChange={e => setEventForm({ ...eventForm, venue: e.target.value })} required />
                                    <select className="glass-morphism" style={{ padding: '12px', background: '#111', color: '#fff', border: '1px solid var(--glass-border)' }} value={eventForm.category} onChange={e => setEventForm({ ...eventForm, category: e.target.value })}>
                                        {['Technical', 'Workshop', 'Cultural', 'Gaming', 'Creative'].map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                    <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>DISPATCH_EVENT</button>
                                </div>
                            </form>
                        </div>
                        <div className="glass-morphism" style={{ padding: '30px', overflowY: 'auto', maxHeight: '600px' }}>
                            <h3 className="tech-font" style={{ marginBottom: '25px', fontSize: '1.1rem', color: 'var(--secondary)' }}>ACTIVE_INSTANCES</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {events.map(event => (
                                    <div key={event._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div>
                                            <div className="tech-font" style={{ fontSize: '0.9rem' }}>{event.title}</div>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{event.category} | ₹{event.fee}</div>
                                            <div className="tech-font" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '5px' }}>ID: {event._id}</div>
                                        </div>
                                        <button
                                            onClick={() => handleEventDelete(event._id)}
                                            className="btn btn-outline"
                                            style={{ color: 'var(--accent)', borderColor: 'var(--accent)', padding: '5px 10px', fontSize: '0.6rem' }}
                                        >
                                            DELETE
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'registrations' && (
                    <div className="glass-morphism" style={{ padding: '40px' }}>
                        <h3 className="tech-font" style={{ marginBottom: '30px', fontSize: '1.2rem', color: 'var(--primary)' }}>GLOBAL_DATA_STREAM</h3>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff', fontSize: '0.85rem' }}>
                                <thead>
                                    <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                                        <th style={{ padding: '15px' }}>USER</th>
                                        <th style={{ padding: '15px' }}>EVENT</th>
                                        <th style={{ padding: '15px' }}>UTI_/_UTR</th>
                                        <th style={{ padding: '15px' }}>STATUS</th>
                                        <th style={{ padding: '15px' }}>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registrations.map(reg => (
                                        <tr key={reg._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <td style={{ padding: '15px' }}>
                                                <div>{reg.user?.name}</div>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{reg.user?.email}</div>
                                            </td>
                                            <td style={{ padding: '15px' }}>{reg.event?.title}</td>
                                            <td style={{ padding: '15px' }}>{reg.transactionId || 'NONE'}</td>
                                            <td style={{ padding: '15px' }}>
                                                <span className="tech-font" style={{ color: reg.status === 'paid' ? 'var(--primary)' : 'var(--accent)', fontSize: '0.75rem' }}>{reg.status.toUpperCase()}</span>
                                            </td>
                                            <td style={{ padding: '15px' }}>
                                                {reg.status !== 'paid' && (
                                                    <button onClick={() => handleVerifyRegistration(reg._id)} className="btn btn-primary" style={{ padding: '5px 12px', fontSize: '0.6rem' }}>VERIFY</button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SuperiorDashboard;
