import React, { useState } from 'react';
import { db } from '../config/firebase'; // החיבור לפיירבייס שלך
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { businessConfig } from '../config/businessConfig';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(false);

    try {
      // שמירת הפנייה בבסיס הנתונים (Firestore)
      await addDoc(collection(db, "leads"), {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
        status: "חדש",
        createdAt: serverTimestamp()
      });

      // בניית ההודעה המעוצבת לוואטסאפ
      const whatsappMessage = ` *פנייה חדשה מאתר PureBeauty* 

היי!  השארתי פרטים באתר וממתינ/ה לחזרה:

👤 *שם מלא:* ${formData.name}
📞 *טלפון לחזרה:* ${formData.phone}
✉️ *כתובת מייל:* ${formData.email || 'לא הושאר'}

💬 *הודעה או בקשה:*
"${formData.message}"`;

      // הגדרת מספר הטלפון של בעל העסק
      // קריטי: הפורמט חייב להיות בינלאומי, בלי ה-0 בהתחלה ובלי מקפים.
      const rawPhone = businessConfig.contact.phone;

      const cleanedPhone = rawPhone.replace(/[^0-9]/g, '');
      const formattedPhone = cleanedPhone.startsWith('0') ? '972' + cleanedPhone.slice(1) : cleanedPhone;

      const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');

      // סימון הצלחה ואיפוס הטופס באתר
      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (error) {
      console.error("שגיאה בתהליך השליחה:", error);
      alert("אופס! הייתה תקלה קטנה בשמירת הנתונים. נסו שוב.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{ padding: '60px 5%', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '40px', color: businessConfig.colors.textDark }}>
        דברו איתנו
      </h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
        {/* פרטי התקשרות סטטיים config */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3>פרטי העסק</h3>
          <p>📍 <strong>כתובת:</strong> {businessConfig.contact.address}</p>
          <p>📞 <strong>טלפון:</strong> <a href={`tel:${businessConfig.contact.phone}`}>{businessConfig.contact.phone}</a></p>
          <p>✉️ <strong>אימייל:</strong> {businessConfig.contact.email}</p>
        </div>

        {/* טופס פניות */}
        <form onSubmit={handleSubmit} style={{ flex: '2 1 400px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="text"
            placeholder="שם מלא"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={inputStyle}
          />
          <input
            type="tel"
            placeholder="טלפון"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="אימייל (אופציונלי)"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={inputStyle}
          />
          <textarea
            placeholder="איך נוכל לעזור לך?"
            rows="4"
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            style={inputStyle}
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: businessConfig.colors.primary,
              color: '#fff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: 'bold',
              alignSelf: 'flex-start',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'background-color 0.2s'
            }}
          >
            {loading ? 'שומר נתונים...' : 'שליחת פנייה ומעבר לוואטסאפ'}
          </button>

          {submitted && (
            <p style={{ color: 'green', fontWeight: 'bold', marginTop: '10px' }}>
              ✓ הפנייה נשמרה בבסיס הנתונים וחלון הוואטסאפ נפתח!
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

const inputStyle = {
  padding: '12px',
  border: '1px solid #E2E8F0',
  borderRadius: '6px',
  fontSize: '1rem',
  fontFamily: 'inherit',
  backgroundColor: '#fff',
  textAlign: 'right'
};