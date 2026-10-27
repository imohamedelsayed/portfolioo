import React, { useState } from 'react';
import { ArrowUpRight, Play, Info } from 'lucide-react';
import { projectsData, ProjectConcept } from '../config/site';
import { ProjectVisual } from './ProjectVisuals';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const [activeModalProject, setActiveModalProject] = useState<ProjectConcept | null>(null);

  return (
    <section id="projects" className="section projects-section" aria-labelledby="projects-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 id="projects-heading" className="section-title">
            Selected Work &amp; Prototypes
          </h2>
          <p className="section-subtitle">
            A curated showcase of six distinct website architectures and interaction concepts, demonstrating frontend precision, responsive design, and purposeful component engineering.
          </p>

          <div className="concept-transparency-callout">
            <Info size={16} className="callout-icon" />
            <span>
              <strong>Concept Notice:</strong> The projects below are illustrative design and development demonstrations created to exhibit interface capability, not deployed client work.
            </span>
          </div>
        </div>

        {/* Six-Project Hybrid Showcase */}
        <div className="projects-showcase-grid">
          {projectsData.map((project, index) => {
            const isFeatured = project.featured;

            return (
              <article
                key={project.id}
                className={`project-entry-card ${isFeatured ? 'featured-card' : 'standard-card'} project-idx-${index}`}
              >
                {/* Visual Preview Container */}
                <div 
                  className="project-visual-surface"
                  onClick={() => setActiveModalProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveModalProject(project);
                    }
                  }}
                  aria-label={`Inspect ${project.title} demonstration`}
                >
                  <ProjectVisual type={project.visualType} title={project.title} />

                  {/* Hover Overlay Trigger */}
                  <div className="visual-interactive-overlay">
                    <span className="overlay-pill">
                      <Play size={14} fill="currentColor" />
                      <span>Launch Interactive Demo</span>
                    </span>
                  </div>
                </div>

                {/* Project Metadata & Narrative */}
                <div className="project-info-surface">
                  <div className="project-top-row">
                    <span className="project-category">{project.category}</span>
                  </div>

                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  {/* Tech Stack Pills */}
                  <div className="project-tech-tags">
                    {project.techStack.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="tech-tag more">+{project.techStack.length - 3}</span>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="project-actions">
                    <button
                      className="explore-project-btn"
                      onClick={() => setActiveModalProject(project)}
                      aria-label={`Explore live demo of ${project.title}`}
                    >
                      <span>Explore Prototype</span>
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Interactive Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
