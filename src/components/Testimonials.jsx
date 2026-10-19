import React, { useState, useEffect } from 'react';
import { businessConfig } from '../config/businessConfig';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Testimonials() {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // משיכת נתונים מ-Firestore
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "testimonials"));
        if (!querySnapshot.empty) {
          setItems(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } else {
          setItems(businessConfig.testimonials);
        }
      } catch (error) {
        console.error("שגיאה במשיכת ביקורות:", error);
        setItems(businessConfig.testimonials);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // פונקציות הניווט (רצות רק אם יש פריטים במערך)
  const handleNext = () => {
    if (items.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    if (items.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  // אפקט למעבר אוטומטי כל 5 שניות
  useEffect(() => {
    if (items.length === 0) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, items]); 

  if (loading || items.length === 0) {
    return <div style={{ textAlign: 'center', padding: '40px', color: '#718096' }}>טוען המלצות...</div>;
  }

  return (
    <section style={{
      padding: '60px 5%',
      backgroundColor: '#fff',
      textAlign: 'center',
      position: 'relative',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h2 style={{ fontSize: '2.5rem', color: businessConfig.colors.textDark, marginBottom: '30px' }}>
        לקוחות ממליצים
      </h2>

      {/* קופסת ההמלצה הנוכחית */}
      <div style={{
        backgroundColor: businessConfig.colors.lightBg,
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ color: '#ECC94B', fontSize: '1.2rem', marginBottom: '15px' }}>
          {'★'.repeat(items[currentIndex].stars)}{'☆'.repeat(5 - items[currentIndex].stars)}
        </div>

        <p style={{ fontSize: '1.1rem', fontStyle: 'italic', lineHeight: '1.6', color: '#4A5568', marginBottom: '20px' }}>
          "{items[currentIndex].text}"
        </p>

        <h4 style={{ margin: '0 0 5px 0', color: businessConfig.colors.primary, fontSize: '1.2rem' }}>
          {items[currentIndex].name}
        </h4>
        <span style={{ fontSize: '0.85rem', color: '#718096' }}>{items[currentIndex].role}</span>
      </div>

      {/* חצי ניווט */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
        <button onClick={handlePrev} style={{ ...arrowButtonStyle, transform: 'scaleX(1)'  }}>➔</button>
        <button onClick={handleNext} style={arrowButtonStyle}>➔</button>
      </div>
    </section>
  );
}

const arrowButtonStyle = {
  backgroundColor: '#fff',
  border: `1px solid ${businessConfig.colors.primary}`,
  color: businessConfig.colors.primary,
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  cursor: 'pointer',
  fontSize: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s',
  transform: 'scaleX(-1)'
};