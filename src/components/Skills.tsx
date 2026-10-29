import React, { useState, useEffect, useRef } from 'react';
import { technologiesData } from '../config/site';
import { TechIcon } from './TechIcons';
import { useScrollReplay } from '../hooks/useScrollReplay';

export const Skills: React.FC = () => {
  const { ref: sectionRef, isVisible, replayCount } = useScrollReplay<HTMLElement>({
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  // Track active item for hover, touch devices, and keyboard focus
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Close active tooltip when clicking outside on touch devices
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setActiveTech(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleItemClick = (techName: string) => {
    setActiveTech((prev) => (prev === techName ? null : techName));
  };

  const handleKeyDown = (e: React.KeyboardEvent, techName: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleItemClick(techName);
    } else if (e.key === 'Escape') {
      setActiveTech(null);
    }
  };

  // Duplicate 8 technologies across 2 sets per group to guarantee a seamless loop on any screen width
  const loopSequence = [...technologiesData, ...technologiesData];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`section skills-section ${isVisible ? 'is-visible' : ''}`}
      aria-labelledby="skills-heading"
    >
      <div className="container">
        {/* Section Heading & Supporting Text */}
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
          ref={wrapperRef}
          className="skills-showcase-wrapper"
          tabIndex={-1}
          aria-label="Technology stack infinite marquee. Hover, focus, or tap any logo to reveal details."
        >
          <div className={`skills-marquee-track ${activeTech ? 'is-paused' : ''}`}>
            {/* Primary Track: First 8 items accessible for keyboard & screen readers */}
            <div className="skills-marquee-group">
              {loopSequence.map((tech, index) => {
                const isPrimaryAccessible = index < technologiesData.length;
                const isActive = activeTech === tech.name;

                return (
                  <div
                    key={`group1-${tech.name}-${index}`}
                    className={`tech-showcase-item ${isActive ? 'is-active' : ''}`}
                    tabIndex={isPrimaryAccessible ? 0 : -1}
                    role={isPrimaryAccessible ? 'button' : undefined}
                    aria-label={isPrimaryAccessible ? tech.name : undefined}
                    aria-haspopup={isPrimaryAccessible ? 'true' : undefined}
                    aria-expanded={isPrimaryAccessible ? isActive : undefined}
                    aria-hidden={isPrimaryAccessible ? undefined : true}
                    onClick={isPrimaryAccessible ? () => handleItemClick(tech.name) : undefined}
                    onKeyDown={isPrimaryAccessible ? (e) => handleKeyDown(e, tech.name) : undefined}
                    onFocus={isPrimaryAccessible ? () => setActiveTech(tech.name) : undefined}
                    onBlur={isPrimaryAccessible ? () => setActiveTech(null) : undefined}
                    onMouseEnter={() => setActiveTech(tech.name)}
                    onMouseLeave={() => setActiveTech((prev) => (prev === tech.name ? null : prev))}
                  >
                    {/* Inner Reveal Container: Handles staggered entrance replay independently of marquee */}
                    <div
                      key={`reveal-${replayCount}-${index % 8}`}
                      className={`tech-reveal-container ${isVisible ? 'is-revealed' : ''}`}
                      style={
                        {
                          '--item-stagger': `${(index % 8) * 85}ms`
                        } as React.CSSProperties
                      }
                    >
                      <div className="tech-logo-wrapper">
                        <TechIcon id={tech.iconId} size={50} />
                      </div>

                      {/* Tooltip Label (revealed on hover, keyboard focus, or tap) */}
                      <div className="tech-tooltip" role="tooltip" aria-hidden="true">
                        {tech.name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Duplicate Track: Seamless Infinite Loop (Aria-hidden from assistive tech) */}
            <div className="skills-marquee-group" aria-hidden="true">
              {loopSequence.map((tech, index) => {
                const isActive = activeTech === tech.name;

                return (
                  <div
                    key={`group2-${tech.name}-${index}`}
                    className={`tech-showcase-item ${isActive ? 'is-active' : ''}`}
                    tabIndex={-1}
                    aria-hidden="true"
                    onMouseEnter={() => setActiveTech(tech.name)}
                    onMouseLeave={() => setActiveTech((prev) => (prev === tech.name ? null : prev))}
                  >
                    <div
                      key={`reveal-dup-${replayCount}-${index % 8}`}
                      className={`tech-reveal-container ${isVisible ? 'is-revealed' : ''}`}
                      style={
                        {
                          '--item-stagger': `${(index % 8) * 85}ms`
                        } as React.CSSProperties
                      }
                    >
                      <div className="tech-logo-wrapper">
                        <TechIcon id={tech.iconId} size={50} />
                      </div>

                      <div className="tech-tooltip" role="tooltip">
                        {tech.name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Skills;
