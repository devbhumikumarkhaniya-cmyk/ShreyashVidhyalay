import React from 'react';
import { SchoolLogo } from './SchoolLogo';
import { SCHOOL_INFO } from '../data/schoolData';
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';

interface FooterProps {
  onApplyClick: () => void;
  onOpenPolicy: (policy: 'privacy' | 'terms' | 'refund') => void;
  onOpenDocList: () => void;
  onOpenProcess: () => void;
  onTrackClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onApplyClick,
  onOpenPolicy,
  onOpenDocList,
  onOpenProcess,
  onTrackClick,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070e1e] text-slate-300 pt-16 pb-12 border-t border-indigo-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-indigo-900/30">
          {/* Col 1: Logo & School Description */}
          <div className="lg:col-span-4 space-y-4">
            <SchoolLogo size="md" variant="dark" />
            <p className="text-sm text-indigo-100/70 leading-relaxed max-w-sm">
              Shreyash Vidhyalay (શ્રેયસ વિદ્યાલય) is dedicated to academic excellence,
              moral character, and holistic development in a caring, student-first atmosphere.
            </p>
            <div className="text-xs text-[#818CF8] font-semibold tracking-wide font-regal">
              Affiliation: {SCHOOL_INFO.affiliation}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-heading font-bold text-[#F8FAFC] uppercase tracking-wider font-regal">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#hero" className="hover:text-[#818CF8] transition-colors">Home</a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-[#818CF8] transition-colors">Facilities</a>
              </li>
              <li>
                <a href="#campus-video" className="hover:text-[#818CF8] transition-colors">School Life</a>
              </li>
              <li>
                <a href="#admissions" className="hover:text-[#818CF8] transition-colors">Admissions</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#818CF8] transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Admission Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-heading font-bold text-[#F8FAFC] uppercase tracking-wider font-regal">
              Admission
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={onApplyClick}
                  className="hover:text-white transition-colors text-left font-medium text-[#818CF8] cursor-pointer"
                >
                  Apply Online (Session {SCHOOL_INFO.session})
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenProcess}
                  className="hover:text-[#818CF8] transition-colors text-left cursor-pointer"
                >
                  Admission Process
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDocList}
                  className="hover:text-[#818CF8] transition-colors text-left cursor-pointer"
                >
                  Required Documents
                </button>
              </li>
              <li>
                <button
                  onClick={onTrackClick}
                  className="hover:text-[#818CF8] transition-colors text-left text-slate-300 cursor-pointer"
                >
                  Track Submitted Application
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-heading font-bold text-[#F8FAFC] uppercase tracking-wider font-regal">
              Contact
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#6366F1] shrink-0" />
                <a
                  href={`tel:${SCHOOL_INFO.rawPhone}`}
                  className="text-white font-semibold hover:text-[#818CF8] transition-colors"
                >
                  {SCHOOL_INFO.phone}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#6366F1] shrink-0 mt-1" />
                <span className="text-xs leading-relaxed text-indigo-100/80">{SCHOOL_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#6366F1] shrink-0" />
                <span className="text-xs truncate text-indigo-100/80">{SCHOOL_INFO.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policy Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-indigo-200/60">
          <div>
            © {new Date().getFullYear()} Shreyash Vidhyalay. All Rights Reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenPolicy('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenPolicy('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => onOpenPolicy('refund')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Refund / Fee Policy
            </button>
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="p-2 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-[#818CF8] hover:text-white border border-indigo-500/25 transition-colors cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
