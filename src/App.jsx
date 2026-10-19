import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import OpenPage from './components/OpenPage';
import AdminDashboard from './components/Admin/AdminDashboard';
import PrivacyPolicy from './components/PrivacyPolicy';

export default function App() {
  const isAdmin = window.location.search.includes('admin=true');

  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  if (isAdmin) {
    return <AdminDashboard />;
  }

  return (
    <div>
      <Navbar />
      <OpenPage />
      <Services />
      <Testimonials />
      <FAQ />
      <Contact />
      {/* מעבירים לפוטר פונקציה שתפתח את המודל בלחיצה */}
      <Footer onOpenPrivacy={() => setIsPrivacyOpen(true)} />
      {isPrivacyOpen && (
        <PrivacyPolicy onClose={() => setIsPrivacyOpen(false)} />
      )}
    </div>
  );
}