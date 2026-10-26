import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

const EyeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const EyeOffIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10.6 5.1A10.4 10.4 0 0 1 12 5c6.5 0 10 7 10 7a17.6 17.6 0 0 1-2.4 3.4" />
        <path d="M6.6 6.6C3.6 8.5 2 12 2 12s3.5 7 10 7a9.7 9.7 0 0 0 5.4-1.6" />
        <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
        <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
);

export default function AdminLogin({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [resetMessage, setResetMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

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
                    .password-toggle {
                    position: absolute;
                    left: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    padding: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #a0aec0;
                    cursor: pointer;
                    border-radius: 4px;
                    transition: color 0.2s ease;
                }
                .password-toggle:hover {
                    color: #4a5568;
                }
                .password-toggle:focus-visible {
                    outline: 2px solid #3182ce;
                    outline-offset: 1px;
                }
                .password-toggle:disabled {
                    cursor: not-allowed;
                    opacity: 0.5;
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
                        <div style={{ position: 'relative' }}>
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                                disabled={loading}
                                autoComplete="current-password"
                                style={{ width: '100%', padding: '12px', paddingLeft: '44px', borderRadius: '6px', border: '1px solid #e2e8f0', boxSizing: 'border-box', fontSize: '1rem' }} 
                            />
                            {/* כפתור עין להצגה / הסתרה של הסיסמה */}
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={loading}
                                aria-label={showPassword ? 'הסתר סיסמה' : 'הצג סיסמה'}
                                title={showPassword ? 'הסתר סיסמה' : 'הצג סיסמה'}
                            >
                                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                            </button>
                        </div>
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
                            setShowPassword(false);
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