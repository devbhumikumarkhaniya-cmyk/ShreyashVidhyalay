import React, { useState, useRef, useEffect } from 'react';
import { SCHOOL_INFO } from '../data/schoolData';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

interface HeroVideoPlayerProps {
  onApplyClick?: () => void;
}

export const HeroVideoPlayer: React.FC<HeroVideoPlayerProps> = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Autoplay may require user gesture in some browsers if unmuted, but with muted=true it plays smoothly
      });
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
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen?.().catch(() => {});
      } else {
        document.exitFullscreen?.().catch(() => {});
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      className="group relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-2xl border border-white/10 transition-all duration-300 hover:border-[#26968d]/60 hover:shadow-[#26968d]/20"
    >
      {/* HTML5 Video with loop, muted volume 0, autoplay */}
      <video
        ref={videoRef}
        src={SCHOOL_INFO.heroVideoUrl}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Subtle overlay gradient on video edges to blend naturally */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      <div className="absolute inset-y-0 left-0 w-24 pointer-events-none bg-gradient-to-r from-black/60 to-transparent hidden lg:block" />

      {/* Campus live indicator badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-lg border border-white/10 text-white text-xs">
        <div className="w-2 h-2 rounded-full bg-[#26968d] animate-pulse" />
        <span className="font-semibold tracking-wide text-white">Campus Video</span>
        <span className="text-slate-400">·</span>
        <span className="text-[#38b2a6]">HD 1080p</span>
      </div>

      {/* Floating Controls Bar (Shows on Hover or Paused) */}
      <div
        className={`absolute bottom-0 inset-x-0 z-20 p-3 sm:p-4 bg-gradient-to-t from-black via-black/80 to-transparent transition-opacity duration-300 ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0 sm:opacity-0'
        }`}
      >
        <div className="flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-[#26968d] text-white transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <button
              onClick={toggleMute}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-[#26968d] text-white transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <span className="text-slate-300 text-[11px] font-medium hidden sm:inline">
              {isMuted ? 'Muted (Volume 0)' : 'Audio On'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleFullscreen}
              title="Fullscreen"
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
