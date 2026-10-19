import React from 'react';
import { businessConfig } from '../config/businessConfig';

export default function Services() {
  return (
    <section id="services" style={{
      padding: '60px 5%',
      backgroundColor: businessConfig.colors.lightBg,
      textAlign: 'center'
    }}>
      <h2 style={{ fontSize: '2.5rem', color: businessConfig.colors.textDark, marginBottom: '40px' }}>
        השירותים שלנו
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {businessConfig.services.map((service) => (
          <div key={service.id} style={{
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'between'
          }}>
            <div>
              <h3 style={{ color: businessConfig.colors.primary, fontSize: '1.5rem', marginTop: 0 }}>
                {service.title}
              </h3>
              <p style={{ color: '#666', lineHeight: '1.5', fontSize: '0.95rem' }}>
                {service.description}
              </p>
            </div>
            <div style={{
              marginTop: '20px',
              fontSize: '1.3rem',
              fontWeight: 'bold',
              color: businessConfig.colors.secondary
            }}>
              {service.price}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}