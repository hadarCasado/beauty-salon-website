import React, { useState, useEffect } from 'react';
import { businessConfig } from '../config/businessConfig';
import { db } from '../config/firebase'; 
import { collection, getDocs } from 'firebase/firestore';

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "faq"));
        if (!querySnapshot.empty) {
          setFaqs(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } else {
          setFaqs(businessConfig.faq);
        }
      } catch (error) {
        console.error("שגיאה במשיכת שאלות נפוצות:", error);
        setFaqs(businessConfig.faq);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px', color: '#718096' }}>טוען שאלות נפוצות...</div>;
  }

  return (
    <section style={{
      padding: '60px 5%',
      backgroundColor: businessConfig.colors.lightBg,
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', color: businessConfig.colors.textDark, marginBottom: '40px' }}>
          שאלות נפוצות
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {faqs.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} style={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.02)',
                overflow: 'hidden',
                border: `1px solid ${isOpen ? businessConfig.colors.secondary : '#E2E8F0'}`,
                transition: 'border-color 0.2s'
              }}>
                <button 
                  onClick={() => toggleFAQ(item.id)}
                  style={{
                    width: '100%',
                    padding: '20px',
                    backgroundColor: '#fff',
                    border: 'none',
                    textAlign: 'right',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: businessConfig.colors.textDark,
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>{item.question}</span>
                  <span style={{ 
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
                    transition: 'transform 0.2s',
                    color: businessConfig.colors.secondary
                  }}>▼</span>
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 20px 20px 20px',
                    color: '#4A5568',
                    lineHeight: '1.6',
                    fontSize: '1rem',
                    borderTop: '1px solid #EDF2F7',
                    backgroundColor: '#FAFAFA'
                  }}>
                    <p style={{ margin: '15px 0 0 0' }}>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}