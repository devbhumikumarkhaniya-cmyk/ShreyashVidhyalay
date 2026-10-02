import React, { useState, useRef, useEffect } from 'react';
import { SCHOOL_INFO } from '../data/schoolData';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Film,
  Sparkles,
  RotateCcw,
} from 'lucide-react';

export const CampusVideoSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const [showControls, setShowControls] = useState(true);

  const chapters = [
    {
      title: 'School Campus & Assemblies',
      timestamp: 0,
      duration: '0:15',
      desc: 'Morning prayers, discipline, and campus atmosphere.',
    },
    {
      title: 'Smart Classrooms & Activities',
      timestamp: 12,
      duration: '0:15',
      desc: 'Interactive visual teaching enabling curiosity and conceptual clarity.',
    },
    {
      title: 'Science Experiments & Sports',
      timestamp: 24,
      duration: '0:15',
      desc: 'Practical lab demonstrations and physical sports drills.',
    },
    {
      title: 'Cultural Events & Celebrations',
      timestamp: 36,
      duration: '0:15',
      desc: 'Student talent, annual gatherings, and joyful learning.',
    },
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start playback immediately in loop with volume at 0 (muted)
    video.volume = 0;
    video.muted = true;
    video.play().then(() => setIsPlaying(true)).catch(() => {
      // Autoplay fallback if browser blocks
      setIsPlaying(false);
    });

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      // Auto highlight chapters
      const chapIdx = chapters.findIndex((c, i) => {
        const nextTime = chapters[i + 1]?.timestamp ?? Infinity;
        return video.currentTime >= c.timestamp && video.currentTime < nextTime;
      });
      if (chapIdx !== -1) {
        setActiveChapter(chapIdx);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration || 45);
    };

    const handleEnded = () => {
      // Loop replay
      video.currentTime = 0;
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !isMuted;
    video.muted = nextMuted;
    if (!nextMuted) {
      video.volume = 0.85;
    } else {
      video.volume = 0;
    }
    setIsMuted(nextMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = parseFloat(e.target.value);
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleChapterClick = (idx: number, timestamp: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = timestamp;
    setActiveChapter(idx);
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section id="campus-video" className="py-24 bg-[#0b132b] text-[#F8FAFC] relative overflow-hidden border-b border-indigo-500/20">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6366F1_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#6366F1]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#172554]/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#818CF8] mb-3 font-regal">
            <Film className="w-4 h-4 text-[#6366F1]" />
            <span>Campus Experience Reel</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-medium tracking-tight text-[#F8FAFC]">
            See Our School in Action
          </h2>
          <p className="mt-4 text-base sm:text-lg text-indigo-200/80 font-light leading-relaxed">
            Take a glimpse into our classrooms, activities, learning environment and everyday school life at Shreyash Vidhyalay.
          </p>
        </div>

        {/* Premium 16:9 Video Player Container */}
        <div
          ref={containerRef}
          className="relative mx-auto max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-indigo-500/30 bg-black group"
          onMouseEnter={() => setShowControls(true)}
        >
          {/* Target Element: Video Display Container */}
          <div className="aspect-video relative w-full overflow-hidden flex items-center justify-center bg-black">
            {/* Real HTML5 Video element loading the Google Photos shared video */}
            <video
              ref={videoRef}
              src={SCHOOL_INFO.campusVideoUrl}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onClick={togglePlay}
              className="w-full h-full object-contain bg-black cursor-pointer"
            />

            {/* Big Play / Pause Overlay Icon when paused */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] z-20 cursor-pointer transition-opacity"
              >
                <div className="group/play flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white shadow-2xl shadow-indigo-500/30 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/30 backdrop-blur-md">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
                </div>
                <p className="mt-4 text-xs sm:text-sm font-semibold tracking-wider uppercase text-white/90 drop-shadow">
                  Click to Play School Campus Video
                </p>
              </div>
            )}

            {/* Top Bar with Live Tag and Sound Toggle */}
            <div className="absolute top-4 inset-x-4 z-30 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0b132b]/85 backdrop-blur-md rounded-lg border border-indigo-500/30 text-xs font-medium pointer-events-auto">
                <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-[#6366F1] animate-ping' : 'bg-slate-400'}`} />
                <span>Shreyash Vidhyalay · Official Campus Video</span>
              </div>

              <div className="flex items-center gap-2 pointer-events-auto">
                <button
                  onClick={toggleMute}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0b132b]/85 hover:bg-[#0f172a] backdrop-blur-md rounded-lg border border-indigo-500/30 text-white text-xs transition-colors cursor-pointer"
                  aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-4 h-4 text-rose-400" />
                      <span className="text-[11px] text-slate-300">Unmute</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-[#818CF8]" />
                      <span className="text-[11px] text-[#818CF8]">Sound On</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Bottom Floating Control Bar */}
            <div
              className={`absolute bottom-0 inset-x-0 z-30 p-4 bg-gradient-to-t from-black via-black/85 to-transparent transition-opacity duration-300 ${
                showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Progress Slider */}
              <div className="mb-3 flex items-center gap-3">
                <span className="font-mono text-xs text-[#818CF8]">
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="0.1"
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#6366F1]"
                  aria-label="Video scrubber"
                />
                <span className="font-mono text-xs text-slate-400">
                  {formatTime(duration)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-1.5 hover:text-[#818CF8] transition-colors cursor-pointer"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>

                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.currentTime = 0;
                        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
                      }
                    }}
                    className="p-1.5 hover:text-[#818CF8] transition-colors cursor-pointer"
                    title="Replay from start"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-1.5 hover:text-[#818CF8] transition-colors cursor-pointer"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-[#818CF8]" />}
                  </button>

                  <span className="text-white/20">|</span>
                  <span className="text-white text-xs truncate max-w-[200px] sm:max-w-xs">
                    {chapters[activeChapter]?.title || 'Campus Tour'}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline font-mono text-[11px] text-[#818CF8]">
                    HD 1080p
                  </span>
                  <button
                    onClick={handleFullscreen}
                    className="p-1.5 hover:text-[#818CF8] transition-colors cursor-pointer"
                    aria-label="Fullscreen"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
