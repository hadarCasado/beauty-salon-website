import React from 'react';
import { businessConfig } from '../../config/businessConfig';

export default function DashboardHeader({ newLeadsCount, onRefresh }) {
    return (
        <div className="header-container">
            <style>{`
                .header-container { display: flex; justify-content: space-between; align-items: center; margin-bottom: 35px; flex-wrap: wrap; gap: 15px; }
                .title-area { display: flex; align-items: center; gap: 12px; }
                
                @media (max-width: 768px) {
                    .header-container { flex-direction: column; text-align: center; justify-content: center; gap: 12px; }
                    .title-area { flex-direction: column; gap: 10px; justify-content: center; width: 100%; }
                }
            `}</style>

            <div className="title-area">
                <h1 style={{ color: businessConfig.colors.textDark, margin: 0, fontSize: '1.8rem' }}>📋 מערכת ניהול פניות</h1>
                {newLeadsCount > 0 && (
                    <span style={badgeStyle}>
                        {newLeadsCount} חדשות
                    </span>
                )}
            </div>
            
            <button 
                onClick={onRefresh} 
                style={refreshButtonStyle}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = businessConfig.colors.primary;
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#fff';
                    e.currentTarget.style.color = businessConfig.colors.primary;
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                }}
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 4v6h-6M1 20v-6h6" />
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                </svg>
                רענן נתונים
            </button>
        </div>
    );
}

const badgeStyle = {
    backgroundColor: '#E53E3E',
    color: '#fff',
    fontSize: '0.75rem',
    fontWeight: '700',
    padding: '4px 12px',
    borderRadius: '50px',
    display: 'inline-flex',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(229, 62, 62, 0.2)'
};

const refreshButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#fff',
    color: businessConfig.colors.primary,
    border: `1.5px solid ${businessConfig.colors.primary}`,
    padding: '8px 20px',
    borderRadius: '50px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '0.9rem',
    transition: 'all 0.25s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
};