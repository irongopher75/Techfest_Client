import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { toast } from 'react-hot-toast';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { event, teamName, teamMembers, teamMemberNames } = location.state || {};

    const [transactionId, setTransactionId] = useState('');
    const [upiId, setUpiId] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (!event) {
            navigate('/events');
            return;
        }
        setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));

        const fetchUpiDetails = async () => {
            try {
                const res = await api.get('/api/registrations/upi-details');
                setUpiId(res.data.upiId);
            } catch (err) {
                console.error('Error fetching UPI details:', err);
                toast.error('Failed to load payment details.');
            }
        };
        fetchUpiDetails();
    }, [event, navigate]);

    const amount = event?.fee || 0;
    const gpayLink = `upi://pay?pa=${upiId}&pn=Ambiora&am=${amount}&cu=INR`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!transactionId) return toast.error('Please enter Transaction ID (UTR)');

        // UTR Validation (12 digits)
        const utrRegex = /^\d{12}$/;
        if (!utrRegex.test(transactionId)) {
            return toast.error('Invalid Transaction ID. Bank UTR must be exactly 12 digits.');
        }

        setSubmitting(true);
        try {
            await api.post('/api/registrations/manual-upi', {
                eventId: event._id,
                transactionId,
                amountPaid: amount,
                teamName,
                teamMembers
            });

            toast.success('Payment submitted! Verification in progress.');
            navigate('/profile');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Submission failed');
        } finally {
            setSubmitting(false);
        }
    };

    if (!event) return null;

    return (
        <div className="grid-bg" style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div className="glass-morphism animate-fade-in" style={{ maxWidth: '500px', width: '100%', padding: '40px', textAlign: 'center' }}>
                <div className="tech-font" style={{ color: 'var(--primary)', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '10px' }}>PAYMENT_PROTOCOL</div>
                <h2 className="tech-font" style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{event.title}</h2>
                {teamName && (
                    <div className="tech-font" style={{ color: 'var(--secondary)', fontSize: '0.75rem', marginBottom: '20px' }}>
                        TEAM: {teamName.toUpperCase()} ({teamMemberNames.length + 1} MEMBERS)
                    </div>
                )}
                <div className="tech-font" style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '30px' }}>₹{amount}</div>

                {isMobile ? (
                    <div style={{ marginBottom: '40px' }}>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.9rem' }}>Tap the button below to pay via GPay or any UPI app.</p>
                        <a href={gpayLink} className="btn btn-primary" style={{ width: '100%' }}>PAY_VIA_GPAY</a>
                    </div>
                ) : (
                    <div style={{ marginBottom: '40px' }}>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.9rem' }}>Scan the QR code below using GPay or any UPI app to pay.</p>
                        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', display: 'inline-block', marginBottom: '20px' }}>
                            <img
                                src="/assets/gpay-qr.png"
                                alt="GPay QR"
                                style={{ width: '200px', height: '200px', objectFit: 'contain' }}
                                onError={(e) => {
                                    e.target.src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + encodeURIComponent(gpayLink);
                                }}
                            />
                        </div>
                        <div className="tech-font" style={{ fontSize: '0.7rem', color: 'var(--primary)' }}>ID: {upiId}</div>
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '30px' }}>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '15px', fontSize: '0.8rem', textAlign: 'left' }}>CONFIRM_TRANSACTION:</p>
                    <input
                        type="text"
                        placeholder="ENTER_UTR_/_TRANSACTION_ID"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="glass-morphism"
                        style={{
                            width: '100%',
                            padding: '15px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--glass-border)',
                            color: '#fff',
                            marginBottom: '20px',
                            fontFamily: 'var(--font-tech)',
                            fontSize: '0.8rem'
                        }}
                    />
                    <button type="submit" disabled={submitting} className="btn btn-primary" style={{ width: '100%' }}>
                        {submitting ? 'PROCESSING...' : 'SUBMIT_FOR_VERIFICATION'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Payment;
