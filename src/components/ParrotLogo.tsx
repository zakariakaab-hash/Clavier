import React from 'react';

interface ParrotLogoProps {
  size?: number | string;
  className?: string;
  withBackground?: boolean;
}

export const ParrotLogo: React.FC<ParrotLogoProps> = ({
  size = 34,
  className = '',
}) => {
  return (
    <div className={`inline-flex items-center justify-center shrink-0 bg-transparent ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform group-hover:scale-105"
        aria-label="KeypadKing Logo"
      >
        <defs>
          <linearGradient id="kpEmeraldGrad" x1="16" y1="8" x2="44" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* Minimal Crest */}
        <path
          d="M27 13C25 8 29 4 33 4C35 7 34 11 31 14Z"
          fill="#10B981"
        />
        <path
          d="M32 14C33 8 38 6 41 8C41 12 37 14 34 15Z"
          fill="#059669"
        />

        {/* Body Silhouette */}
        <path
          d="M22 20C22 13.37 27.37 8 34 8C40.63 8 46 13.37 46 20V34C46 43 38 52 27 55C26 55.5 25 54.8 25.5 53.8C27 50.5 28 46 28 41L22 35V20Z"
          fill="url(#kpEmeraldGrad)"
        />

        {/* Minimal Tail Streamer */}
        <path
          d="M25 53C24 57 21 60 19 61"
          stroke="#059669"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Wing Line Contour */}
        <path
          d="M24 28C26 27 35 27 37 33C39 39 33 45 24 47"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.85"
        />
        <path
          d="M25 36C28 36 32 38 32 42"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.6"
        />

        {/* Minimal Beak */}
        <path
          d="M44 19C45 19 54 21 56 26C56.6 28 54.5 30 52 29.5C48 29 44 28 44 28V19Z"
          fill="#F59E0B"
        />

        {/* Clean Eye */}
        <ellipse cx="37" cy="18" rx="5" ry="5" fill="#FFFFFF" />
        <circle cx="37.5" cy="18" r="2.5" fill="#0F172A" />
        <circle cx="36.5" cy="17" r="0.9" fill="#FFFFFF" />
      </svg>
    </div>
  );
};

