import React from 'react';
import { businessConfig } from '../config/businessConfig';

export default function PrivacyPolicy({ onClose }) { 
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000, 
      padding: '20px'
    }}>
      <div style={{ 
        backgroundColor: '#fff',
        padding: '30px', 
        maxWidth: '700px', 
        width: '100%',
        maxHeight: '85vh',
        overflowY: 'auto', 
        borderRadius: '8px',
        direction: 'rtl', 
        textAlign: 'right', 
        color: businessConfig.colors.textDark,
        position: 'relative',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
      }}>
        
        {/* כפתור סגירה (X) בפינה השמאלית העליונה */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            left: '15px',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#aaa'
          }}
        >
          ✕
        </button>

        <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>מדיניות פרטיות</h1>
        <p style={{ marginBottom: '20px', fontSize: '0.85rem', color: '#666' }}>עודכן לאחרונה: {new Date().toLocaleDateString('he-IL')}</p>
        
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '5px' }}>1. כללי</h2>
          <p>אנו מכבדים את פרטיות המשתמשים באתר. מדיניות זו מסבירה כיצד אנו אוספים, שומרים ומשתמשים במידע הנמסר לנו על ידך בעת מילוי טופס יצירת הקשר.</p>
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '5px' }}>2. המידע שאנו אוספים</h2>
          <p>בעת מילוי הטופס באתר, נאספים הנתונים הבאים: שם מלא, מספר טלפון, כתובת אימייל (אופציונלי) ותוכן ההודעה שכתבת.</p>
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '5px' }}>3. מטרת איסוף המידע והשימוש בו</h2>
          <p>המידע נאסף אך ורק לצורך יצירת קשר איתך, מתן מענה לפנייתך, ואספקת השירותים המבוקשים על ידך. המידע נשמר בבסיס נתונים מאובטח של Firebase ואינו מועבר לצד ג' ללא אישורך.</p>
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '5px' }}>4. אבטחת מידע</h2>
          <p>אנו משתמשים בשירותי הענן של Google Firebase, המיישמים סטנדרטים גבוהים של אבטחת מידע, כדי להגן על הנתונים שלך מפני גישה לא מורשית.</p>
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '5px' }}>5. זכויותיך</h2>
          <p>בהתאם לחוק, הנך זכאי/ת לעיין במידע שנשמר עליך, ואף לבקש מאיתנו למחוק אותו לחלוטין ממאגר הנתונים בכל עת על ידי פנייה ישירה אלינו במייל: {businessConfig.contact.email}.</p>
        </section>

        {/* כפתור סגירה תחתון לנוחות המשתמש */}
        <button 
          onClick={onClose}
          style={{
            backgroundColor: businessConfig.colors.primary,
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
            marginTop: '10px',
            width: '100%'
          }}
        >
          סגור ואישור
        </button>
      </div>
    </div>
  );
}