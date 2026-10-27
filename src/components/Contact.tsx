import React, { useState } from 'react';
import { Mail, MessageSquare, Github, Linkedin, Copy, Check, Send, AlertCircle, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../config/site';
import { useScrollReplay } from '../hooks/useScrollReplay';

export const Contact: React.FC = () => {
  const { ref: sectionRef, isVisible } = useScrollReplay<HTMLElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Website Development',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // Handle email copy to clipboard with toast confirmation
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2800);
    } catch {
      // Fallback
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2800);
    }
  };

  // WhatsApp link generation
  const hasWhatsapp = Boolean(siteConfig.whatsappNumber && siteConfig.whatsappNumber.trim() !== '');
  const cleanWhatsappNumber = siteConfig.whatsappNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = hasWhatsapp
    ? `https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappPrefillText)}`
    : '#';

  const hasGithub = Boolean(siteConfig.githubUrl && siteConfig.githubUrl.trim() !== '');
  const hasLinkedin = Boolean(siteConfig.linkedinUrl && siteConfig.linkedinUrl.trim() !== '');

  // Handle transparent mailto form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError('Please fill in your name, email, and a brief description of your project.');
      return;
    }
    setFormError('');

    const subject = encodeURIComponent(`Project Inquiry: ${formData.projectType} — from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Mohamed,\n\nMy name is ${formData.name} (${formData.email}).\n\nProject Category: ${formData.projectType}\n\nProject Details:\n${formData.message}\n\nLooking forward to hearing from you!`
    );

    // Launch mailto
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setFormSubmitted(true);
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef} 
      className={`section contact-section ${isVisible ? 'is-visible' : ''}`} 
      aria-labelledby="contact-heading"
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 id="contact-heading" className="section-title">
            Let's Discuss Your Next Web Project
          </h2>
          <p className="section-subtitle">
            Whether you are launching a new brand, refreshing an existing website, or need a dedicated frontend developer, I'm ready to collaborate.
          </p>
        </div>

        <div className="contact-layout-grid">
          {/* Direct Channels Column */}
          <div className="contact-channels-card">
            <h3 className="card-headline">Direct Contact Channels</h3>
            <p className="card-subtext">
              Reach out via email or messaging. I respond to serious inquiries promptly.
            </p>

            {/* Email Channel */}
            <div className="channel-box email-channel">
              <div className="channel-icon-circle">
                <Mail size={20} />
              </div>
              <div className="channel-info">
                <span className="channel-label">Direct Email</span>
                <a href={`mailto:${siteConfig.email}`} className="channel-value">
                  {siteConfig.email}
                </a>
              </div>
              <button
                className="channel-action-btn"
                onClick={handleCopyEmail}
                aria-label="Copy email address to clipboard"
                title="Copy to clipboard"
              >
                {copiedEmail ? <Check size={16} color="#059669" /> : <Copy size={16} />}
              </button>
            </div>
            {copiedEmail && (
              <div className="copy-toast" role="status">
                <Check size={14} />
                <span>Email address copied to clipboard!</span>
              </div>
            )}

            {/* WhatsApp Channel */}
            <div className={`channel-box ${hasWhatsapp ? 'active-channel' : 'disabled-channel'}`}>
              <div className="channel-icon-circle whatsapp">
                <MessageSquare size={20} />
              </div>
              <div className="channel-info">
                <span className="channel-label">WhatsApp Quick Chat</span>
                {hasWhatsapp ? (
                  <span className="channel-value">Instant Messaging</span>
                ) : (
                  <span className="channel-placeholder">[WhatsApp Config Pending]</span>
                )}
              </div>
              {hasWhatsapp ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-action-btn link"
                  aria-label="Start WhatsApp conversation"
                >
                  <ArrowUpRight size={16} />
                </a>
              ) : (
                <span className="config-pending-pill">Unconfigured</span>
              )}
            </div>

            {/* Professional Profiles */}
            <div className="social-profiles-section">
              <span className="profiles-label">Professional Profiles</span>
              <div className="profiles-list">
                {/* GitHub */}
                {hasGithub ? (
                  <a
                    href={siteConfig.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="profile-link-btn"
                  >
                    <Github size={16} />
                    <span>GitHub Profile</span>
                    <ArrowUpRight size={14} />
                  </a>
                ) : (
                  <div className="profile-link-btn disabled">
                    <Github size={16} />
                    <span>GitHub (Add in site.ts)</span>
                  </div>
                )}

                {/* LinkedIn */}
                {hasLinkedin ? (
                  <a
                    href={siteConfig.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="profile-link-btn"
                  >
                    <Linkedin size={16} />
                    <span>LinkedIn Profile</span>
                    <ArrowUpRight size={14} />
                  </a>
                ) : (
                  <div className="profile-link-btn disabled">
                    <Linkedin size={16} />
                    <span>LinkedIn (Add in site.ts)</span>
                  </div>
                )}
              </div>
            </div>

            <div className="availability-callout">
              <div>
                <strong>Current Status: {siteConfig.availability}</strong>
                <p>Accepting new project commissions for Q4 &amp; beyond.</p>
              </div>
            </div>
          </div>

          {/* Project Inquiry Email Form */}
          <div className="contact-form-card">
            <h3 className="card-headline">Send a Project Brief</h3>
            <p className="card-subtext">
              Fill in your project details. Submitting opens your email client with this structured brief ready to send.
            </p>

            <form onSubmit={handleFormSubmit} className="inquiry-form" noValidate>
              {formError && (
                <div className="form-alert error" role="alert">
                  <AlertCircle size={16} />
                  <span>{formError}</span>
                </div>
              )}

              {formSubmitted && (
                <div className="form-alert success" role="status">
                  <Check size={16} />
                  <span>Your email client was opened with the pre-formatted brief. Send it directly to Mohamed!</span>
                </div>
              )}

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="contact-name">Your Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="contact-email">Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="contact-project-type">Project Type</label>
                <select
                  id="contact-project-type"
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                >
                  <option value="Website Development">Full Website Development</option>
                  <option value="Responsive Website Implementation">Responsive Frontend Implementation</option>
                  <option value="Landing Page">Landing Page for Startup / Product</option>
                  <option value="Portfolio / Personal Brand">Portfolio / Personal Brand Website</option>
                  <option value="E-commerce Storefront">E-commerce Storefront</option>
                  <option value="Other Project">Other Web Engineering Inquiry</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="contact-message">Project Overview &amp; Goals</label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Tell me about your timeline, key pages, or specific design/tech requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-primary form-submit-btn">
                <span>Prepare &amp; Send Message</span>
                <Send size={16} />
              </button>

              <small className="form-clarity-note">
                Transparent delivery: Uses your device's native mail application with pre-filled content. Zero hidden third-party tracking.
              </small>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
