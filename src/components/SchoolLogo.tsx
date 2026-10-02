import React, { useState } from 'react';
import { SCHOOL_INFO } from '../data/schoolData';

interface SchoolLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'color';
  showText?: boolean;
  className?: string;
  circularBg?: boolean;
}

export const SchoolLogo: React.FC<SchoolLogoProps> = ({
  size = 'md',
  variant = 'dark',
  showText = true,
  className = '',
  circularBg = false,
}) => {
  const [useFallback, setUseFallback] = useState(false);

  const sizeMap = {
    sm: { imgClass: 'h-10 w-10', svgSize: 40, title: 'text-sm', guj: 'text-[11px]', sub: 'text-[9px]' },
    md: { imgClass: 'h-12 w-12', svgSize: 48, title: 'text-base', guj: 'text-xs', sub: 'text-[10px]' },
    lg: { imgClass: 'h-16 w-16', svgSize: 64, title: 'text-xl', guj: 'text-sm', sub: 'text-xs' },
    xl: { imgClass: 'h-24 w-24', svgSize: 96, title: 'text-2xl', guj: 'text-base', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Shreyash Vidhyalay Emblem */}
      <div
        className={`relative shrink-0 flex items-center justify-center transition-transform duration-300 hover:scale-105 ${
          circularBg
            ? 'rounded-full bg-white/10 p-1 shadow-md border border-white/20 backdrop-blur-sm'
            : ''
        }`}
      >
        {!useFallback ? (
          <img
            src={SCHOOL_INFO.logoUrl}
            alt="Shreyash Vidhyalay Official Logo"
            className={`${currentSize.imgClass} object-contain rounded-full shadow-sm drop-shadow-md`}
            onError={() => {
              // try CDN or SVG fallback
              if (SCHOOL_INFO.logoCdnUrl && SCHOOL_INFO.logoUrl !== SCHOOL_INFO.logoCdnUrl) {
                // fallback handled
              }
              setUseFallback(true);
            }}
          />
        ) : (
          /* SVG Crest Fallback (Matches uploaded emblem) */
          <svg
            width={currentSize.svgSize}
            height={currentSize.svgSize}
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 drop-shadow-sm"
            aria-label="Shreyash Vidhyalay Official Emblem"
          >
            <circle cx="100" cy="100" r="96" fill="#F0F8FD" opacity="0.95" />

            {/* Crown with Pearls */}
            <g fill="#182A54" stroke="#182A54" strokeWidth="1">
              <circle cx="68" cy="27" r="3.5" />
              <circle cx="84" cy="22" r="3.5" />
              <circle cx="100" cy="19" r="4" />
              <circle cx="116" cy="22" r="3.5" />
              <circle cx="132" cy="27" r="3.5" />
              <path d="M 66 38 L 68 28 L 78 34 L 84 23 L 94 33 L 100 20 L 106 33 L 116 23 L 122 34 L 132 28 L 134 38 Z" />
              <path d="M 64 38 Q 100 42 136 38 L 135 43 Q 100 47 65 43 Z" />
            </g>

            {/* Baroque Flourishes */}
            <g stroke="#182A54" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
              <path d="M 62 44 C 48 40 40 54 48 68 C 54 78 50 88 44 94 C 40 98 42 108 50 114" />
              <path d="M 46 64 C 36 68 34 82 42 88" />
              <path d="M 52 110 C 44 116 46 128 58 132" />
              <path d="M 64 132 C 54 136 50 144 60 150 C 72 156 86 150 96 154" />
              <path d="M 138 44 C 152 40 160 54 152 68 C 146 78 150 88 156 94 C 160 98 158 108 150 114" />
              <path d="M 154 64 C 164 68 166 82 158 88" />
              <path d="M 148 110 C 156 116 154 128 142 132" />
              <path d="M 136 132 C 146 136 150 144 140 150 C 128 156 114 150 104 154" />
            </g>

            {/* Shield Frame */}
            <path
              d="M 62 46 L 138 46 C 144 76 142 112 100 144 C 58 112 56 76 62 46 Z"
              fill="#FFFFFF"
              stroke="#182A54"
              strokeWidth="3.5"
            />
            <path
              d="M 67 52 L 133 52 C 138 78 136 108 100 137 C 64 108 62 78 67 52 Z"
              fill="#F7FAFC"
              stroke="#182A54"
              strokeWidth="1.6"
            />

            {/* 'SV' Monogram in Maroon */}
            <g fill="#871C2F">
              <path d="M 76 65 L 86 65 L 100 118 L 114 65 L 124 65 L 103 124 L 97 124 Z" />
              <rect x="74" y="63" width="13" height="3" rx="0.5" />
              <rect x="113" y="63" width="13" height="3" rx="0.5" />
              <path d="M 112 76 C 108 70 98 68 91 71 C 82 74 81 83 86 89 C 91 94 108 96 112 104 C 116 112 110 123 98 123 C 88 123 80 117 78 109 L 85 107 C 86 113 92 118 98 118 C 104 118 108 113 106 107 C 103 101 88 98 82 91 C 77 84 80 71 91 67 C 100 64 110 66 114 74 Z" stroke="#690F1E" strokeWidth="1" />
            </g>

            {/* Gujarati Script: શ્રેયસ વિદ્યાલય */}
            <text
              x="100"
              y="172"
              textAnchor="middle"
              fontFamily="sans-serif"
              fontWeight="900"
              fontSize="20"
              fill="#871C2F"
            >
              શ્રેયસ વિદ્યાલય
            </text>
            <path
              d="M 52 182 C 65 178 80 186 100 180 C 120 186 135 178 148 182"
              stroke="#871C2F"
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="50" cy="183" r="2" fill="#871C2F" />
            <circle cx="150" cy="183" r="2" fill="#871C2F" />
          </svg>
        )}
      </div>

      {/* Typography: Shreyash Vidhyalay & Gujarati Name */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`font-heading font-extrabold tracking-tight uppercase transition-colors ${
                variant === 'dark' ? 'text-[#F8FAFC]' : 'text-slate-900'
              } ${currentSize.title}`}
            >
              SHREYASH
            </span>
            <span
              className={`font-heading font-semibold tracking-wide uppercase ${
                variant === 'dark' ? 'text-[#818CF8]' : 'text-[#4F46E5]'
              } ${currentSize.title}`}
            >
              VIDHYALAY
            </span>
          </div>

          <div className="flex items-center gap-2 mt-0.5">
            <span className={`font-bold tracking-wide ${variant === 'dark' ? 'text-white' : 'text-slate-800'} ${currentSize.guj}`}>
              શ્રેયસ વિદ્યાલય
            </span>
            <span className="text-white/20">·</span>
            <span
              className={`font-medium tracking-wider uppercase ${
                variant === 'dark' ? 'text-indigo-200/70' : 'text-slate-500'
              } ${currentSize.sub}`}
            >
              Estd. 2004
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
