import React from 'react';
import { SCHOOL_INFO } from '../data/schoolData';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface AdmissionCtaSectionProps {
  onApplyClick: () => void;
  onTrackClick: () => void;
}

export const AdmissionCtaSection: React.FC<AdmissionCtaSectionProps> = ({
  onApplyClick,
  onTrackClick,
}) => {
  return (
    <section id="admissions" className="py-20 bg-[#08080a] text-[#F8FAFC] relative overflow-hidden border-t border-blue-500/20">
      {/* Glow and geometric ambient accents in blue */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB]/15 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900/20 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Session Banner Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-[#60A5FA] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 backdrop-blur-md font-regal">
          <Sparkles className="w-4 h-4 text-[#3B82F6]" />
          <span>Admission Session: {SCHOOL_INFO.session}</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif-luxury font-medium tracking-tight text-[#F8FAFC] max-w-4xl mx-auto leading-tight">
          Admissions Are Open
        </h2>

        {/* Subheading */}
        <p className="mt-5 text-base sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed font-normal">
          Give your child a supportive environment to learn, grow and discover their highest potential.
        </p>

        {/* Key Admission Steps Checklist */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-blue-200/90">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#3B82F6]" />
            <span>Fill Application Online</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#3B82F6]" />
            <span>Upload Basic Documents</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#3B82F6]" />
            <span>₹1,000 Advance Fee</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#3B82F6]" />
            <span>Instant Application ID & Receipt</span>
          </div>
        </div>

        {/* Large Focused Button in Electric Blue */}
        <div className="mt-10 flex items-center justify-center">
          <button
            onClick={onApplyClick}
            className="group w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 rounded-2xl bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#3B82F6] hover:from-[#2563EB] hover:to-[#1D4ED8] text-[#F8FAFC] font-regal font-extrabold text-base sm:text-lg shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-200 uppercase tracking-wider cursor-pointer"
          >
            <span>APPLY FOR ADMISSION</span>
            <ArrowRight className="w-5 h-5 ml-2.5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Security & Support Note */}
        <p className="mt-6 text-xs text-blue-200/70">
          Need assistance with the admission form? Call our admission cell directly at{' '}
          <a href={`tel:${SCHOOL_INFO.rawPhone}`} className="text-[#60A5FA] font-semibold underline underline-offset-4 hover:text-white">
            {SCHOOL_INFO.phone}
          </a>
        </p>
      </div>
    </section>
  );
};
