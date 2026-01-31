import { useState, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const EventAdminDashboard = () => {
    const { user: authUser } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const [editingEvent, setEditingEvent] = useState(null);
    const [regPage, setRegPage] = useState(1);
    const regLimit = 20;

    // Queries
    const { data: events = [], isLoading: eventsLoading } = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const res = await api.get('/api/events');
            if (authUser && authUser.role !== 'superior_admin') {
                const assignedIds = authUser.assignedEvents || [];
                return res.data.filter(e => assignedIds.includes(e._id));
            }
            return res.data;
        },
        enabled: !!authUser
    });

    const { data: regData = { registrations: [], total: 0, pages: 1 }, isLoading: regsLoading } = useQuery({
        queryKey: ['registrations', regPage],
        queryFn: async () => {
            const res = await api.get(`/api/registrations/all?page=${regPage}&limit=${regLimit}`);
            return res.data;
        },
        keepPreviousData: true,
        enabled: !!authUser
    });

    // Mutation
    const updateEventMutation = useMutation({
        mutationFn: (updatedEvent) => api.put(`/api/events/${updatedEvent._id}`, updatedEvent),
        onSuccess: () => {
            queryClient.invalidateQueries(['events']);
            toast.success('Event sector updated successfully.');
            setEditingEvent(null);
        },
        onError: (err) => toast.error('Update failed: ' + (err.response?.data?.message || err.message))
    });

    const handleUpdateEvent = (e) => {
        e.preventDefault();
        updateEventMutation.mutate(editingEvent);
    };

    const loading = eventsLoading || regsLoading;
    const registrations = regData.registrations;

    if (loading) return <div className="grid-bg" style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="tech-font animate-pulse">ACCESSING_ASSIGNED_SECTORS...</div></div>;

    return (
        <div className="grid-bg" style={{ minHeight: '100vh', paddingTop: '100px' }}>
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
                                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={updateEventMutation.isLoading}>
                                        {updateEventMutation.isLoading ? 'SAVING...' : 'SAVE_CHANGES'}
                                    </button>
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
                                        <td style={{ padding: '20px' }}>
                                            <div>{reg.user?.name} {reg.teamMembers?.length > 0 && <span style={{ color: 'var(--primary)' }}>(LEADER + {reg.teamMembers.length})</span>}</div>
                                            {reg.teamName && <div style={{ fontSize: '0.7rem', color: 'var(--secondary)' }} className="tech-font">TEAM: {reg.teamName}</div>}
                                        </td>
                                        <td style={{ padding: '20px' }}>{reg.user?.email}</td>
                                        <td style={{ padding: '20px' }} className="tech-font">
                                            {reg.event?.title}
                                            <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>{reg.event?.eventType === 'group' ? 'SQUAD_MODE' : 'SOLO_UNIT'}</div>
                                        </td>
                                        <td style={{ padding: '20px' }}>{reg.user?.college}</td>
                                        <td style={{ padding: '20px' }}>{new Date(reg.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination Controls */}
                {regData.pages > 1 && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '30px' }}>
                        <button
                            onClick={() => setRegPage(p => Math.max(1, p - 1))}
                            disabled={regPage === 1}
                            className="btn btn-outline"
                            style={{ padding: '5px 15px', fontSize: '0.7rem' }}
                        >
                            PREV
                        </button>
                        <span className="tech-font" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            PAGE <span style={{ color: 'var(--primary)' }}>{regPage}</span> / {regData.pages}
                        </span>
                        <button
                            onClick={() => setRegPage(p => Math.min(regData.pages, p + 1))}
                            disabled={regPage === regData.pages}
                            className="btn btn-outline"
                            style={{ padding: '5px 15px', fontSize: '0.7rem' }}
                        >
                            NEXT
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventAdminDashboard;
