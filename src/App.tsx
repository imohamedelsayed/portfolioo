import React, { useState, useEffect } from 'react';
import './styles/variables.css';
import './styles/base.css';
import './styles/main.css';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CursorTrail } from './components/CursorTrail';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Track active section using IntersectionObserver
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'projects', 'services', 'skills', 'contact'];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -40% 0px',
        threshold: 0
      }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => {
      sections.forEach((sec) => observer.unobserve(sec));
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      const navOffset = 90;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="site-wrapper">
      {/* Desktop pointer custom signature trail */}
      <CursorTrail />

      {/* Accessible skip link for keyboard & screen reader users */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Floating Navigation Bar */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Regions */}
      <main id="main-content">
        <Hero onNavigate={handleNavigate} />
        <About />
        <Projects />
        <Services onNavigate={handleNavigate} />
        <Skills />
        <Contact />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
