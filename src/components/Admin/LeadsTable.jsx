import React from 'react';
import { businessConfig } from '../../config/businessConfig';

export default function LeadsTable({ leads, onToggleStatus, onDelete }) {
    return (
        <>
            <style>{`
                .desktop-table { 
                    display: table; 
                    width: 100%; 
                    border-collapse: collapse; 
                    text-align: right; 
                }
                .delete-btn-table:hover {
                    background-color: #FFF5F5 !important;
                }
            `}</style>
            
            <table className="desktop-table">
                <thead>
                    <tr style={{ backgroundColor: businessConfig.colors.primary, color: '#fff' }}>
                        <th style={thStyle}>שם מלא</th>
                        <th style={thStyle}>טלפון</th>
                        <th style={thStyle}>הודעה</th>
                        <th style={thStyle}>סטטוס</th>
                        <th style={{ ...thStyle, textAlign: 'center' }}>פעולות</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.map((lead) => (
                        <tr key={lead.id} style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: lead.status === 'טופל' ? '#F7FAFC' : '#fff' }}>
                            <td style={tdStyle}><strong>{lead.name}</strong></td>
                            <td style={tdStyle}>{lead.phone}</td>
                            <td style={{ ...tdStyle, maxWidth: '300px', wordBreak: 'break-word' }}>{lead.message}</td>
                            <td style={tdStyle}>
                                <button
                                    onClick={() => onToggleStatus(lead.id, lead.status)}
                                    style={{
                                        ...statusButtonStyle,
                                        backgroundColor: lead.status === 'חדש' ? '#FFF5F5' : '#F0FDF4',
                                        color: lead.status === 'חדש' ? '#E53E3E' : '#38A169',
                                        border: lead.status === 'חדש' ? '1px solid #FEB2B2' : '1px solid #BBF7D0'
                                    }}
                                >
                                    {lead.status === 'חדש' ? '○ חדש (לחץ לטופל)' : '✓ טופל'}
                                </button>
                            </td>
                            <td style={tdStyle}>
                                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
                                    {/* וואטסאפ */}
                                    <a href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '').startsWith('0') ? '972' + lead.phone.replace(/[^0-9]/g, '').slice(1) : lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`היי ${lead.name}, חזרתי אלייך לגבי הפנייה מהאתר`)}`} target="_blank" rel="noreferrer" style={iconButtonStyle} title="שלח וואטסאפ">
                                        <svg  width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>

                                    </a>
                                    {/* טלפון */}
                                    <a href={`tel:${lead.phone}`} style={iconButtonStyle} title="התקשר ללקוח">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3182CE" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                    </a>
                                    {/* מחיקה */}
                                    <button 
                                        onClick={() => onDelete(lead.id, lead.name)} 
                                        className="delete-btn-table"
                                        style={{ ...iconButtonStyle, color: '#E53E3E' }} 
                                        title="מחק פנייה"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

const thStyle = { padding: '15px', fontWeight: 'bold', fontSize: '0.95rem', letterSpacing: '0.5px' };
const tdStyle = { padding: '16px', fontSize: '0.95rem', color: '#4A5568' };

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

const iconButtonStyle = {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    border: '1px solid #EDF2F7',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    padding: 0
};