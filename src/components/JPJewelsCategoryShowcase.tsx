import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

import catPrePrimaryImg from '../assets/images/cat_pre_primary_1790934000487.jpg';
import catScienceStemImg from '../assets/images/cat_science_stem_1790934016259.jpg';
import catSmartClassImg from '../assets/images/cat_smart_class_1790934032863.jpg';
import catSportsTurfImg from '../assets/images/cat_sports_turf_1790934048591.jpg';
import catLibraryImg from '../assets/images/cat_library_1790934062978.jpg';
import catArtsMusicImg from '../assets/images/cat_arts_music_1790934081273.jpg';

export interface CategoryCardData {
  id: string;
  category: string;
  tag: string;
  title: string;
  subtitle: string;
  imageUrl: string;
}

const row1Categories: CategoryCardData[] = [
  {
    id: 'pre-primary',
    category: 'Pre-Primary',
    tag: 'Nursery – UKG',
    title: 'Kindergarten & Early Years',
    subtitle: 'Sensory discovery & foundational literacy',
    imageUrl: catPrePrimaryImg,
  },
  {
    id: 'science-stem',
    category: 'STEM Labs',
    tag: 'Class VI – XII',
    title: 'Advanced Science Labs',
    subtitle: 'Hands-on experiments in physics, chem & bio',
    imageUrl: catScienceStemImg,
  },
  {
    id: 'smart-class',
    category: 'Digital Tech',
    tag: 'Smart Classrooms',
    title: 'AC Smart Digital Rooms',
    subtitle: 'Interactive touchscreen AV learning displays',
    imageUrl: catSmartClassImg,
  },
  {
    id: 'sports-turf',
    category: 'Athletics',
    tag: 'Sports Arena',
    title: 'Campus Turf & Sports',
    subtitle: 'Dedicated coaches for football, cricket & yoga',
    imageUrl: catSportsTurfImg,
  },
  {
    id: 'library-hub',
    category: 'Resource',
    tag: 'Knowledge Lounge',
    title: 'Grand Research Library',
    subtitle: 'Quiet study pods with 5,000+ reference volumes',
    imageUrl: catLibraryImg,
  },
  {
    id: 'performing-arts',
    category: 'Culture',
    tag: 'Auditorium Stage',
    title: 'Music & Performing Arts',
    subtitle: 'Vocal, classical instruments & annual theater',
    imageUrl: catArtsMusicImg,
  },
];

const row2Categories: CategoryCardData[] = [
  {
    id: 'primary-wing',
    category: 'Primary Wing',
    tag: 'Class I – V',
    title: 'Junior Academic Academy',
    subtitle: 'Conceptual math, science, and languages',
    imageUrl: catSmartClassImg,
  },
  {
    id: 'senior-science',
    category: 'Senior Wing',
    tag: 'Class XI & XII',
    title: 'Senior Secondary Science',
    subtitle: 'PCM & PCB with specialized board & entrance focus',
    imageUrl: catScienceStemImg,
  },
  {
    id: 'commerce-wing',
    category: 'Commerce',
    tag: 'Class XI & XII',
    title: 'Commerce & Economics',
    subtitle: 'Accountancy, business studies & applied analytics',
    imageUrl: catLibraryImg,
  },
  {
    id: 'robotics-coding',
    category: 'Future Skills',
    tag: 'Innovation Club',
    title: 'Robotics & STEM Arena',
    subtitle: 'Applied electronics, AI modules and logic workshops',
    imageUrl: catScienceStemImg,
  },
  {
    id: 'championship-sports',
    category: 'Fitness',
    tag: 'Outdoor Turf',
    title: 'Championship Athletics',
    subtitle: 'Track and field events, inter-school tournaments',
    imageUrl: catSportsTurfImg,
  },
  {
    id: 'foundational-play',
    category: 'Montessori',
    tag: 'Joyful Play',
    title: 'Early Childhood Center',
    subtitle: 'Warm and caring lady mentors & activity zones',
    imageUrl: catPrePrimaryImg,
  },
];

interface JPJewelsCategoryShowcaseProps {
  onCategoryClick: (categoryName: string) => void;
}

export const JPJewelsCategoryShowcase: React.FC<JPJewelsCategoryShowcaseProps> = ({ onCategoryClick }) => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="relative w-full bg-[#08080a] py-14 sm:py-20 border-b border-blue-500/20 overflow-hidden select-none marquee-container">
      {/* Ambient background blue glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-96 bg-[#2563EB]/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Header with Kicker */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#60A5FA] mb-2.5 font-regal">
            <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>Discover Campus Categories</span>
            <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif-luxury font-medium tracking-tight text-[#F8FAFC]">
            Explore Academic Wings & Facilities
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-blue-200/80 font-light max-w-xl mx-auto">
            Hover over any category to pause and explore our curriculum and campus amenities.
          </p>
        </motion.div>
      </div>

      {/* Left and Right Luxury Gradient Fade Masks */}
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-0 w-12 sm:w-36 bg-gradient-to-r from-[#08080a] via-[#08080a]/90 to-transparent z-20 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 right-0 w-12 sm:w-36 bg-gradient-to-l from-[#08080a] via-[#08080a]/90 to-transparent z-20 pointer-events-none"
      />

      {/* ============================================================== */}
      {/* ROW 1: ANIMATE-SCROLL-LEFT (INFINITE TO LEFT) */}
      {/* ============================================================== */}
      <div
        className="mb-4 sm:mb-6 overflow-hidden relative z-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`flex gap-3 sm:gap-5 w-max ${isPaused ? 'pause-animation' : 'animate-scroll-left'}`}
          style={{ '--scroll-duration': '38s' } as React.CSSProperties}
        >
          {[...row1Categories, ...row1Categories].map((item, idx) => (
            <div
              key={`row1-${item.id}-${idx}`}
              onClick={() => onCategoryClick(item.title)}
              className="group relative w-48 sm:w-64 h-56 sm:h-72 rounded-xl sm:rounded-2xl overflow-hidden bg-[#0e121a] border border-blue-500/25 hover:border-[#3B82F6] hover:shadow-[0_12px_35px_rgba(37,99,235,0.35)] shrink-0 transition-all duration-300 hover:scale-[1.03] cursor-pointer flex flex-col justify-between p-3.5 sm:p-4 select-none"
            >
              {/* Background Image with Zoom & Dark Gradient */}
              <div className="absolute inset-0 bg-black">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-112 filter brightness-[1.04]"
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/50 to-black/20 pointer-events-none" />
              </div>

              {/* Top Badges */}
              <div className="relative z-10 flex items-center justify-between gap-1">
                <span className="text-[8px] sm:text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-sm bg-[#08080a]/85 backdrop-blur-md border border-blue-500/40 text-[#F8FAFC]">
                  {item.category}
                </span>
                <span className="text-[7.5px] sm:text-[8.5px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-sm bg-[#2563EB] text-white shadow-xs">
                  {item.tag}
                </span>
              </div>

              {/* Bottom Details */}
              <div className="relative z-10 pt-2">
                <h3 className="font-serif-luxury text-sm sm:text-base font-medium text-[#F8FAFC] group-hover:text-[#60A5FA] transition-colors line-clamp-1 mb-1">
                  {item.title}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-blue-100/70 font-light line-clamp-1 leading-snug mb-2">
                  {item.subtitle}
                </p>
                <div className="pt-2 border-t border-blue-500/20 flex items-center justify-between text-[10px] text-[#60A5FA] group-hover:text-white transition-colors">
                  <span className="font-regal font-semibold tracking-widest uppercase">
                    Explore Wing
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 transform transition-transform duration-300 group-hover:translate-x-1.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================== */}
      {/* ROW 2: ANIMATE-SCROLL-RIGHT (INFINITE TO RIGHT) */}
      {/* ============================================================== */}
      <div
        className="overflow-hidden relative z-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`flex gap-3 sm:gap-5 w-max ${isPaused ? 'pause-animation' : 'animate-scroll-right'}`}
          style={{ '--scroll-duration': '40s' } as React.CSSProperties}
        >
          {[...row2Categories, ...row2Categories].map((item, idx) => (
            <div
              key={`row2-${item.id}-${idx}`}
              onClick={() => onCategoryClick(item.title)}
              className="group relative w-48 sm:w-64 h-56 sm:h-72 rounded-xl sm:rounded-2xl overflow-hidden bg-[#0e121a] border border-blue-500/25 hover:border-[#3B82F6] hover:shadow-[0_12px_35px_rgba(37,99,235,0.35)] shrink-0 transition-all duration-300 hover:scale-[1.03] cursor-pointer flex flex-col justify-between p-3.5 sm:p-4 select-none"
            >
              {/* Background Image with Zoom & Dark Gradient */}
              <div className="absolute inset-0 bg-black">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-112 filter brightness-[1.04]"
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/50 to-black/20 pointer-events-none" />
              </div>

              {/* Top Badges */}
              <div className="relative z-10 flex items-center justify-between gap-1">
                <span className="text-[8px] sm:text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-sm bg-[#08080a]/85 backdrop-blur-md border border-blue-500/40 text-[#F8FAFC]">
                  {item.category}
                </span>
                <span className="text-[7.5px] sm:text-[8.5px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-sm bg-[#2563EB] text-white shadow-xs">
                  {item.tag}
                </span>
              </div>

              {/* Bottom Details */}
              <div className="relative z-10 pt-2">
                <h3 className="font-serif-luxury text-sm sm:text-base font-medium text-[#F8FAFC] group-hover:text-[#60A5FA] transition-colors line-clamp-1 mb-1">
                  {item.title}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-blue-100/70 font-light line-clamp-1 leading-snug mb-2">
                  {item.subtitle}
                </p>
                <div className="pt-2 border-t border-blue-500/20 flex items-center justify-between text-[10px] text-[#60A5FA] group-hover:text-white transition-colors">
                  <span className="font-regal font-semibold tracking-widest uppercase">
                    Explore Wing
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 transform transition-transform duration-300 group-hover:translate-x-1.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
