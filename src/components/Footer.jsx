import React from 'react';
import { businessConfig } from '../config/businessConfig';

export default function Footer({ onOpenPrivacy }) { 
  return (
    <footer style={{
      backgroundColor: businessConfig.colors.primary,
      color: '#fff',
      textAlign: 'center',
      padding: '20px',
      fontSize: '0.9rem',
      direction: 'rtl'
    }}>
      <p>© {new Date().getFullYear()} {businessConfig.name}. כל הזכויות שמורות.</p>
      <p style={{ margin: '10px 0 0 0' }}>
        <button 
          onClick={onOpenPrivacy} 
          style={{ 
            color: '#fff', 
            opacity: 0.8, 
            textDecoration: 'underline', 
            fontSize: '0.8rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0
          }}
        >
          מדיניות פרטיות
        </button>
      </p>
      <p style={{ opacity: 0.7, fontSize: '0.8rem', marginTop: '10px' }}>נבנה על ידי הדר קסדו</p>
    </footer>
  );
}