import React, { useEffect, useRef, useState } from 'react';
import { Mail, Github, Linkedin, ArrowRight } from 'lucide-react';
import { siteConfig } from '../config/site';
import { useScrollReplay } from '../hooks/useScrollReplay';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();
  const pathRef = useRef<SVGPathElement | null>(null);
  const [pathLength, setPathLength] = useState(650);

  const { ref: footerRef, isVisible } = useScrollReplay<HTMLElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -10px 0px'
  });

  useEffect(() => {
    // Measure actual SVG path length accurately
    if (pathRef.current) {
      try {
        const measured = pathRef.current.getTotalLength();
        if (measured > 0) {
          setPathLength(Math.ceil(measured));
        }
      } catch {
        // keep default 650
      }
    }
  }, []);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate('contact');
  };

  const isEmailConfigured = Boolean(
    siteConfig.email &&
    siteConfig.email.trim() !== '' &&
    !siteConfig.email.includes('example.com')
  );
  const hasGithub = Boolean(siteConfig.githubUrl && siteConfig.githubUrl.trim() !== '');
  const hasLinkedin = Boolean(siteConfig.linkedinUrl && siteConfig.linkedinUrl.trim() !== '');

  return (
    <footer
      ref={footerRef}
      className={`site-footer ${isVisible ? 'is-animated is-visible' : ''}`}
      role="contentinfo"
    >
      {/* Restrained Atmospheric Background Glow */}
      <div className="footer-atmosphere" aria-hidden="true" />

      <div className="container footer-container">
        {/* Main Signature Section */}
        <div className="footer-signature-row">
          {/* Left Column: Heading and Supporting Statement */}
          <div className="footer-identity-col">
            <span className="footer-eyebrow">{siteConfig.name}</span>
            <h2 className="footer-headline">
              <span className="headline-line headline-line-1">Let's create</span>
              <span className="headline-line headline-line-2">what's next.</span>
            </h2>
            <p className="footer-supporting-text">
              I build complete websites for individuals and startups, turning ideas into a professional online presence.
            </p>
          </div>

          {/* Right Column: Signature Curve, Handwritten Label, Circular CTA */}
          <div className="footer-signature-canvas">
            <div className="footer-curve-area">
              <svg
                className="footer-signature-svg"
                viewBox="0 0 600 170"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="signatureCurveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8FC5F0" stopOpacity="0.85" />
                    <stop offset="55%" stopColor="#AEE0FC" stopOpacity="1" />
                    <stop offset="100%" stopColor="#8FC5F0" stopOpacity="0.9" />
                  </linearGradient>
                  <filter id="dotGlow" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="5" result="glow" />
                    <feMerge>
                      <feMergeNode in="glow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Starting Dot with Subtle Glow Halo */}
                <g className="footer-start-dot">
                  <circle
                    cx="20"
                    cy="85"
                    r="11"
                    fill="#8FC5F0"
                    fillOpacity="0.25"
                    filter="url(#dotGlow)"
                  />
                  <circle
                    cx="20"
                    cy="85"
                    r="5.5"
                    fill="#8FC5F0"
                  />
                </g>

                {/* Real SVG Curve Path */}
                <path
                  ref={pathRef}
                  className="footer-curve-path"
                  d="M 20 85 C 100 20, 180 20, 250 48 C 315 74, 365 146, 435 146 C 495 146, 550 118, 600 85"
                  stroke="url(#signatureCurveGrad)"
                  strokeWidth="2.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  style={{
                    strokeDasharray: pathLength,
                    strokeDashoffset: isVisible ? 0 : pathLength,
                    ['--path-len' as any]: `${pathLength}px`
                  }}
                />
              </svg>

              {/* Handwritten "Get In Touch" Label */}
              <div className="footer-script-wrapper" aria-hidden="true">
                <span className="footer-script-label">Get In Touch</span>
              </div>
            </div>

            {/* Prominent Circular Blue Arrow Button */}
            <a
              href="#contact"
              onClick={handleCtaClick}
              className="footer-cta-btn"
              aria-label="Get in touch — navigate to contact section"
              title="Get in touch"
            >
              <ArrowRight size={26} className="footer-cta-arrow" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Thin Divider Line */}
        <div className="footer-divider" aria-hidden="true" />

        {/* Bottom Row */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>

          <div className="footer-social-wrapper">
            {isEmailConfigured && (
              <a
                href={`mailto:${siteConfig.email}`}
                className="footer-social-icon"
                aria-label="Direct Email"
                title="Send Email"
              >
                <Mail size={18} />
              </a>
            )}

            {isEmailConfigured && (hasGithub || hasLinkedin) && (
              <span className="footer-social-divider" aria-hidden="true" />
            )}

            {hasGithub && (
              <a
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="GitHub Profile"
                title="GitHub"
              >
                <Github size={18} />
              </a>
            )}

            {hasGithub && hasLinkedin && (
              <span className="footer-social-divider" aria-hidden="true" />
            )}

            {hasLinkedin && (
              <a
                href={siteConfig.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="LinkedIn Profile"
                title="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
