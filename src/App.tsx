/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LogoIntro } from './components/LogoIntro';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { JPJewelsCategoryShowcase } from './components/JPJewelsCategoryShowcase';
import { SpecialFeaturesSection } from './components/SpecialFeaturesSection';
import { CampusVideoSection } from './components/CampusVideoSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { AdmissionCtaSection } from './components/AdmissionCtaSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdmissionModal } from './components/AdmissionModal';
import { TrackApplicationModal } from './components/TrackApplicationModal';
import { InfoModals } from './components/InfoModals';
import { AdmissionApplication } from './types';
import { SCHOOL_INFO } from './data/schoolData';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [isTrackOpen, setIsTrackOpen] = useState(false);
  const [trackingDetails, setTrackingDetails] = useState<{ appNumber: string; mobile: string }>({
    appNumber: '',
    mobile: '',
  });

  const [activeInfoModal, setActiveInfoModal] = useState<
    'privacy' | 'terms' | 'refund' | 'documents' | 'process' | null
  >(null);

  // Seed a sample application into localStorage for immediate tracking capability
  useEffect(() => {
    try {
      const stored = localStorage.getItem('shreyash_applications');
      if (!stored) {
        const seedApp: AdmissionApplication = {
          applicationNumber: 'ADM-2026-78421',
          transactionReference: 'TXN-IND-902148',
          submittedAt: '01 Oct 2026, 10:30 AM',
          studentInfo: {
            fullName: 'Aarav Patel',
            dob: '2014-05-12',
            gender: 'Male',
            classApplyingFor: 'Class 6',
            previousSchool: 'Gujarat Model School',
          },
          parentInfo: {
            fatherName: 'Sunil Patel',
            motherName: 'Anjali Patel',
            mobile: '9228300920',
            email: 'sunil.patel@example.com',
          },
          addressInfo: {
            residentialAddress: 'Shreyash Campus Road, Satellite',
            city: 'Ahmedabad',
            state: 'Gujarat',
            pinCode: '380015',
          },
          documents: [
            { label: 'Student Photograph', fileName: 'aarav_photo.jpg', fileSize: 420000 },
            { label: 'Birth Certificate', fileName: 'birth_cert_aarav.pdf', fileSize: 1200000 },
          ],
          feeAmount: 1000,
          paymentStatus: 'PAID',
          applicationStatus: 'Under Document Verification',
          paymentMethod: 'UPI / QR Code',
        };
        localStorage.setItem('shreyash_applications', JSON.stringify([seedApp]));
      }
    } catch {
      // storage unavailable
    }
  }, []);

  const handleOpenAdmission = () => {
    setIsAdmissionOpen(true);
  };

  const handleOpenTrack = (appNumber = '', mobile = '') => {
    setTrackingDetails({ appNumber, mobile });
    setIsTrackOpen(true);
  };

  const handleExploreClick = () => {
    const el = document.getElementById('features');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#08080a] text-slate-100 relative selection:bg-[#c5a059] selection:text-black">
      {/* 1. Intro / Animated Logo */}
      {showIntro && <LogoIntro onComplete={() => setShowIntro(false)} />}

      {/* Main Website (visible underneath & active once intro transitions) */}
      <div id="hero" className="w-full">
        {/* Sticky Navbar */}
        <Navbar
          onApplyClick={handleOpenAdmission}
          onTrackClick={() => handleOpenTrack()}
          onReplayIntro={() => setShowIntro(true)}
        />

        {/* 2. Hero Section */}
        <main>
          <HeroSection
            onApplyClick={handleOpenAdmission}
            onExploreClick={handleExploreClick}
          />

          {/* JP Jewels (https://jpjewels.netlify.app/) Dual Scrolling Image Card Showcase */}
          <JPJewelsCategoryShowcase onCategoryClick={() => handleOpenAdmission()} />

          {/* 3. Services / Learning Experience: What Makes Our School Special (5 Cards) */}
          <SpecialFeaturesSection />

          {/* 4. School Video Section: See Our School in Action */}
          <CampusVideoSection />

          {/* 10. School Facilities (Confirmed Facilities) */}
          <FacilitiesSection onApplyClick={handleOpenAdmission} />

          {/* 5. Admission CTA: Admissions Are Open */}
          <AdmissionCtaSection
            onApplyClick={handleOpenAdmission}
            onTrackClick={() => handleOpenTrack()}
          />

          {/* 11. Contact Section */}
          <ContactSection />
        </main>

        {/* 12. Footer */}
        <Footer
          onApplyClick={handleOpenAdmission}
          onOpenPolicy={(policy) => setActiveInfoModal(policy)}
          onOpenDocList={() => setActiveInfoModal('documents')}
          onOpenProcess={() => setActiveInfoModal('process')}
          onTrackClick={() => handleOpenTrack()}
        />

        {/* Floating Quick Action Contact Widget (Mobile / Tablet Convenience) */}
        <div className="fixed bottom-5 right-5 z-30 flex flex-col gap-2.5 sm:hidden no-print">
          <a
            href={`https://wa.me/${SCHOOL_INFO.whatsappPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-emerald-600 text-white shadow-xl flex items-center justify-center active:scale-95 transition-transform"
            aria-label="WhatsApp School Desk"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.288.043.088.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.087-.179.182-.077.357.102.174.453.748.971 1.209.667.593 1.229.776 1.403.863.174.087.275.073.377-.044.102-.116.434-.506.55-.679.116-.174.232-.145.39-.087s1.011.477 1.185.564.29.13.333.203c.043.072.043.419-.101.824z" />
            </svg>
          </a>
        </div>

        {/* 6. Admission Popup / Wizard (Form, Document Upload, ₹1,000 Advance Fee, Payment Gateway) */}
        <AdmissionModal
          isOpen={isAdmissionOpen}
          onClose={() => setIsAdmissionOpen(false)}
          onTrackApp={(appNumber, mobile) => handleOpenTrack(appNumber, mobile)}
        />

        {/* 7. Track Application Modal */}
        <TrackApplicationModal
          isOpen={isTrackOpen}
          onClose={() => setIsTrackOpen(false)}
          initialAppNumber={trackingDetails.appNumber}
          initialMobile={trackingDetails.mobile}
        />

        {/* Informational Policy & Procedure Modals */}
        <InfoModals
          type={activeInfoModal}
          onClose={() => setActiveInfoModal(null)}
          onApplyClick={() => {
            setActiveInfoModal(null);
            handleOpenAdmission();
          }}
        />
      </div>
    </div>
  );
}
