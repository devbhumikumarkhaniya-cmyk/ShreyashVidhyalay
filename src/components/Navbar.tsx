import React, { useState, useEffect } from 'react';
import { SchoolLogo } from './SchoolLogo';
import { SCHOOL_INFO } from '../data/schoolData';
import { Phone, Menu, X, ArrowRight, Search, FileText } from 'lucide-react';

interface NavbarProps {
  onApplyClick: () => void;
  onTrackClick: () => void;
  onReplayIntro?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onApplyClick,
  onTrackClick,
  onReplayIntro,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#hero' },
    { label: 'FACILITIES', href: '#facilities' },
    { label: 'SCHOOL LIFE', href: '#campus-video' },
    { label: 'ADMISSIONS', href: '#admissions' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full select-none">
      {/* Topmost Info Bar */}
      <div className="bg-[#070e1e] text-slate-300 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-indigo-950 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href={`tel:${SCHOOL_INFO.rawPhone}`}
              className="flex items-center gap-1.5 hover:text-[#818CF8] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#6366F1]" />
              <span className="font-semibold text-[#F8FAFC]">{SCHOOL_INFO.phone}</span>
            </a>
            <span className="text-slate-700">|</span>
            <span className="text-indigo-200/70 hidden md:inline">
              Admissions Open for Session {SCHOOL_INFO.session} · CBSE Affiliated
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onTrackClick}
              className="hover:text-white text-[#818CF8] font-medium underline-offset-4 hover:underline transition-colors cursor-pointer"
            >
              Track Application Status
            </button>
            {onReplayIntro && (
              <>
                <span className="text-slate-700">|</span>
                <button
                  onClick={onReplayIntro}
                  className="hover:text-[#818CF8] text-indigo-300/70 text-[11px] transition-colors cursor-pointer"
                >
                  Play Intro
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Luxury Deep Blue Sticky Navbar */}
      <nav
        className={`w-full transition-all duration-200 bg-[#0b132b]/95 backdrop-blur-md border-b ${
          isScrolled
            ? 'shadow-xl border-indigo-500/20 py-3 bg-[#0b132b]/98'
            : 'border-indigo-900/40 py-3.5 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#hero" className="flex items-center gap-2">
            <SchoolLogo size="sm" variant="dark" />
          </a>

          {/* Center Navigation Links (Luxury uppercase font tracking) */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-xs font-semibold tracking-[0.16em] uppercase transition-colors relative py-1 ${
                  idx === 0
                    ? 'text-[#F8FAFC] border-b-2 border-[#6366F1]'
                    : 'text-slate-300 hover:text-[#818CF8]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action Icons & Apply Now Button in Royal Indigo */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={onTrackClick}
              title="Track Application Status"
              className="p-2 text-slate-300 hover:text-[#818CF8] hover:bg-indigo-500/10 rounded-lg transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={onTrackClick}
              className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-[#818CF8] tracking-wider uppercase transition-colors cursor-pointer"
            >
              Track
            </button>

            <button
              onClick={onApplyClick}
              className="group inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-lg bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#4338CA] hover:from-[#6366F1] hover:to-[#4F46E5] text-[#F8FAFC] font-regal font-bold text-xs uppercase tracking-wider shadow-md shadow-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/40 transition-all active:scale-95 cursor-pointer"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Mobile Right Controls: Apply Now & Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onApplyClick}
              className="px-3 py-2 rounded-lg bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-[#F8FAFC] font-bold text-xs uppercase tracking-wider shadow-sm"
            >
              Apply Now
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-indigo-500/15 rounded-lg transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu in Deep Blue + Indigo */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#0e172e] border-t border-indigo-500/20 px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase text-[#F8FAFC] hover:bg-indigo-500/15 hover:text-[#818CF8] transition-colors font-regal"
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-3 border-t border-indigo-500/20 space-y-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onTrackClick();
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-[#818CF8] bg-white/5 font-regal"
                >
                  Track Application Status
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onApplyClick();
                  }}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-[#c5a059] to-[#b88e3e] text-black font-regal font-bold text-xs uppercase tracking-wider text-center shadow-md"
                >
                  Apply for Admission {SCHOOL_INFO.session}
                </button>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 px-1">
                <span>Helpline: {SCHOOL_INFO.phone}</span>
                <a href={`tel:${SCHOOL_INFO.rawPhone}`} className="text-[#e6ca85] font-semibold">
                  Call School
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
