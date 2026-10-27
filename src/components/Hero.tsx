import React from 'react';
import { ArrowDown, Send } from 'lucide-react';
import { siteConfig } from '../config/site';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section id="hero" className="hero-section" aria-label="Introduction">
      {/* Subtle ambient backdrop shapes */}
      <div className="hero-ambient-shape shape-1" aria-hidden="true"></div>
      <div className="hero-ambient-shape shape-2" aria-hidden="true"></div>
      
      <div className="container hero-container">
        <div className="hero-grid">
          {/* Left Column: Typographic Content */}
          <div className="hero-content">
            {/* Prominent Editorial Name Display */}
            <div className="hero-name-display" aria-label="Mohamed EL-Sayed">
              Mohamed EL&#8209;Sayed
            </div>

            {/* Exact Required Headline */}
            <h1 className="hero-headline">
              Designed with purpose. <br />
              <span className="hero-headline-accent">Built to work.</span>
            </h1>

            {/* Exact Required Primary USP */}
            <p className="hero-usp">
              {siteConfig.usp}
            </p>

            {/* Primary & Secondary Call to Actions */}
            <div className="hero-cta-group">
              <a
                href="#projects"
                className="btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('projects');
                }}
              >
                <span>View My Work</span>
                <ArrowDown size={17} />
              </a>

              <a
                href="#contact"
                className="btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('contact');
                }}
              >
                <span>Get In Touch</span>
                <Send size={15} />
              </a>
            </div>
          </div>

          {/* Right Column: Natural Portrait Integration */}
          <div className="hero-portrait-column">
            <div className="portrait-wrapper">
              {/* Subtle ambient lighting behind portrait */}
              <div className="portrait-backdrop-glow" aria-hidden="true"></div>
              
              {/* Actual Portrait Cutout (preserving intentional blue circle and transparency) */}
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
