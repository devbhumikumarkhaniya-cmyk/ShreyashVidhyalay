import React, { useState, useRef, useEffect } from 'react';
import { SCHOOL_INFO } from '../data/schoolData';
import {
  ArrowRight,
  Users,
  MonitorPlay,
  ShieldCheck,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Maximize,
  Sparkles,
} from 'lucide-react';

interface HeroSectionProps {
  onApplyClick: () => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onApplyClick, onExploreClick }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      if (!nextMuted) {
        videoRef.current.volume = 0.8;
      } else {
        videoRef.current.volume = 0;
      }
      setIsMuted(nextMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoContainerRef.current) {
      if (!document.fullscreenElement) {
        videoContainerRef.current.requestFullscreen?.().catch(() => {});
      } else {
        document.exitFullscreen?.().catch(() => {});
      }
    }
  };

  return (
    <section className="relative w-full bg-[#08080a] text-[#F8FAFC] overflow-hidden border-b border-blue-500/20">
      {/* Main Full-Bleed Content Container */}
      <div className="relative min-h-[660px] lg:min-h-[720px] flex items-center">
        {/* Full Hero Background Video */}
        <div
          ref={videoContainerRef}
          className="absolute inset-0 w-full h-full z-0 overflow-hidden"
        >
          {/* Video spanning full background with vibrant, clear brightness */}
          <video
            ref={videoRef}
            src={SCHOOL_INFO.heroVideoUrl}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center scale-105 brightness-[0.96] contrast-[1.03]"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onLoadedData={(e) => {
              const v = e.currentTarget;
              v.muted = true;
              v.play().catch(() => {});
            }}
            onCanPlay={(e) => {
              const v = e.currentTarget;
              v.muted = true;
              v.play().catch(() => {});
            }}
          />

          {/* Minimal ambient scrim so video is crystal clear */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />

          {/* Narrow Left-Side Patti Gradient (Subtle strip behind text only) */}
          <div className="absolute inset-y-0 left-0 w-[240px] sm:w-[320px] lg:w-[380px] bg-gradient-to-r from-black/85 via-black/40 to-transparent pointer-events-none" />

          {/* Electric Blue ambient glow within the left strip */}
          <div className="absolute inset-y-0 left-0 w-[260px] bg-[radial-gradient(ellipse_at_left,_rgba(37,99,235,0.25),_transparent_75%)] pointer-events-none" />

          {/* Light top & bottom vignetting for framing */}
          <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#08080a] to-transparent pointer-events-none" />

          {/* Video Control Floating Badge */}
          <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2 bg-[#08080a]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-blue-500/30 text-xs text-blue-100 shadow-xl">
            <button
              onClick={togglePlay}
              className="p-1 hover:text-[#60A5FA] transition-colors cursor-pointer"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>
            <span className="text-blue-500/40">|</span>
            <button
              onClick={toggleMute}
              className="p-1 hover:text-[#60A5FA] transition-colors cursor-pointer"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#60A5FA]" />}
            </button>
            <span className="text-blue-500/40">|</span>
            <button
              onClick={handleFullscreen}
              className="p-1 hover:text-[#60A5FA] transition-colors cursor-pointer"
              aria-label="Fullscreen"
            >
              <Maximize className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono text-[#60A5FA] ml-1">
              {isMuted ? 'Muted' : 'Sound On'}
            </span>
          </div>
        </div>

        {/* Left-Side Content Container in Black Theme */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-20">
          <div className="max-w-2xl lg:max-w-xl text-left">
            {/* Kicker / Eyebrow in Regal Font with Blue Accent */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] text-[#60A5FA] uppercase mb-4 border-l-2 border-[#2563EB] pl-3 py-0.5 backdrop-blur-[4px] bg-black/25 rounded-r-md">
              <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span className="font-regal">Admissions Open {SCHOOL_INFO.session} · {SCHOOL_INFO.affiliation}</span>
            </div>

            {/* Giant Editorial Serif Headline */}
            <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-[68px] font-medium tracking-tight text-white leading-[1.08] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              Learn. Grow.{' '}
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#93C5FD] via-[#60A5FA] to-[#2563EB] block sm:inline drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                Achieve.
              </span>
            </h1>

            {/* Subheading text */}
            <p className="mt-5 text-sm sm:text-base lg:text-lg text-slate-100 font-light leading-relaxed max-w-lg drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              A caring environment where every student is supported, encouraged and inspired to reach their highest potential.
            </p>

            {/* Action Button - ELECTRIC BLUE CTA */}
            <div className="mt-7 sm:mt-8 flex items-center">
              <button
                onClick={onApplyClick}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-lg bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#3B82F6] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white font-regal font-bold text-xs tracking-wider uppercase shadow-lg shadow-blue-500/30 transition-all active:scale-95 cursor-pointer"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* 3 Value Badges */}
            <div className="mt-10 sm:mt-12 pt-7 border-t border-blue-500/20 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-3 text-left">
              {/* Feature 1 */}
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-500/15 border border-blue-500/30 text-[#60A5FA] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-[11px] font-regal font-bold text-[#F8FAFC] uppercase tracking-wider">
                    Supportive Mentors
                  </h4>
                  <p className="text-[10px] text-blue-200/80 mt-0.5 leading-snug">
                    Personal mentorship
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-500/15 border border-blue-500/30 text-[#60A5FA] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <MonitorPlay className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-[11px] font-regal font-bold text-[#F8FAFC] uppercase tracking-wider">
                    Smart Classrooms
                  </h4>
                  <p className="text-[10px] text-blue-200/80 mt-0.5 leading-snug">
                    AC & interactive digital
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-500/15 border border-blue-500/30 text-[#60A5FA] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-[11px] font-regal font-bold text-[#F8FAFC] uppercase tracking-wider">
                    Holistic Growth
                  </h4>
                  <p className="text-[10px] text-blue-200/80 mt-0.5 leading-snug">
                    Mind & moral character
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats Strip */}
      <div className="border-t border-blue-500/20 bg-[#040608]/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-blue-500/20 py-4">
            {/* Stat 1 */}
            <div className="py-2 px-4 text-center">
              <div className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#60A5FA] tracking-wide">
                1:20
              </div>
              <div className="text-[10px] sm:text-[11px] text-blue-200/80 uppercase tracking-widest font-regal font-semibold mt-0.5">
                Teacher-Student Ratio
              </div>
            </div>

            {/* Stat 2 */}
            <div className="py-2 px-4 text-center">
              <div className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#F8FAFC] tracking-wide">
                NUR–XII
              </div>
              <div className="text-[10px] sm:text-[11px] text-blue-200/80 uppercase tracking-widest font-regal font-semibold mt-0.5">
                Comprehensive Curriculum
              </div>
            </div>

            {/* Stat 3 */}
            <div className="py-2 px-4 text-center">
              <div className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#60A5FA] tracking-wide">
                20+ Years
              </div>
              <div className="text-[10px] sm:text-[11px] text-blue-200/80 uppercase tracking-widest font-regal font-semibold mt-0.5">
                Educational Excellence
              </div>
            </div>

            {/* Stat 4 */}
            <div className="py-2 px-4 text-center">
              <div className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#F8FAFC] tracking-wide">
                100%
              </div>
              <div className="text-[10px] sm:text-[11px] text-blue-200/80 uppercase tracking-widest font-regal font-semibold mt-0.5">
                Holistic Child Development
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
