import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import ConfirmModal from '../../components/ConfirmModal';

const SuperiorDashboard = () => {
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState('overview');
    const [showConfirm, setShowConfirm] = useState(null);
    const [editingAdmin, setEditingAdmin] = useState(null);
    const [regPage, setRegPage] = useState(1);
    const regLimit = 20;

    // Queries
    const { data: admins = [], isLoading: adminsLoading } = useQuery({
        queryKey: ['admins'],
        queryFn: async () => {
            const res = await api.get('/api/auth/admins/all');
            return res.data;
        }
    });

    const { data: events = [], isLoading: eventsLoading } = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const res = await api.get('/api/events');
            return res.data;
        }
    });

    const { data: regData = { registrations: [], total: 0, pages: 1 }, isLoading: regsLoading } = useQuery({
        queryKey: ['registrations', regPage],
        queryFn: async () => {
            const res = await api.get(`/api/registrations/all?page=${regPage}&limit=${regLimit}`);
            return res.data;
        },
        keepPreviousData: true
    });

    // Mutations
    const createEventMutation = useMutation({
        mutationFn: (newEvent) => api.post('/api/events', newEvent),
        onSuccess: () => {
            queryClient.invalidateQueries(['events']);
            toast.success('Event deployed successfully!');
        },
        onError: (err) => toast.error(`Event deployment failed: ${err.response?.data?.message || err.message}`)
    });

    const verifyRegMutation = useMutation({
        mutationFn: (regId) => api.post(`/api/registrations/verify/${regId}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['registrations']);
            toast.success('Registration verified!');
        },
        onError: () => toast.error('Failed to verify')
    });

    const deleteEventMutation = useMutation({
        mutationFn: (eventId) => api.delete(`/api/events/${eventId}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['events']);
            toast.success('Event deleted successfully!');
        },
        onError: (err) => toast.error(`Sectored deletion failed: ${err.response?.data?.message || err.message}`)
    });

    const updateAdminMutation = useMutation({
        mutationFn: ({ adminId, data }) => api.put(`/api/auth/admins/update/${adminId}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['admins']);
            toast.success('Admin profile updated.');
        },
        onError: () => toast.error('Failed to update admin profile')
    });

    const [eventForm, setEventForm] = useState({
        title: '', description: '', fee: '', day: '', month: '', year: '', venue: '', category: 'Technical',
        eventType: 'individual', maxTeamSize: 1
    });

    const handleCreateEvent = (e) => {
        e.preventDefault();
        const { title, description, fee, day, month, year, venue, category, eventType, maxTeamSize } = eventForm;
        const date = new Date(`${year}-${month}-${day}`);
        if (date < new Date() && date.toDateString() !== new Date().toDateString()) {
            return toast.error('Event date must be in the future.');
        }
        createEventMutation.mutate({
            title, description, fee, date: date.toISOString(), venue, category, eventType, maxTeamSize
        });
        setEventForm({ title: '', description: '', fee: '', day: '', month: '', year: '', venue: '', category: 'Technical', eventType: 'individual', maxTeamSize: 1 });
    };
    const handleVerifyRegistration = (regId) => verifyRegMutation.mutate(regId);
    const handleEventDelete = (eventId) => deleteEventMutation.mutate(eventId);
    const handleApprove = (adminId, assignedEvents) => updateAdminMutation.mutate({ adminId, data: { isApproved: true, assignedEvents } });
    const updateAssignments = (adminId, assignedEvents) => updateAdminMutation.mutate({ adminId, data: { assignedEvents } });

    const loading = adminsLoading || eventsLoading || regsLoading;
    const registrations = regData.registrations;
    const pendingAdmins = admins.filter(a => !a.isApproved);

    if (loading && activeTab === 'overview') return <div className="grid-bg" style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="tech-font animate-pulse">SYNCHRONIZING_GLOBAL_CONSOLE...</div></div>;

    const stats = {
        totalRegs: regData.total || 0,
        totalRevenue: registrations
            .filter(reg => reg.status === 'paid')
            .reduce((acc, reg) => acc + (reg.event?.fee || 0), 0), // Note: This only calculates revenue for currently loaded page. In a real app, you'd get this total from the server.
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
                                                        onClick={() => setEditingAdmin({ ...admin, tempAssignments: [] })}
                                                        className="btn btn-primary"
                                                        style={{ padding: '5px 12px', fontSize: '0.6rem' }}
                                                    >
                                                        APPROVE
                                                    </button>
                                                )}
                                                {admin.role === 'event_admin' && admin.isApproved && (
                                                    <button
                                                        onClick={() => setEditingAdmin({ ...admin, tempAssignments: admin.assignedEvents.map(e => e._id) })}
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
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                        <select className="glass-morphism" style={{ padding: '12px', background: '#111', color: '#fff', border: '1px solid var(--glass-border)' }} value={eventForm.eventType} onChange={e => setEventForm({ ...eventForm, eventType: e.target.value, maxTeamSize: e.target.value === 'individual' ? 1 : eventForm.maxTeamSize })}>
                                            <option value="individual">SINGLE_PLAYER</option>
                                            <option value="group">SQUAD_MODE</option>
                                        </select>
                                        {eventForm.eventType === 'group' && (
                                            <input type="number" className="glass-morphism" placeholder="TEAM_SIZE" style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid var(--glass-border)' }} value={eventForm.maxTeamSize} onChange={e => setEventForm({ ...eventForm, maxTeamSize: e.target.value })} min="2" max="10" required />
                                        )}
                                    </div>
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
                                            onClick={() => setShowConfirm({ title: 'Delete Event?', message: 'Are you sure you want to delete this event? All registrations for this event will be affected.', onConfirm: () => handleEventDelete(event._id) })}
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
                <ConfirmModal
                    isOpen={!!showConfirm}
                    onClose={() => setShowConfirm(null)}
                    onConfirm={() => { showConfirm.onConfirm(); setShowConfirm(null); }}
                    title={showConfirm?.title}
                    message={showConfirm?.message}
                />

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
                                                <div>{reg.user?.name} {reg.teamMembers?.length > 0 && <span style={{ color: 'var(--primary)', fontSize: '0.7rem' }}>(LEADER + {reg.teamMembers.length})</span>}</div>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{reg.user?.email}</div>
                                            </td>
                                            <td style={{ padding: '15px' }}>
                                                <div>{reg.event?.title}</div>
                                                {reg.teamName && <div style={{ fontSize: '0.7rem', color: 'var(--secondary)' }} className="tech-font">TEAM: {reg.teamName}</div>}
                                            </td>
                                            <td style={{ padding: '15px' }}>{reg.transactionId || 'NONE'}</td>
                                            <td style={{ padding: '15px' }}>
                                                <span className="tech-font" style={{ color: reg.status === 'paid' ? 'var(--primary)' : 'var(--accent)', fontSize: '0.75rem' }}>{reg.status.toUpperCase()}</span>
                                            </td>
                                            <td style={{ padding: '15px' }}>
                                                {reg.status !== 'paid' && (
                                                    <button onClick={() => handleVerifyRegistration(reg._id)} className="btn btn-primary" style={{ padding: '5px 12px', fontSize: '0.6rem' }} disabled={verifyRegMutation.isLoading}>
                                                        {verifyRegMutation.isLoading ? 'VERIFYING...' : 'VERIFY'}
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
                )}
                {editingAdmin && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
                        <div className="glass-morphism" style={{ width: '100%', maxWidth: '500px', padding: '40px', border: '1px solid var(--primary)' }}>
                            <h2 className="tech-font" style={{ marginBottom: '20px', fontSize: '1.2rem' }}>{editingAdmin.isApproved ? 'UPDATE_ASSIGNMENTS' : 'APPROVE_ADMIN'}</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '20px' }}>SELECT_EVENTS_FOR_AUTHORIZATION</p>

                            <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '30px', padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }}>
                                {events.map(event => (
                                    <label key={event._id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <input
                                            type="checkbox"
                                            checked={editingAdmin.tempAssignments?.includes(event._id)}
                                            onChange={(e) => {
                                                const current = editingAdmin.tempAssignments || [];
                                                const next = e.target.checked
                                                    ? [...current, event._id]
                                                    : current.filter(id => id !== event._id);
                                                setEditingAdmin({ ...editingAdmin, tempAssignments: next });
                                            }}
                                        />
                                        <span className="tech-font" style={{ fontSize: '0.75rem' }}>{event.title}</span>
                                    </label>
                                ))}
                            </div>

                            <div style={{ display: 'flex', gap: '15px' }}>
                                <button
                                    onClick={() => {
                                        if (editingAdmin.isApproved) {
                                            updateAssignments(editingAdmin._id, editingAdmin.tempAssignments);
                                        } else {
                                            handleApprove(editingAdmin._id, editingAdmin.tempAssignments);
                                        }
                                        setEditingAdmin(null);
                                    }}
                                    className="btn btn-primary" style={{ flex: 1 }}
                                >
                                    {editingAdmin.isApproved ? 'CONFIRM_CHANGES' : 'APPROVE_&_ASSIGN'}
                                </button>
                                <button onClick={() => setEditingAdmin(null)} className="btn btn-outline" style={{ flex: 1 }}>ABORT</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SuperiorDashboard;
