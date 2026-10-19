import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

export default function AdminLogin({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [resetMessage, setResetMessage] = useState('');

    const auth = getAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            if (onLoginSuccess) onLoginSuccess(); 
        } catch (error) {
            console.error(error);
            setLoginError('פרטי התחברות שגויים. נסה שנית.');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setLoginError('');
        setResetMessage('');
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            setResetMessage('מייל לאיפוס הסיסמה נשלח אלייך בהצלחה! בדקי את תיבת הדואר הנכנס (או הספאם).');
        } catch (error) {
            console.error(error);
            if (error.code === 'auth/user-not-found') {
                setLoginError('כתובת האימייל אינה קיימת במערכת.');
            } else {
                setLoginError('שגיאה בשליחת המייל. ודא שהכתובת תקינה.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh', 
            backgroundColor: '#f7fafc', 
            direction: 'rtl',
            padding: '20px'
        }}>
            <style>{`
                .login-card {
                    background-color: #fff;
                    padding: 40px;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    max-width: 400px;
                    width: 100%;
                    box-sizing: border-box;
                    transition: all 0.3s ease;
                }
                @media (max-width: 480px) {
                    .login-card {
                        padding: 25px 20px;
                    }
                }
                .link-btn {
                    background: none;
                    border: none;
                    color: #3182ce;
                    cursor: pointer;
                    padding: 0;
                    font-size: 0.9rem;
                    text-decoration: underline;
                }
                .link-btn:hover {
                    color: #2b6cb0;
                }
            `}</style>

            <form onSubmit={isForgotPassword ? handleForgotPassword : handleLogin} className="login-card">
                
                {/* כותרת דינמית בהתאם למצב המסך */}
                <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#2d3748', fontSize: '1.6rem' }}>
                    {isForgotPassword ? 'איפוס סיסמה' : 'כניסת מנהל מערכת'}
                </h2>
                
                {/* הודעת שגיאה */}
                {loginError && (
                    <p style={{ color: '#e53e3e', fontSize: '0.9rem', marginBottom: '15px', textAlign: 'center', backgroundColor: '#FFF5F5', padding: '8px', borderRadius: '6px', border: '1px solid #FED7D7' }}>
                        {loginError}
                    </p>
                )}

                {/* הודעת הצלחה לשחזור סיסמה */}
                {resetMessage && (
                    <p style={{ color: '#2f855a', fontSize: '0.9rem', marginBottom: '15px', textAlign: 'center', backgroundColor: '#F0FDF4', padding: '10px', borderRadius: '6px', border: '1px solid #BBF7D0' }}>
                        {resetMessage}
                    </p>
                )}
                
                {/* שדה אימייל (משותף לשני המצבים) */}
                <div style={{ marginBottom: '18px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', color: '#4a5568', fontSize: '0.95rem' }}>אימייל המנהל:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        disabled={loading}
                        style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0', boxSizing: 'border-box', fontSize: '1rem' }} 
                    />
                </div>
                
                {/* שדה סיסמה - מוצג רק במצב התחברות רגיל */}
                {!isForgotPassword && (
                    <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold', color: '#4a5568', fontSize: '0.95rem' }}>סיסמה:</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            disabled={loading}
                            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0', boxSizing: 'border-box', fontSize: '1rem' }} 
                        />
                    </div>
                )}
                
                {/* כפתור ניווט קטן בין המצבים */}
                <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                    <button 
                        type="button" 
                        className="link-btn"
                        onClick={() => {
                            setIsForgotPassword(!isForgotPassword);
                            setLoginError('');
                            setResetMessage('');
                        }}
                    >
                        {isForgotPassword ? 'חזרה למסך התחברות' : 'שכחתי סיסמה'}
                    </button>
                </div>
                
                {/* כפתור פעולה ראשי דינמי */}
                <button 
                    type="submit" 
                    disabled={loading}
                    style={{ 
                        width: '100%', 
                        padding: '12px', 
                        backgroundColor: loading ? '#cbd5e0' : '#3182ce', 
                        color: '#fff', 
                        border: 'none', 
                        borderRadius: '6px', 
                        fontSize: '1rem', 
                        fontWeight: 'bold', 
                        cursor: loading ? 'not-allowed' : 'pointer',
                        transition: 'background-color 0.2s ease'
                    }}
                >
                    {loading ? 'מבצע פעולה...' : (isForgotPassword ? 'שלח מייל לאיפוס' : 'התחבר')}
                </button>
            </form>
        </div>
    );
}