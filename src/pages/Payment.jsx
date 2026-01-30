import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config/api';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { event } = location.state || {};

    const [transactionId, setTransactionId] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (!event) {
            navigate('/events');
            return;
        }
        setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    }, [event, navigate]);

    const upiId = "vishnurocky49@okhdfcbank";
    const amount = event?.fee || 0;
    const gpayLink = `upi://pay?pa=${upiId}&pn=Techfest&am=${amount}&cu=INR`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!transactionId) return alert('Please enter Transaction ID (UTR)');

        setSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${API_BASE_URL}/api/registrations/manual-upi`, {
                eventId: event._id,
                transactionId,
                amountPaid: amount
            }, { headers: { 'x-auth-token': token } });

            alert('Payment submitted for verification! It will be approved within 24 hours.');
            navigate('/profile');
        } catch (err) {
            alert(err.response?.data?.message || 'Submission failed');
        } finally {
            setSubmitting(false);
        }
    };

    if (!event) return null;

    return (
        <div className="grid-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div className="glass-morphism animate-fade-in" style={{ maxWidth: '500px', width: '100%', padding: '40px', textAlign: 'center' }}>
                <div className="tech-font" style={{ color: 'var(--primary)', fontSize: '0.8rem', letterSpacing: '2px', marginBottom: '20px' }}>PAYMENT_PROTOCOL</div>
                <h2 className="tech-font" style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{event.title}</h2>
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
