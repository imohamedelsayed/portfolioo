import React, { useState, useEffect } from 'react';
import { X, Check, ShoppingCart, Calendar, Layers, CheckCircle2 } from 'lucide-react';
import { ProjectConcept } from '../config/site';

interface ProjectModalProps {
  project: ProjectConcept | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // ESC key listener & body scroll lock
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  // Demo Interactive States
  // 1. E-commerce Cart Demo
  const [cartItems, setCartItems] = useState<{ id: string; name: string; price: number }[]>([
    { id: 'p1', name: 'Pro Studio Display 32"', price: 899 }
  ]);
  const [checkoutSimulated, setCheckoutSimulated] = useState(false);

  // 2. Photography Gallery Demo
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const photos = [
    { title: 'Plate 01: Nordic Monolith', meta: 'Hasselblad 50mm · f/4.0 · ISO 100', tone: 'linear-gradient(135deg, #263746, #40576e)' },
    { title: 'Plate 02: Coastal Horizon', meta: 'Leica M11 · 35mm Summicron · f/2.8', tone: 'linear-gradient(135deg, #8FC5F0, #263746)' },
    { title: 'Plate 03: Architectural Rhythm', meta: 'Sony A7R V · 24-70mm GM · f/5.6', tone: 'linear-gradient(135deg, #D8EAF9, #40576e)' },
    { title: 'Plate 04: Minimalist Atrium', meta: 'Fujifilm GFX 100S · 45mm · f/4.0', tone: 'linear-gradient(135deg, #1c2834, #8FC5F0)' }
  ];

  // 3. Wedding RSVP Demo
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [guestCount, setGuestCount] = useState('2');
  const [dietary, setDietary] = useState('Vegetarian');

  // 4. Startup Feature Tabs
  const [activeTab, setActiveTab] = useState<'observability' | 'edge' | 'security'>('observability');

  // 5. Agency Discipline Filter
  const [agencyFilter, setAgencyFilter] = useState<'all' | 'identity' | 'digital'>('all');
  const agencyCases = [
    { id: 1, name: 'Krona Financial', category: 'identity', type: 'Brand & Visual Identity' },
    { id: 2, name: 'Aether Audio', category: 'digital', type: 'Spatial Audio Web Application' },
    { id: 3, name: 'Forma Architects', category: 'identity', type: 'Monograph & Print Editorial' },
    { id: 4, name: 'Veloce Mobility', category: 'digital', type: 'Fleet Tracking Interface' }
  ];

  // 6. Taskflow Dashboard Tasks
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Tokens & Color Variables', status: 'In Progress', priority: 'High' },
    { id: 2, title: 'Responsive Hero Grid', status: 'Completed', priority: 'Medium' },
    { id: 3, title: 'Contact Mailto Routing', status: 'To Do', priority: 'Normal' },
    { id: 4, title: 'WCAG AAA Contrast Audit', status: 'In Progress', priority: 'High' }
  ]);

  const advanceTaskStatus = (id: number) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== id) return t;
      const nextStatus = t.status === 'To Do' ? 'In Progress' : t.status === 'In Progress' ? 'Completed' : 'To Do';
      return { ...t, status: nextStatus };
    }));
  };

  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        {/* Modal Top Bar */}
        <div className="modal-header">
          <div className="modal-badge-group">
            <span className="concept-badge">{project.conceptType}</span>
            <span className="category-tag">{project.category}</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close project modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="modal-content">
          <div className="modal-intro">
            <h2 id="modal-title" className="modal-title">{project.title}</h2>
            <p className="modal-tagline">{project.tagline}</p>
          </div>

          {/* Interactive Live Demonstration Frame */}
          <div className="interactive-demo-wrapper">
            <div className="demo-header-strip">
              <span className="live-indicator">● Interactive Demonstration</span>
              <span className="demo-notice">Local frontend prototype — No external backend</span>
            </div>

            <div className="demo-canvas">
              {/* 1. E-COMMERCE DEMO */}
              {project.demoInteractiveType === 'cart' && (
                <div className="cart-demo-interface">
                  <div className="cart-demo-nav">
                    <strong>Pixel Store // Hardware Catalog</strong>
                    <div className="cart-status">
                      <ShoppingCart size={16} />
                      <span>{cartItems.length} items (${cartItems.reduce((acc, i) => acc + i.price, 0)})</span>
                    </div>
                  </div>

                  <div className="demo-product-list">
                    {[
                      { id: 'p1', name: 'Pro Studio Display 32" 4K', price: 899, specs: '144Hz IPS · 99% DCI-P3' },
                      { id: 'p2', name: 'M3 Neural Workstation Rig', price: 2199, specs: '64GB RAM · 2TB NVMe' },
                      { id: 'p3', name: 'Tactile Mechanical Board', price: 189, specs: 'Gateron Oil King · Hot-swap' }
                    ].map(prod => {
                      const isAdded = cartItems.some(i => i.id === prod.id);
                      return (
                        <div key={prod.id} className="demo-prod-row">
                          <div>
                            <div className="prod-name">{prod.name}</div>
                            <div className="prod-spec">{prod.specs}</div>
                          </div>
                          <div className="prod-action">
                            <span className="prod-price">${prod.price}</span>
                            <button
                              className={`demo-btn ${isAdded ? 'added' : 'primary'}`}
                              onClick={() => {
                                if (isAdded) {
                                  setCartItems(prev => prev.filter(i => i.id !== prod.id));
                                } else {
                                  setCartItems(prev => [...prev, { id: prod.id, name: prod.name, price: prod.price }]);
                                }
                                setCheckoutSimulated(false);
                              }}
                            >
                              {isAdded ? 'Remove' : '+ Add to Cart'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="demo-cart-footer">
                    <div>
                      <span>Total: <strong>${cartItems.reduce((acc, i) => acc + i.price, 0)}</strong></span>
                      <small style={{ display: 'block', color: 'var(--text-muted)' }}>Free insured shipping included</small>
                    </div>
                    <button 
                      className="demo-btn primary"
                      disabled={cartItems.length === 0}
                      onClick={() => setCheckoutSimulated(true)}
                    >
                      {checkoutSimulated ? '✓ Checkout Simulated' : 'Test Checkout'}
                    </button>
                  </div>
                  {checkoutSimulated && (
                    <div className="simulated-alert">
                      <CheckCircle2 size={16} />
                      <span>Order simulation successful. Instant cart state validated without database calls.</span>
                    </div>
                  )}
                </div>
              )}

              {/* 2. PHOTOGRAPHY GALLERY DEMO */}
              {project.demoInteractiveType === 'gallery' && (
                <div className="gallery-demo-interface">
                  <div className="gallery-viewer" style={{ background: photos[selectedPhoto].tone }}>
                    <div className="gallery-watermark">LENS &amp; LIGHT ARCHIVE</div>
                    <div className="gallery-photo-info">
                      <h3>{photos[selectedPhoto].title}</h3>
                      <p>{photos[selectedPhoto].meta}</p>
                    </div>
                  </div>
                  <div className="gallery-thumbnails">
                    {photos.map((p, idx) => (
                      <button
                        key={idx}
                        className={`thumb-btn ${selectedPhoto === idx ? 'active' : ''}`}
                        onClick={() => setSelectedPhoto(idx)}
                      >
                        <span className="thumb-bar" style={{ background: p.tone }}></span>
                        <span className="thumb-label">Plate 0{idx + 1}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. WEDDING RSVP DEMO */}
              {project.demoInteractiveType === 'rsvp' && (
                <div className="rsvp-demo-interface">
                  {!rsvpSubmitted ? (
                    <div className="rsvp-form-demo">
                      <div className="rsvp-heading">
                        <Calendar size={18} />
                        <h4>Elena &amp; Alexander — Wedding RSVP Simulation</h4>
                      </div>
                      <p className="rsvp-sub">Please select attendance preferences to test the local validation flow.</p>

                      <div className="demo-fields-grid">
                        <div className="form-group">
                          <label>Attending Guests</label>
                          <select value={guestCount} onChange={e => setGuestCount(e.target.value)} className="demo-input">
                            <option value="1">1 Guest</option>
                            <option value="2">2 Guests (Couple)</option>
                            <option value="3">3 Guests (Family)</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Dietary Preferences</label>
                          <select value={dietary} onChange={e => setDietary(e.target.value)} className="demo-input">
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Gluten-Free">Gluten-Free</option>
                            <option value="Standard Menu">Standard Menu</option>
                          </select>
                        </div>
                      </div>

                      <button className="demo-btn primary full-width" onClick={() => setRsvpSubmitted(true)}>
                        Submit RSVP Demonstration
                      </button>
                    </div>
                  ) : (
                    <div className="rsvp-success-demo">
                      <CheckCircle2 size={36} color="var(--primary-blue)" />
                      <h4>RSVP Response Recorded</h4>
                      <p>Guest count: <strong>{guestCount}</strong> · Dietary: <strong>{dietary}</strong></p>
                      <small>Note: This is a frontend demo interface for demonstration purposes.</small>
                      <button className="demo-btn outline mt-4" onClick={() => setRsvpSubmitted(false)}>
                        Reset RSVP Demo
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* 4. STARTUP FEATURE TABS DEMO */}
              {project.demoInteractiveType === 'tabs' && (
                <div className="tabs-demo-interface">
                  <div className="tabs-nav">
                    <button 
                      className={`tab-btn ${activeTab === 'observability' ? 'active' : ''}`}
                      onClick={() => setActiveTab('observability')}
                    >
                      Observability Engine
                    </button>
                    <button 
                      className={`tab-btn ${activeTab === 'edge' ? 'active' : ''}`}
                      onClick={() => setActiveTab('edge')}
                    >
                      Edge Routing (35 Regions)
                    </button>
                    <button 
                      className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
                      onClick={() => setActiveTab('security')}
                    >
                      Security &amp; Zero-Trust
                    </button>
                  </div>

                  <div className="tab-pane">
                    {activeTab === 'observability' && (
                      <div className="metric-preview-grid">
                        <div className="m-card">
                          <span className="m-title">Realtime Throughput</span>
                          <span className="m-stat">128,450 req/s</span>
                          <span className="m-trend positive">↑ 14.2% vs last hour</span>
                        </div>
                        <div className="m-card">
                          <span className="m-title">P99 Server Latency</span>
                          <span className="m-stat">8.4 ms</span>
                          <span className="m-trend neutral">Within SLA threshold</span>
                        </div>
                      </div>
                    )}
                    {activeTab === 'edge' && (
                      <div className="metric-preview-grid">
                        <div className="m-card">
                          <span className="m-title">Global Edge Nodes</span>
                          <span className="m-stat">35 PoPs Active</span>
                          <span className="m-trend positive">100% Health Status</span>
                        </div>
                        <div className="m-card">
                          <span className="m-title">SSL Handshake Time</span>
                          <span className="m-stat">4.2 ms</span>
                          <span className="m-trend positive">TLS 1.3 Optimized</span>
                        </div>
                      </div>
                    )}
                    {activeTab === 'security' && (
                      <div className="metric-preview-grid">
                        <div className="m-card">
                          <span className="m-title">WAF Rules Blocked</span>
                          <span className="m-stat">14,210 threats</span>
                          <span className="m-trend positive">0 False Positives</span>
                        </div>
                        <div className="m-card">
                          <span className="m-title">DDoS Protection</span>
                          <span className="m-stat">Autonomous</span>
                          <span className="m-trend positive">Layer 7 Shield active</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 5. AGENCY DISCIPLINE FILTER DEMO */}
              {project.demoInteractiveType === 'filter' && (
                <div className="agency-demo-interface">
                  <div className="filter-bar">
                    <span className="filter-title">Filter Portfolio:</span>
                    <button 
                      className={`filter-btn ${agencyFilter === 'all' ? 'active' : ''}`}
                      onClick={() => setAgencyFilter('all')}
                    >
                      All Disciplines ({agencyCases.length})
                    </button>
                    <button 
                      className={`filter-btn ${agencyFilter === 'identity' ? 'active' : ''}`}
                      onClick={() => setAgencyFilter('identity')}
                    >
                      Identity ({agencyCases.filter(c => c.category === 'identity').length})
                    </button>
                    <button 
                      className={`filter-btn ${agencyFilter === 'digital' ? 'active' : ''}`}
                      onClick={() => setAgencyFilter('digital')}
                    >
                      Digital ({agencyCases.filter(c => c.category === 'digital').length})
                    </button>
                  </div>

                  <div className="agency-case-grid">
                    {agencyCases
                      .filter(c => agencyFilter === 'all' || c.category === agencyFilter)
                      .map(c => (
                        <div key={c.id} className="case-demo-card">
                          <span className="case-badge">{c.category.toUpperCase()}</span>
                          <h4>{c.name}</h4>
                          <p>{c.type}</p>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* 6. TASKFLOW TASKS STATUS DEMO */}
              {project.demoInteractiveType === 'tasks' && (
                <div className="taskflow-demo-interface">
                  <div className="taskflow-bar">
                    <span>Click any status pill to advance state:</span>
                    <span className="task-stat-count">
                      {tasks.filter(t => t.status === 'Completed').length}/{tasks.length} Completed
                    </span>
                  </div>

                  <div className="task-demo-list">
                    {tasks.map(t => (
                      <div key={t.id} className="task-item-row">
                        <div className="task-info">
                          <span className={`prio-tag ${t.priority.toLowerCase()}`}>{t.priority}</span>
                          <span className="task-title">{t.title}</span>
                        </div>
                        <button
                          className={`task-status-btn ${t.status.toLowerCase().replace(' ', '-')}`}
                          onClick={() => advanceTaskStatus(t.id)}
                          title="Click to cycle status: To Do → In Progress → Completed"
                        >
                          {t.status}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Project Details Narrative */}
          <div className="modal-specs">
            <div className="specs-column">
              <h4>Concept Overview</h4>
              <p>{project.fullOverview}</p>
            </div>
            <div className="specs-column">
              <h4>Key Capabilities</h4>
              <ul className="modal-list">
                {project.deliverables.map((item, idx) => (
                  <li key={idx}>
                    <Check size={16} className="check-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className="modal-footer">
            <div className="tech-pills-row">
              <span className="tech-label"><Layers size={14} /> Technologies &amp; Patterns:</span>
              <div className="pills-wrap">
                {project.techStack.map((tech, idx) => (
                  <span key={idx} className="tech-pill">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
