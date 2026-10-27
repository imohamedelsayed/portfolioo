import React from 'react';
import { Mail, Github, Linkedin, ArrowUp } from 'lucide-react';
import { siteConfig } from '../config/site';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const hasGithub = Boolean(siteConfig.githubUrl);
  const hasLinkedin = Boolean(siteConfig.linkedinUrl);

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-main-row">
          <div className="footer-identity-col">
            <div className="footer-logo">
              <span className="footer-name">{siteConfig.name}</span>
            </div>
            <p className="footer-role-text">
              {siteConfig.role} — Focused on clean code, responsive design, and converting digital presences for individuals and startups.
            </p>
          </div>

          <div className="footer-nav-col">
            <span className="footer-col-title">Navigation</span>
            <ul className="footer-links-list">
              <li>
                <button onClick={() => onNavigate('hero')} className="footer-nav-btn">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="footer-nav-btn">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="footer-nav-btn">
                  Selected Work
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="footer-nav-btn">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('skills')} className="footer-nav-btn">
                  Skills &amp; Tools
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="footer-nav-btn">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-connect-col">
            <span className="footer-col-title">Connect</span>
            <div className="footer-social-row">
              <a
                href={`mailto:${siteConfig.email}`}
                className="footer-social-icon"
                aria-label="Direct Email"
                title="Send Email"
              >
                <Mail size={18} />
              </a>
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

            <button onClick={scrollToTop} className="back-to-top-btn" aria-label="Back to top of page">
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p className="copyright-text">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="built-with-text">Designed with purpose. Built to work.</p>
        </div>
      </div>
    </footer>
  );
};
