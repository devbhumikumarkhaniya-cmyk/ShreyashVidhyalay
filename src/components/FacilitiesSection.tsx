import React, { useState } from 'react';
import { SCHOOL_FACILITIES } from '../data/schoolData';
import { Wind, Tv, Users, Brain, Award, Music, Compass, CheckCircle, Sparkles } from 'lucide-react';

const facilityIcons: Record<string, React.ReactNode> = {
  Wind: <Wind className="w-6 h-6 text-[#3B82F6]" />,
  Tv: <Tv className="w-6 h-6 text-[#3B82F6]" />,
  Users: <Users className="w-6 h-6 text-[#3B82F6]" />,
  Brain: <Brain className="w-6 h-6 text-[#3B82F6]" />,
  Award: <Award className="w-6 h-6 text-[#3B82F6]" />,
  Music: <Music className="w-6 h-6 text-[#3B82F6]" />,
  Compass: <Compass className="w-6 h-6 text-[#3B82F6]" />,
};

interface FacilitiesSectionProps {
  onApplyClick: () => void;
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({ onApplyClick }) => {
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);

  return (
    <section id="facilities" className="py-24 bg-[#08080a] text-[#F8FAFC] relative border-b border-blue-500/20">
      {/* Background subtle aura in blue */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#60A5FA] mb-3 font-regal">
              <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>Campus Infrastructure & Amenities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-medium tracking-tight text-[#F8FAFC]">
              School Facilities & Infrastructure
            </h2>
            <p className="mt-3 text-base text-blue-200/80 font-light leading-relaxed">
              Modern spaces and student-centered amenities crafted to nurture academic excellence, physical health, and creative self-expression.
            </p>
          </div>

          <button
            onClick={onApplyClick}
            className="self-start md:self-auto px-6 py-3 rounded-lg bg-blue-500/15 text-[#60A5FA] hover:bg-[#2563EB] hover:text-white font-regal font-bold text-xs uppercase tracking-wider transition-all border border-blue-500/30 hover:border-[#3B82F6] shadow-sm cursor-pointer"
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
                    ? 'border-[#2563EB] bg-[#111622] shadow-xl ring-2 ring-[#2563EB]/30'
                    : 'border-blue-500/20 bg-[#0e121a] hover:border-[#3B82F6]/50 hover:shadow-2xl hover:shadow-blue-500/15 hover:-translate-y-1'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-blue-500/20 group-hover:bg-[#2563EB]/20 group-hover:border-[#3B82F6]/40 flex items-center justify-center transition-colors">
                      {facilityIcons[facility.icon] || <CheckCircle className="w-6 h-6 text-[#3B82F6]" />}
                    </div>
                    <span className="text-[10px] font-semibold text-blue-200/80 uppercase tracking-wider bg-white/5 border border-blue-500/20 px-2.5 py-1 rounded-md">
                      {facility.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-heading font-bold text-[#F8FAFC] group-hover:text-[#60A5FA] transition-colors">
                    {facility.title}
                  </h3>

                  <p className="mt-2.5 text-sm text-slate-300 font-light leading-relaxed">
                    {facility.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-blue-500/15 flex items-center justify-between text-xs text-[#60A5FA] font-medium">
                  <span>Available on Campus</span>
                  <CheckCircle className="w-4 h-4 text-[#3B82F6]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
