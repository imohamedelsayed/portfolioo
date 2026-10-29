import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { servicesData } from '../config/site';
import { useScrollReplay } from '../hooks/useScrollReplay';
import { SectionDecor } from './SectionDecor';

interface ServicesProps {
  onNavigate: (sectionId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  const { ref: sectionRef, isVisible } = useScrollReplay<HTMLElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  return (
    <section 
      id="services" 
      ref={sectionRef} 
      className={`section services-section ${isVisible ? 'is-visible' : ''}`} 
      aria-labelledby="services-heading"
    >
      {/* Decorative boundary accents */}
      <SectionDecor variant="services" />

      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 id="services-heading" className="section-title">
            Services
          </h2>
          <p className="section-subtitle">
            Focused web development services designed to turn early ideas and business requirements into clear, high-performing websites.
          </p>
        </div>

        {/* Structured Services Grid */}
        <div className="services-list-grid">
          {servicesData.map((service) => (
            <div key={service.id} className="service-card">
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>

              <div className="service-deliverables">
                <ul className="deliverables-list">
                  {service.deliverables.map((item, idx) => (
                    <li key={idx}>
                      <Check size={14} className="service-check" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Service Bottom CTA Banner */}
        <div className="services-cta-banner">
          <div className="banner-text">
            <h4>Have a specific project in mind?</h4>
            <p>Let's discuss your scope, deliverables, and timeline with zero obligation.</p>
          </div>
          <button
            className="btn-primary"
            onClick={() => onNavigate('contact')}
          >
            <span>Start a Conversation</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};
