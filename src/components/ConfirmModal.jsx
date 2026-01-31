const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'CONFIRM', cancelText = 'CANCEL' }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
            zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
            <div className="glass-morphism animate-fade-in" style={{ width: '100%', maxWidth: '400px', padding: '40px', border: '1px solid var(--primary)', textAlign: 'center' }}>
                <h3 className="tech-font" style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '15px' }}>{title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '30px' }}>{message}</p>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <button onClick={onCancel} className="btn btn-outline" style={{ flex: 1 }}>{cancelText}</button>
                    <button onClick={onConfirm} className="btn btn-primary" style={{ flex: 1 }}>{confirmText}</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
