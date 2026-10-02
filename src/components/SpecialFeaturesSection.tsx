import React from 'react';
import { SPECIAL_FEATURES } from '../data/schoolData';
import { GraduationCap, Smile, MonitorPlay, Sparkles, Trophy, CheckCircle2 } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap className="w-6 h-6 text-[#3B82F6]" />,
  Smile: <Smile className="w-6 h-6 text-[#3B82F6]" />,
  MonitorPlay: <MonitorPlay className="w-6 h-6 text-[#3B82F6]" />,
  Sparkles: <Sparkles className="w-6 h-6 text-[#3B82F6]" />,
  Trophy: <Trophy className="w-6 h-6 text-[#3B82F6]" />,
};

export const SpecialFeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-[#08080a] border-b border-blue-500/20 relative text-[#F8FAFC]">
      {/* Background soft glow in electric blue */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#60A5FA] mb-3 font-regal">
            <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>Our Educational Philosophy · Student-First Approach</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-medium tracking-tight text-[#F8FAFC]">
            What Makes Our School Special
          </h2>
          <p className="mt-4 text-base sm:text-lg text-blue-200/80 font-light leading-relaxed">
            Every child is unique. Our holistic pedagogical framework is designed to empower every learner
            intellectually, creatively, and emotionally.
          </p>
        </div>

        {/* 5 Modern Black Cards with Blue Accents */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SPECIAL_FEATURES.map((item, index) => {
            const isFifth = index === 4;
            return (
              <div
                key={item.id}
                className={`group relative bg-[#0e121a] rounded-2xl p-7 sm:p-8 border border-blue-500/20 shadow-xl hover:shadow-2xl hover:shadow-blue-500/15 hover:border-[#3B82F6]/60 hover:-translate-y-1 transition-all duration-300 ${
                  isFifth ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Accent Top Border Bar in Blue */}
                <div className="absolute top-0 inset-x-8 h-1 bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex flex-col h-full">
                  {/* Icon & Index Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center border border-blue-500/30 bg-blue-500/15 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300">
                      {iconMap[item.iconName]}
                    </div>
                    <span className="text-3xl font-serif-luxury font-bold text-white/10 group-hover:text-blue-400/40 transition-colors">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-heading font-bold text-[#F8FAFC] group-hover:text-[#60A5FA] transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm sm:text-base text-slate-300 font-light leading-relaxed flex-grow">
                    {item.description}
                  </p>

                  {/* Benefit highlight */}
                  <div className="mt-6 pt-5 border-t border-blue-500/15 flex items-center gap-2 text-xs font-medium text-blue-200/80">
                    <CheckCircle2 className="w-4 h-4 text-[#3B82F6] shrink-0" />
                    <span>Nurturing individual student strengths</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
