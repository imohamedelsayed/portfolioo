import React from 'react';

interface ProjectVisualProps {
  type: 'ecommerce' | 'photography' | 'wedding' | 'startup' | 'agency' | 'dashboard';
  title: string;
}

export const ProjectVisual: React.FC<ProjectVisualProps> = ({ type }) => {
  switch (type) {
    case 'ecommerce':
      // Pixel Store — Electronics Storefront Mockup
      return (
        <div className="project-mockup ecommerce-mockup" aria-label="Pixel Store visual mockup">
          {/* Browser header */}
          <div className="mockup-header">
            <span className="dot dot-1"></span>
            <span className="dot dot-2"></span>
            <span className="dot dot-3"></span>
            <span className="mockup-url">pixelstore.hardware/shop</span>
          </div>
          {/* Interface Canvas */}
          <div className="mockup-body ecommerce-body">
            <div className="ecom-nav">
              <span className="ecom-logo">PIXEL // HARDWARE</span>
              <div className="ecom-pills">
                <span className="pill active">Workstations</span>
                <span className="pill">Displays</span>
                <span className="pill">Audio</span>
              </div>
              <span className="ecom-cart-badge">Cart [2]</span>
            </div>

            <div className="ecom-grid">
              <div className="ecom-card featured">
                <div className="ecom-img-box">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#8FC5F0" strokeWidth="1.5">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                  <span className="spec-tag">Studio Display 32" 4K</span>
                </div>
                <div className="ecom-details">
                  <div className="ecom-name">Pro Studio Monitor</div>
                  <div className="ecom-meta">99.8% DCI-P3 · 144Hz IPS</div>
                  <div className="ecom-bottom">
                    <span className="ecom-price">$899</span>
                    <span className="ecom-btn">Added</span>
                  </div>
                </div>
              </div>

              <div className="ecom-card">
                <div className="ecom-img-box">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#263746" strokeWidth="1.5">
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <rect x="9" y="9" width="6" height="6" />
                    <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
                    <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
                  </svg>
                  <span className="spec-tag">Octa-Core Neural Rig</span>
                </div>
                <div className="ecom-details">
                  <div className="ecom-name">M3 Neural Workstation</div>
                  <div className="ecom-meta">64GB Unified · 2TB NVMe</div>
                  <div className="ecom-bottom">
                    <span className="ecom-price">$2,199</span>
                    <span className="ecom-btn outline">Inspect</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'photography':
      // Lens & Light — Editorial Photography Portfolio Mockup
      return (
        <div className="project-mockup photo-mockup" aria-label="Lens & Light visual mockup">
          <div className="mockup-header">
            <span className="dot dot-1"></span>
            <span className="dot dot-2"></span>
            <span className="dot dot-3"></span>
            <span className="mockup-url">lensandlight.editorial/archive</span>
          </div>
          <div className="mockup-body photo-body">
            <div className="photo-masthead">
              <span className="photo-title">LENS & LIGHT</span>
              <span className="photo-subtitle">Documentary & Architecture Archives</span>
            </div>
            <div className="photo-layout">
              <div className="photo-frame hero-frame">
                <div className="photo-visual-gradient architectural-gradient">
                  <div className="photo-lens-aperture">
                    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
                      <line x1="9.69" y1="8" x2="21.17" y2="8" />
                      <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
                      <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
                      <line x1="14.31" y1="16" x2="2.83" y2="16" />
                    </svg>
                  </div>
                  <span className="photo-caption">Plate 04: Nordic Geometry · Hasselblad 50mm · f/4.0</span>
                </div>
              </div>
              <div className="photo-side-column">
                <div className="photo-frame side-frame">
                  <div className="photo-visual-gradient portrait-gradient">
                    <span className="photo-caption">Plate 05: Silent Morning</span>
                  </div>
                </div>
                <div className="photo-meta-box">
                  <span className="meta-heading">Current Exhibition</span>
                  <p className="meta-text">Structures of Light & Quiet Monoliths (Copenhagen / Cairo)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'wedding':
      // Ever After — Interactive Wedding Celebration Mockup
      return (
        <div className="project-mockup wedding-mockup" aria-label="Ever After visual mockup">
          <div className="mockup-header">
            <span className="dot dot-1"></span>
            <span className="dot dot-2"></span>
            <span className="dot dot-3"></span>
            <span className="mockup-url">everafter.celebration/rsvp</span>
          </div>
          <div className="mockup-body wedding-body">
            <div className="wedding-monogram">E &amp; A</div>
            <h4 className="wedding-headline">Elena &amp; Alexander</h4>
            <p className="wedding-date">Saturday, September 19 · Villa Miramar</p>
            
            <div className="wedding-countdown-strip">
              <div className="time-block">
                <span className="time-num">124</span>
                <span className="time-lbl">Days</span>
              </div>
              <div className="time-divider">:</div>
              <div className="time-block">
                <span className="time-num">18</span>
                <span className="time-lbl">Hours</span>
              </div>
              <div className="time-divider">:</div>
              <div className="time-block">
                <span className="time-num">45</span>
                <span className="time-lbl">Mins</span>
              </div>
            </div>

            <div className="wedding-rsvp-preview">
              <span className="rsvp-badge">RSVP Reception Flow</span>
              <div className="rsvp-demo-bar">
                <span className="rsvp-opt active">Attending [2 Guests]</span>
                <span className="rsvp-opt">Dietary Notes Included</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'startup':
      // Launchpad — SaaS Startup Landing Mockup
      return (
        <div className="project-mockup startup-mockup" aria-label="Launchpad visual mockup">
          <div className="mockup-header">
            <span className="dot dot-1"></span>
            <span className="dot dot-2"></span>
            <span className="dot dot-3"></span>
            <span className="mockup-url">launchpad.app/product</span>
          </div>
          <div className="mockup-body startup-body">
            <div className="startup-badge">● Engine v2.4 Released</div>
            <h4 className="startup-title">Autonomous Infrastructure for Modern Teams</h4>
            <p className="startup-desc">Ship production microservices with declarative config and continuous observability.</p>
            
            <div className="startup-ui-card">
              <div className="startup-tabs">
                <span className="tab-pill active">Realtime Metrics</span>
                <span className="tab-pill">Cloud Pipeline</span>
                <span className="tab-pill">API Health</span>
              </div>
              <div className="startup-metrics-row">
                <div className="metric-box">
                  <span className="m-val">99.98%</span>
                  <span className="m-lbl">Uptime SLA</span>
                </div>
                <div className="metric-box">
                  <span className="m-val">12ms</span>
                  <span className="m-lbl">Edge Latency</span>
                </div>
                <div className="metric-box">
                  <span className="m-val">4.2M</span>
                  <span className="m-lbl">Events/sec</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'agency':
      // Studio North — Creative Agency Mockup
      return (
        <div className="project-mockup agency-mockup" aria-label="Studio North visual mockup">
          <div className="mockup-header">
            <span className="dot dot-1"></span>
            <span className="dot dot-2"></span>
            <span className="dot dot-3"></span>
            <span className="mockup-url">studionorth.design/work</span>
          </div>
          <div className="mockup-body agency-body">
            <div className="agency-top">
              <span className="agency-mark">STUDIO NORTH</span>
              <div className="agency-filters">
                <span className="af-pill active">All Work</span>
                <span className="af-pill">Identity</span>
                <span className="af-pill">Digital</span>
              </div>
            </div>

            <div className="agency-case-split">
              <div className="case-item primary">
                <div className="case-thumb brand-tone">
                  <span className="case-tag">Case 01</span>
                  <span className="case-hero-name">Krona FinTech</span>
                </div>
                <div className="case-info">
                  <span className="case-category">Global Brand & Design System</span>
                </div>
              </div>

              <div className="case-item secondary">
                <div className="case-thumb digital-tone">
                  <span className="case-tag">Case 02</span>
                  <span className="case-hero-name">Aether Sound</span>
                </div>
                <div className="case-info">
                  <span className="case-category">Spatial Audio Web Platform</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'dashboard':
      // Taskflow — Productivity Application Mockup
      return (
        <div className="project-mockup dashboard-mockup" aria-label="Taskflow visual mockup">
          <div className="mockup-header">
            <span className="dot dot-1"></span>
            <span className="dot dot-2"></span>
            <span className="dot dot-3"></span>
            <span className="mockup-url">taskflow.cloud/board/q4</span>
          </div>
          <div className="mockup-body dashboard-body">
            <div className="dash-toolbar">
              <div className="dash-title-group">
                <span className="dash-name">Q4 Core Milestones</span>
                <span className="dash-count">7 Tasks Active</span>
              </div>
              <div className="dash-actions">
                <span className="dash-btn active">+ New Task</span>
              </div>
            </div>

            <div className="dash-lanes">
              <div className="lane">
                <div className="lane-header">
                  <span className="lane-dot todo"></span>
                  <span className="lane-name">In Progress (2)</span>
                </div>
                <div className="dash-card">
                  <div className="dash-card-tag high">Frontend UI</div>
                  <div className="dash-card-title">Design System Tokens</div>
                  <div className="dash-card-footer">
                    <span className="due">Oct 28</span>
                    <span className="avatar">ME</span>
                  </div>
                </div>
              </div>

              <div className="lane">
                <div className="lane-header">
                  <span className="lane-dot done"></span>
                  <span className="lane-name">Completed (5)</span>
                </div>
                <div className="dash-card completed">
                  <div className="dash-card-tag normal">Architecture</div>
                  <div className="dash-card-title">Database Schema Migration</div>
                  <div className="dash-card-footer">
                    <span className="due">Verified</span>
                    <span className="check-mark">✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};
