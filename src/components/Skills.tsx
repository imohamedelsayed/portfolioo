import React from 'react';
import { technologiesData } from '../config/site';
import { TechIcon } from './TechIcons';
import { useScrollReplay } from '../hooks/useScrollReplay';

export const Skills: React.FC = () => {
  const { ref: sectionRef, isVisible } = useScrollReplay<HTMLElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  return (
    <section 
      id="skills" 
      ref={sectionRef} 
      className={`section skills-section ${isVisible ? 'is-visible' : ''}`} 
      aria-labelledby="skills-heading"
    >
      <div className="container">
        <div className="section-header text-center skills-header">
          <h2 id="skills-heading" className="section-title">
            Skills &amp; Technology Stack
          </h2>
          <p className="section-subtitle">
            Core technologies and tools utilized to build responsive, reliable web products.
          </p>
        </div>

        {/* Unified Continuous Horizontal Technology Showcase */}
        <div 
          className="skills-showcase-wrapper"
          tabIndex={0}
          aria-label="Technologies carousel. Hover or focus to pause movement."
        >
          <div className="skills-marquee-track">
            {/* Primary Track (Announced once by Screen Readers) */}
            <div className="skills-marquee-group">
              {technologiesData.map((tech) => (
                <div 
                  key={tech.name} 
                  className="tech-showcase-item"
                  tabIndex={0}
                  role="group"
                  aria-label={tech.name}
                >
                  <div className="tech-icon-frame">
                    <TechIcon id={tech.iconId} size={42} />
                  </div>
                  <span className="tech-name-label">{tech.name}</span>
                </div>
              ))}
            </div>

            {/* Duplicate Track for Seamless Endless Loop (Hidden from Assistive Tech) */}
            <div className="skills-marquee-group" aria-hidden="true">
              {technologiesData.map((tech) => (
                <div 
                  key={`dup-${tech.name}`} 
                  className="tech-showcase-item"
                  tabIndex={-1}
                >
                  <div className="tech-icon-frame">
                    <TechIcon id={tech.iconId} size={42} />
                  </div>
                  <span className="tech-name-label">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
