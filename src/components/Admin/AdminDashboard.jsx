import React, { useState, useEffect, useRef } from 'react';
import { db } from '../../config/firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, doc, updateDoc, deleteDoc, orderBy, query, addDoc } from 'firebase/firestore';
import DashboardHeader from './DashboardHeader';
import LeadsTable from './LeadsTable';
import LeadsMobileList from './LeadsMobileList';
import AdminLogin from './AdminLogin';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('leads'); // 'leads' | 'testimonials' | 'faq'
    const [leads, setLeads] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);


    const [editingItem, setEditingItem] = useState(null); 
    const [testimonialForm, setTestimonialForm] = useState({ name: '', role: '', text: '', stars: 5 });
    const [faqForm, setFaqForm] = useState({ question: '', answer: '' });
    const formRef = useRef(null);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                fetchAllData();
            } else {
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            // משיכת לידים
            const qLeads = query(collection(db, "leads"), orderBy("createdAt", "desc"));
            const snapshotLeads = await getDocs(qLeads);
            setLeads(snapshotLeads.docs.map(doc => ({ id: doc.id, ...doc.data() })));

            // משיכת ביקורות
            const snapshotTestimonials = await getDocs(collection(db, "testimonials"));
            setTestimonials(snapshotTestimonials.docs.map(doc => ({ id: doc.id, ...doc.data() })));

            // משיכת שאלות נפוצות
            const snapshotFaqs = await getDocs(collection(db, "faq"));
            setFaqs(snapshotFaqs.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        } catch (error) {
            console.error("שגיאה במשיכת הנתונים:", error);
        } finally {
            setLoading(false);
        }
    };

    // --- ניהול לידים ---
    const toggleStatus = async (leadId, currentStatus) => {
        const nextStatus = currentStatus === "חדש" ? "טופל" : "חדש";
        try {
            await updateDoc(doc(db, "leads", leadId), { status: nextStatus });
            setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: nextStatus } : l));
        } catch (error) { console.error(error); }
    };

    const handleDeleteLead = async (leadId, leadName) => {
        if (!window.confirm(`האם למחוק את הפנייה של ${leadName}?`)) return;
        try {
            await deleteDoc(doc(db, "leads", leadId));
            setLeads(prev => prev.filter(l => l.id !== leadId));
        } catch (error) { console.error(error); }
    };


    // --- ניהול ביקורות (Testimonials) ---
    const handleSaveTestimonial = async (e) => {
        e.preventDefault();
        try {
            if (editingItem) {
                // עריכה קיימת
                await updateDoc(doc(db, "testimonials", editingItem.id), testimonialForm);
                setTestimonials(prev => prev.map(t => t.id === editingItem.id ? { ...t, ...testimonialForm } : t));
            } else {
                // הוספה חדשה
                const docRef = await addDoc(collection(db, "testimonials"), testimonialForm);
                setTestimonials(prev => [...prev, { id: docRef.id, ...testimonialForm }]);
            }
            setTestimonialForm({ name: '', role: '', text: '', stars: 5 });
            setEditingItem(null);
        } catch (error) { console.error(error); }
    };

    const handleDeleteTestimonial = async (id) => {
        if (!window.confirm("האם למחוק ביקורת זו?")) return;
        try {
            await deleteDoc(doc(db, "testimonials", id));
            setTestimonials(prev => prev.filter(t => t.id !== id));
        } catch (error) { console.error(error); }
    };


    // --- ניהול שאלות נפוצות ---
    const handleSaveFaq = async (e) => {
        e.preventDefault();
        try {
            if (editingItem) {
                await updateDoc(doc(db, "faq", editingItem.id), faqForm);
                setFaqs(prev => prev.map(f => f.id === editingItem.id ? { ...f, ...faqForm } : f));
            } else {
                const docRef = await addDoc(collection(db, "faq"), faqForm);
                setFaqs(prev => [...prev, { id: docRef.id, ...faqForm }]);
            }
            setFaqForm({ question: '', answer: '' });
            setEditingItem(null);
        } catch (error) { console.error(error); }
    };

    const handleDeleteFaq = async (id) => {
        if (!window.confirm("האם למחוק שאלה זו?")) return;
        try {
            await deleteDoc(doc(db, "faq", id));
            setFaqs(prev => prev.filter(f => f.id !== id));
        } catch (error) { console.error(error); }
    };

    if (loading) {
        return <div style={{ padding: '50px', fontSize: '1.5rem', textAlign: 'center' }}>טוען נתונים...</div>;
    }

    if (!user) {
        return <AdminLogin onLoginSuccess={fetchAllData} />;
    }

    const newLeadsCount = leads.filter(l => l.status === "חדש").length;

    return (
        <div style={{ padding: '20px 4%', backgroundColor: '#f7fafc', minHeight: '100vh', direction: 'rtl' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

                {/* שורת התנתקות */}
                <div style={{ textAlign: 'left', marginBottom: '10px' }}>
                    <button onClick={() => signOut(auth)} style={{ background: 'none', border: 'none', color: '#a0aec0', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        התנתק מהמערכת
                    </button>
                </div>

                <DashboardHeader newLeadsCount={newLeadsCount} onRefresh={fetchAllData} />

                {/* תפריט טאבים (Navigation Tabs) */}
                <div style={{ display: 'flex', gap: '15px', marginBottom: '25px', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px' }}>
                    <button onClick={() => { setActiveTab('leads'); setEditingItem(null); }} style={{ padding: '10px 20px', cursor: 'pointer', border: 'none', background: activeTab === 'leads' ? '#ED64A6' : 'transparent', color: activeTab === 'leads' ? '#fff' : '#4A5568', borderRadius: '5px', fontWeight: 'bold' }}>
                        פניות מלקוחות ({leads.length})
                    </button>
                    <button onClick={() => { setActiveTab('testimonials'); setEditingItem(null); }} style={{ padding: '10px 20px', cursor: 'pointer', border: 'none', background: activeTab === 'testimonials' ? '#ED64A6' : 'transparent', color: activeTab === 'testimonials' ? '#fff' : '#4A5568', borderRadius: '5px', fontWeight: 'bold' }}>
                        ניהול ביקורות ({testimonials.length})
                    </button>
                    <button onClick={() => { setActiveTab('faq'); setEditingItem(null); }} style={{ padding: '10px 20px', cursor: 'pointer', border: 'none', background: activeTab === 'faq' ? '#ED64A6' : 'transparent', color: activeTab === 'faq' ? '#fff' : '#4A5568', borderRadius: '5px', fontWeight: 'bold' }}>
                        ניהול שאלות ותשובות ({faqs.length})
                    </button>
                </div>

                {/* --- תוכן טאב 1: לידים --- */}
                {activeTab === 'leads' && (
                    leads.length === 0 ? (
                        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#718096' }}>אין עדיין פניות בבסיס הנתונים.</p>
                    ) : (
                        <div>
                            <style>{`
                                .desktop-container { display: block; }
                                .mobile-container { display: none; }
                                @media (max-width: 768px) {
                                    .desktop-container { display: none; }
                                    .mobile-container { display: block; }
                                }
                            `}</style>
                            <div className="desktop-container">
                                <LeadsTable leads={leads} onToggleStatus={toggleStatus} onDelete={handleDeleteLead} />
                            </div>
                            <div className="mobile-container">
                                <LeadsMobileList leads={leads} onToggleStatus={toggleStatus} onDelete={handleDeleteLead} />
                            </div>
                        </div>
                    )
                )}

                {/* --- תוכן טאב 2: ביקורות --- */}
                {activeTab === 'testimonials' && (
                    <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                        <h3 ref={formRef}>{editingItem ? 'עריכת ביקורת' : 'הוספת ביקורת חדשה'}</h3>
                        <form onSubmit={handleSaveTestimonial} style={{ display: 'grid', gap: '10px', marginBottom: '30px', maxWidth: '500px' }}>
                            <input type="text" placeholder="שם הלקוח/ה" value={testimonialForm.name} onChange={e => setTestimonialForm({ ...testimonialForm, name: e.target.value })} required style={{ padding: '8px', border: '1px solid #cbd5e0', borderRadius: '4px' }} />
                            <input type="text" placeholder="תפקיד / תיאור (למשל: לקוחה קבועה)" value={testimonialForm.role} onChange={e => setTestimonialForm({ ...testimonialForm, role: e.target.value })} style={{ padding: '8px', border: '1px solid #cbd5e0', borderRadius: '4px' }} />
                            <textarea placeholder="תוכן הכתבה / הביקורת" value={testimonialForm.text} onChange={e => setTestimonialForm({ ...testimonialForm, text: e.target.value })} required style={{ padding: '8px', border: '1px solid #cbd5e0', borderRadius: '4px', minHeight: '8px' }} />
                            <select value={testimonialForm.stars} onChange={e => setTestimonialForm({ ...testimonialForm, stars: Number(e.target.value) })} style={{ padding: '8px', border: '1px solid #cbd5e0', borderRadius: '4px' }}>
                                <option value="5">5 כוכבים</option>
                                <option value="4">4 כוכבים</option>
                                <option value="3">3 כוכבים</option>
                            </select>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button type="submit" style={{ background: '#4A5568', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                    {editingItem ? 'עדכן ביקורת' : 'שמור ביקורת'}
                                </button>
                                {editingItem && <button type="button" onClick={() => { setEditingItem(null); setTestimonialForm({ name: '', role: '', text: '', stars: 5 }); }} style={{ background: '#e2e8f0', color: '#2d3748', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>ביטול</button>}
                            </div>
                        </form>

                        <hr style={{ borderColor: '#edf2f7', margin: '20px 0' }} />

                        <h4>רשימת ביקורות קיימות:</h4>
                        <div style={{ display: 'grid', gap: '15px' }}>
                            {testimonials.map(t => (
                                <div key={t.id} style={{ border: '1px solid #e2e8f0', padding: '15px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <strong>{t.name}</strong> <span style={{ color: '#718096', fontSize: '0.9rem' }}>({t.role})</span>
                                        <p style={{ margin: '5px 0 0 0' }}>{t.text}</p>
                                        <span style={{ color: '#ecc94b' }}>{'★'.repeat(t.stars)}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button
                                            onClick={() => {
                                                setEditingItem(t);
                                                setTestimonialForm({ name: t.name, role: t.role, text: t.text, stars: t.stars });
                                                formRef.current?.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                            style={{ background: '#e2e8f0', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                                        >
                                            ערוך
                                        </button>
                                        <button onClick={() => handleDeleteTestimonial(t.id)} style={{ background: '#fed7d7', color: '#c53030', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>מחק</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- תוכן טאב 3: שאלות ותשובות --- */}
                {activeTab === 'faq' && (
                    <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                        <h3 ref={formRef}>{editingItem ? 'עריכת שאלה' : 'הוספת שאלה חדשה'}</h3>
                        <form onSubmit={handleSaveFaq} style={{ display: 'grid', gap: '10px', marginBottom: '30px', maxWidth: '500px' }}>
                            <input type="text" placeholder="השאלה" value={faqForm.question} onChange={e => setFaqForm({ ...faqForm, question: e.target.value })} required style={{ padding: '8px', border: '1px solid #cbd5e0', borderRadius: '4px' }} />
                            <textarea placeholder="התשובה" value={faqForm.answer} onChange={e => setFaqForm({ ...faqForm, answer: e.target.value })} required style={{ padding: '8px', border: '1px solid #cbd5e0', borderRadius: '4px', minHeight: '8px' }} />
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button type="submit" style={{ background: '#4A5568', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                    {editingItem ? 'עדכן שאלה' : 'שמור שאלה'}
                                </button>
                                {editingItem && <button type="button" onClick={() => { setEditingItem(null); setFaqForm({ question: '', answer: '' }); }} style={{ background: '#e2e8f0', color: '#2d3748', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>ביטול</button>}
                            </div>
                        </form>

                        <hr style={{ borderColor: '#edf2f7', margin: '20px 0' }} />

                        <h4>רשימת שאלות ותשובות קיימות:</h4>
                        <div style={{ display: 'grid', gap: '15px' }}>
                            {faqs.map(f => (
                                <div key={f.id} style={{ border: '1px solid #e2e8f0', padding: '15px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <strong>{f.question}</strong>
                                        <p style={{ margin: '5px 0 0 0', color: '#4a5568' }}>{f.answer}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button
                                            onClick={() => {
                                                setEditingItem(f);
                                                setFaqForm({ question: f.question, answer: f.answer });
                                                formRef.current?.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                            style={{ background: '#e2e8f0', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                                        >
                                            ערוך
                                        </button>
                                        <button onClick={() => handleDeleteFaq(f.id)} style={{ background: '#fed7d7', color: '#c53030', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>מחק</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}