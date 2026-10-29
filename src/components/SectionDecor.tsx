import React from 'react';

interface SectionDecorProps {
  variant: 'about' | 'projects' | 'services';
}

export const SectionDecor: React.FC<SectionDecorProps> = ({ variant }) => {
  if (variant === 'about') {
    return (
      <div className="section-boundary-decor boundary-about" aria-hidden="true">
        {/* Boundary Grid Texture Accent */}
        <div className="section-grid-accent grid-about" />

        {/* Left Side Floating Geometric Shape */}
        <div className="boundary-shape shape-diamond-left" />

        {/* Right Side Floating Constellation & Soft Orb */}
        <div className="boundary-shape shape-orb-right" />
        <div className="boundary-shape shape-constellation-right">
          <svg width="110" height="80" viewBox="0 0 110 80" fill="none">
            <line x1="15" y1="20" x2="60" y2="35" stroke="#8FC5F0" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <line x1="60" y1="35" x2="95" y2="15" stroke="#8FC5F0" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
            <circle cx="15" cy="20" r="3" fill="#8FC5F0" opacity="0.75" />
            <circle cx="60" cy="35" r="3.5" fill="#2878CC" opacity="0.7" />
            <circle cx="95" cy="15" r="2.5" fill="#8FC5F0" opacity="0.6" />
          </svg>
        </div>
      </div>
    );
  }

  if (variant === 'projects') {
    return (
      <div className="section-boundary-decor boundary-projects" aria-hidden="true">
        {/* Boundary Grid Texture Accent */}
        <div className="section-grid-accent grid-projects" />

        {/* Right Margin Floating Dashed Geometric Ring */}
        <div className="boundary-shape shape-ring-right" />

        {/* Left Margin Floating Translucent Sphere */}
        <div className="boundary-shape shape-sphere-left" />

        {/* Subtle decorative boundary line */}
        <div className="boundary-line-wave">
          <svg width="100%" height="32" viewBox="0 0 1200 32" fill="none" preserveAspectRatio="none">
            <path
              d="M 0 16 Q 300 0 600 16 T 1200 16"
              stroke="rgba(143, 197, 240, 0.35)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
            />
          </svg>
        </div>
      </div>
    );
  }

  if (variant === 'services') {
    return (
      <div className="section-boundary-decor boundary-services" aria-hidden="true">
        {/* Boundary Grid Texture Accent */}
        <div className="section-grid-accent grid-services" />

        {/* Left Margin Floating Ring */}
        <div className="boundary-shape shape-ring-left" />

        {/* Right Margin Floating Diamond */}
        <div className="boundary-shape shape-diamond-right" />
      </div>
    );
  }

  return null;
};
