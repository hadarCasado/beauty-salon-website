import React from 'react';

export default function LeadsMobileList({ leads, onToggleStatus, onDelete }) {
    return (
        <>
            {leads.map((lead) => (
                <div key={lead.id} style={{marginBottom: '2vh', backgroundColor: '#fff', borderRadius: '12px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderRight: lead.status === 'חדש' ? `5px solid #E53E3E` : `5px solid #38A169`, position: 'relative' }}>
                    <button 
                        onClick={() => onDelete(lead.id, lead.name)} 
                        style={mobileDeleteBtnStyle}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', paddingLeft: '30px' }}>
                        <strong style={{ fontSize: '1.1rem', color: '#2D3748' }}>{lead.name}</strong>
                        <button
                            onClick={() => onToggleStatus(lead.id, lead.status)}
                            style={{
                                ...statusButtonStyle,
                                backgroundColor: lead.status === 'חדש' ? '#FFF5F5' : '#F0FDF4',
                                color: lead.status === 'חדש' ? '#E53E3E' : '#38A169',
                                border: lead.status === 'חדש' ? '1px solid #FEB2B2' : '1px solid #BBF7D0',
                                padding: '4px 12px'
                            }}
                        >
                            {lead.status === 'חדש' ? '○ חדש (לחץ לטופל)' : '✓ טופל'}
                        </button>
                    </div>
                    
                    <p style={{ margin: '0 0 8px 0', fontSize: '0.9rem' }}>
                        <strong>טלפון:</strong> <a href={`tel:${lead.phone}`} style={{ color: '#3182CE', textDecoration: 'none' }}>{lead.phone}</a>
                    </p>
                    
                    <div style={{ backgroundColor: '#F8FAFC', padding: '10px', borderRadius: '8px', fontSize: '0.9rem', marginBottom: '15px', color: '#4A5568' }}>
                        {lead.message}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <a href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '').startsWith('0') ? '972' + lead.phone.replace(/[^0-9]/g, '').slice(1) : lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`היי ${lead.name}, חזרתי אלייך לגבי הפנייה`)}`} target="_blank" rel="noreferrer" style={{ ...mobileActionBtnStyle, backgroundColor: '#E8F8F0', color: '#1E7E34', border: '1px solid #C6F6D5' }}>
                            <svg style={{ marginLeft: '8px' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                            וואטסאפ
                        </a>
                        <a href={`tel:${lead.phone}`} style={{ ...mobileActionBtnStyle, backgroundColor: '#EBF8FF', color: '#2B6CB0', border: '1px solid #BEE3F8' }}>
                            <svg style={{ marginLeft: '8px' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                            התקשר
                        </a>
                    </div>
                </div>
            ))}
        </>
    );
}

const statusButtonStyle = {
    border: 'none',
    padding: '6px 14px',
    borderRadius: '50px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '0.8rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s ease'
};

const mobileDeleteBtnStyle = {
    position: 'absolute',
    left: '12px',
    top: '14px',
    background: 'none',
    border: 'none',
    color: '#A0AEC0',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 0.2s'
};

const mobileActionBtnStyle = {
    flex: 1,
    textDecoration: 'none',
    padding: '8px',
    borderRadius: '10px',
    fontSize: '0.9rem',
    fontWeight: '700',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
};