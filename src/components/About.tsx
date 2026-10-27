import React from 'react';
import { useScrollReplay } from '../hooks/useScrollReplay';

const aboutParagraphs = [
  "I build complete websites from the ground up, handling both visual direction and frontend implementation. Rather than treating design and development as disconnected phases, I focus on how layout, typography, interaction, and code structure inform one another to create cohesive digital products.",
  "A successful website needs to look intentional, but it also has to work reliably. I pay close attention to the fundamentals: semantic HTML for accessibility and search visibility, well-structured CSS for fluid responsiveness across devices, and performant logic that keeps page loads fast on mobile networks.",
  "My work centers on individuals, founders, and startups who need a distinct online presence without the bloat of unnecessary frameworks or generic templates. Every website is built with purpose, structured for real users, and engineered to remain clean and maintainable over time."
];

export const About: React.FC = () => {
  const { ref: sectionRef, isVisible } = useScrollReplay<HTMLElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className={`section about-section ${isVisible ? 'is-visible' : ''}`} 
      aria-labelledby="about-heading"
    >
      <div className="container about-container">
        <div className="about-unified-content">
          <div className="about-heading-mask">
            <h2 id="about-heading" className="section-title about-title">
              About
            </h2>
          </div>

          <div className="about-text-body">
            {aboutParagraphs.map((text, idx) => (
              <div key={idx} className={`about-paragraph-wrapper about-p-idx-${idx}`}>
                <div className="about-accent-line" aria-hidden="true" />
                <p className="about-p-stable">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
