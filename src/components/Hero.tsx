import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Send } from 'lucide-react';
import { siteConfig } from '../config/site';
import { useScrollReplay } from '../hooks/useScrollReplay';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { ref: sectionRef, isVisible } = useScrollReplay<HTMLElement>({
    threshold: 0.05,
    rootMargin: '0px 0px -20px 0px'
  });

  const arcPathRef = useRef<SVGPathElement | null>(null);
  const [arcLength, setArcLength] = useState(640);

  useEffect(() => {
    if (arcPathRef.current) {
      try {
        const len = arcPathRef.current.getTotalLength();
        if (len > 0) {
          setArcLength(Math.ceil(len));
        }
      } catch {
        // Fallback default
      }
    }
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className={`hero-section ${isVisible ? 'is-visible' : ''}`}
      aria-label="Introduction"
    >
      {/* Subtle technical grid texture */}
      <div className="hero-grid-pattern" aria-hidden="true" />

      {/* Subtle ambient backdrop shapes */}
      <div className="hero-ambient-shape shape-1" aria-hidden="true" />
      <div className="hero-ambient-shape shape-2" aria-hidden="true" />

      {/* Subtle animated flowing background lines */}
      <div className="hero-flowing-lines" aria-hidden="true">
        <svg className="flowing-line-svg" viewBox="0 0 1440 600" fill="none" preserveAspectRatio="none">
          <path
            className="flowing-line-path path-1"
            d="M -100 280 C 300 120, 600 420, 1050 220 C 1250 140, 1400 290, 1600 240"
            stroke="rgba(74, 147, 216, 0.2)"
            strokeWidth="1.5"
            strokeDasharray="6 8"
          />
          <path
            className="flowing-line-path path-2"
            d="M -50 420 C 350 260, 750 520, 1150 340 C 1350 260, 1480 380, 1600 350"
            stroke="rgba(143, 197, 240, 0.25)"
            strokeWidth="1.2"
          />
        </svg>
      </div>

      {/* Hero edge floating geometric accents */}
      <div className="hero-edge-decorations" aria-hidden="true">
        <div className="hero-edge-diamond" />
        <div className="hero-edge-dot dot-1" />
        <div className="hero-edge-dot dot-2" />
      </div>

      <div className="container hero-container">
        <div className="hero-grid">
          {/* Left Column: Typographic Content with Precision Mask Reveal */}
          <div className="hero-content">
            {/* Prominent Editorial Name Display with Masking Container */}
            <div className="hero-name-mask">
              <div className="hero-name-display" aria-label="Mohamed EL-Sayed">
                Mohamed EL&#8209;Sayed
              </div>
            </div>

            {/* Exact Required Headline with Line Masks */}
            <h1 className="hero-headline">
              <span className="hero-headline-line-mask">
                <span className="hero-headline-line">Designed with purpose.</span>
              </span>
              <br />
              <span className="hero-headline-line-mask">
                <span className="hero-headline-line hero-headline-accent">Built to work.</span>
              </span>
            </h1>

            {/* Exact Required Primary USP */}
            <p className="hero-usp">
              {siteConfig.usp}
            </p>

            {/* Primary & Secondary Call to Actions with Micro-motion */}
            <div className="hero-cta-group">
              <a
                href="#projects"
                className="btn-primary hero-btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('projects');
                }}
              >
                <span>View My Work</span>
                <ArrowDown size={17} className="btn-icon-move" />
              </a>

              <a
                href="#contact"
                className="btn-secondary hero-btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('contact');
                }}
              >
                <span>Get In Touch</span>
                <Send size={15} className="btn-icon-move" />
              </a>
            </div>
          </div>

          {/* Right Column: Natural Portrait Integration & Living Geometry */}
          <div className="hero-portrait-column">
            <div className="portrait-wrapper">
              {/* Subtle ambient lighting behind portrait */}
              <div className="portrait-backdrop-glow" aria-hidden="true" />

              {/* Floating Geometric Decorations (Coordinated, non-intrusive) */}
              <div className="hero-floating-decorations" aria-hidden="true">
                <div className="hero-decor-orb" />
                <div className="hero-decor-diamond" />
                <div className="hero-decor-ring" />
                <div className="hero-decor-constellation">
                  <svg width="120" height="90" viewBox="0 0 120 90" fill="none">
                    <line x1="20" y1="20" x2="65" y2="45" stroke="#8FC5F0" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                    <line x1="65" y1="45" x2="105" y2="25" stroke="#8FC5F0" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                    <line x1="65" y1="45" x2="75" y2="80" stroke="#8FC5F0" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                    <circle cx="20" cy="20" r="3" fill="#8FC5F0" opacity="0.8" />
                    <circle cx="65" cy="45" r="3.5" fill="#2878CC" opacity="0.75" />
                    <circle cx="105" cy="25" r="2.5" fill="#8FC5F0" opacity="0.65" />
                    <circle cx="75" cy="80" r="2" fill="#D8EAF9" opacity="0.9" />
                  </svg>
                </div>
              </div>

              {/* Living Geometry: Architectural SVG Accents drawing dynamically */}
              <div className="hero-living-geometry" aria-hidden="true">
                <svg
                  viewBox="0 0 600 600"
                  className="hero-geometry-svg"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="heroArcGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8FC5F0" stopOpacity="0.9" />
                      <stop offset="60%" stopColor="#8FC5F0" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#D8EAF9" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>

                  {/* Primary Architectural Arc: Traces the contour around the portrait's blue circle */}
                  <path
                    ref={arcPathRef}
                    className="hero-geom-arc"
                    d="M 120 180 A 240 240 0 0 1 480 300 A 240 240 0 0 1 420 480"
                    stroke="url(#heroArcGrad1)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: arcLength,
                      strokeDashoffset: isVisible ? 0 : arcLength,
                      ['--hero-arc-len' as any]: `${arcLength}px`
                    }}
                  />

                  {/* Secondary Dashed Accent Contour */}
                  <path
                    className="hero-geom-arc-accent"
                    d="M 170 140 A 260 260 0 0 1 460 180"
                    stroke="#8FC5F0"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="5 7"
                  />

                  {/* Precision Crosshair Accent Mark */}
                  <g className="hero-geom-mark" transform="translate(480, 300)">
                    <circle cx="0" cy="0" r="3.5" fill="#8FC5F0" />
                    <line x1="-8" y1="0" x2="8" y2="0" stroke="#8FC5F0" strokeWidth="1" strokeOpacity="0.65" />
                    <line x1="0" y1="-8" x2="0" y2="8" stroke="#8FC5F0" strokeWidth="1" strokeOpacity="0.65" />
                  </g>
                </svg>
              </div>

              {/* Actual Portrait Cutout (preserving intentional blue circle and natural proportions) */}
              <img
                src="/images/mohamed-portrait.png"
                alt="Portrait of Mohamed EL-Sayed, Web Developer"
                className="hero-portrait-img"
                width="720"
                height="760"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
