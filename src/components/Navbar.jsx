import React, { useState, useEffect } from 'react';
import { businessConfig } from '../config/businessConfig';

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);

  // האזנה לשינויי גודל מסך
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isMobile ? '0.8rem 3%' : '1rem 5%',
      backgroundColor: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* לוגו - קטן יותר בנייד */}
      <div style={{ 
        fontSize: isMobile ? '1.1rem' : '1.5rem', 
        fontWeight: 'bold', 
        color: businessConfig.colors.secondary,
        transition: 'font-size 0.2s'
      }}>
        {businessConfig.logoText}
      </div>
      
      {/* קישורי הניווט - ריווח קטן יותר בין הלינקים בנייד */}
      <ul style={{ 
        display: 'flex', 
        listStyle: 'none', 
        gap: isMobile ? '12px' : '30px', 
        margin: 0, 
        padding: 0,
        fontSize: isMobile ? '0.9rem' : '1rem'
      }}>
        <li><a href="#hero" style={{ textDecoration: 'none', color: businessConfig.colors.textDark, fontWeight: '500' }}>בית</a></li>
        <li><a href="#services" style={{ textDecoration: 'none', color: businessConfig.colors.textDark, fontWeight: '500' }}>שירותים</a></li>
        <li><a href="#contact" style={{ textDecoration: 'none', color: businessConfig.colors.textDark, fontWeight: '500' }}>צור קשר</a></li>
      </ul>

      {/* כפתור הנעה לפעולה - קטן ועדין יותר בנייד */}
      <a href={`tel:${businessConfig.contact.phone}`} className="btn-primary" style={{
        backgroundColor: businessConfig.colors.secondary,
        color: '#fff',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        padding: isMobile ? '8px 14px' : '12px 24px',
        fontSize: isMobile ? '0.85rem' : '1rem',
        transition: 'all 0.2s'
      }}>
        חייגי עכשיו
      </a>
    </nav>
  );
}