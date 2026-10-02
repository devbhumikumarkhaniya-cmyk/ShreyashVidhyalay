import React, { useState } from 'react';
import { SCHOOL_FACILITIES } from '../data/schoolData';
import { Wind, Tv, Users, Brain, Award, Music, Compass, CheckCircle, Sparkles } from 'lucide-react';

const facilityIcons: Record<string, React.ReactNode> = {
  Wind: <Wind className="w-6 h-6 text-[#6366F1]" />,
  Tv: <Tv className="w-6 h-6 text-[#6366F1]" />,
  Users: <Users className="w-6 h-6 text-[#6366F1]" />,
  Brain: <Brain className="w-6 h-6 text-[#6366F1]" />,
  Award: <Award className="w-6 h-6 text-[#6366F1]" />,
  Music: <Music className="w-6 h-6 text-[#6366F1]" />,
  Compass: <Compass className="w-6 h-6 text-[#6366F1]" />,
};

interface FacilitiesSectionProps {
  onApplyClick: () => void;
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({ onApplyClick }) => {
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);

  return (
    <section id="facilities" className="py-24 bg-[#0b132b] text-[#F8FAFC] relative border-b border-indigo-500/20">
      {/* Background subtle aura in indigo */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-[#6366F1]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#818CF8] mb-3 font-regal">
              <Sparkles className="w-3.5 h-3.5 text-[#6366F1]" />
              <span>Campus Infrastructure & Amenities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-medium tracking-tight text-[#F8FAFC]">
              School Facilities & Infrastructure
            </h2>
            <p className="mt-3 text-base text-indigo-200/80 font-light leading-relaxed">
              Modern spaces and student-centered amenities crafted to nurture academic excellence, physical health, and creative self-expression.
            </p>
          </div>

          <button
            onClick={onApplyClick}
            className="self-start md:self-auto px-6 py-3 rounded-lg bg-[#6366F1]/15 text-[#818CF8] hover:bg-[#6366F1] hover:text-white font-regal font-bold text-xs uppercase tracking-wider transition-all border border-indigo-500/30 hover:border-[#6366F1] shadow-sm cursor-pointer"
          >
            Visit Our Campus →
          </button>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SCHOOL_FACILITIES.map((facility) => {
            const isSelected = selectedFacility === facility.id;
            return (
              <div
                key={facility.id}
                onClick={() => setSelectedFacility(isSelected ? null : facility.id)}
                className={`group cursor-pointer p-6 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#6366F1] bg-[#1e293b] shadow-xl ring-2 ring-[#6366F1]/30'
                    : 'border-indigo-500/20 bg-[#0f172a] hover:border-[#6366F1]/50 hover:shadow-2xl hover:shadow-indigo-500/15 hover:-translate-y-1'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-indigo-500/20 group-hover:bg-[#6366F1]/20 group-hover:border-[#6366F1]/40 flex items-center justify-center transition-colors">
                      {facilityIcons[facility.icon] || <CheckCircle className="w-6 h-6 text-[#6366F1]" />}
                    </div>
                    <span className="text-[10px] font-semibold text-indigo-200/80 uppercase tracking-wider bg-white/5 border border-indigo-500/20 px-2.5 py-1 rounded-md">
                      {facility.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-heading font-bold text-[#F8FAFC] group-hover:text-[#818CF8] transition-colors">
                    {facility.title}
                  </h3>

                  <p className="mt-2.5 text-sm text-slate-300 font-light leading-relaxed">
                    {facility.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-indigo-500/15 flex items-center justify-between text-xs text-[#818CF8] font-medium">
                  <span>Available on Campus</span>
                  <CheckCircle className="w-4 h-4 text-[#6366F1]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
