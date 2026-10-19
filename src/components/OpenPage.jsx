import React from 'react';
import { businessConfig } from '../config/businessConfig';

export default function OpenPage() {
  return (
    <section id="hero" style={{
      position: 'relative',
      height: '80vh',
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${businessConfig.hero.bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: '#fff',
      padding: '0 20px'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px', maxWidth: '800px' }}>
        {businessConfig.hero.title}
      </h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '30px', maxWidth: '600px', lineHeight: '1.6' }}>
        {businessConfig.hero.subtitle}
      </p>
      <a href="#contact" className="btn-primary" style={{
        backgroundColor: businessConfig.colors.secondary,
        color: '#fff',
        textDecoration: 'none'
      }}>
        {businessConfig.hero.ctaText}
      </a>
    </section>
  );
}