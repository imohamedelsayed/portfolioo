import React, { useState, useEffect, useRef } from 'react';
import { technologiesData } from '../config/site';
import { TechIcon } from './TechIcons';

export const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="skills" 
      ref={sectionRef} 
      className={`section skills-section ${isVisible ? 'is-revealed' : ''}`} 
      aria-labelledby="skills-heading"
    >
      <div className="container">
        <div className="section-header text-center">
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
