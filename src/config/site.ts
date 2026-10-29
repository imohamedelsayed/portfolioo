export interface SiteConfig {
  name: string;
  role: string;
  headline: string;
  usp: string;
  email: string;
  whatsappNumber: string;
  whatsappPrefillText: string;
  linkedinUrl: string;
  githubUrl: string;
  additionalProfileUrl: string;
  location: string;
  availability: string;
}

export const siteConfig: SiteConfig = {
  name: "Mohamed EL-Sayed",
  role: "Web Developer",
  headline: "Designed with purpose. Built to work.",
  usp: "I build complete websites for individuals and startups, turning ideas into a professional online presence.",
  email: "mohamed.elsayed.dev@example.com",
  whatsappNumber: "",
  whatsappPrefillText: "Hello Mohamed, I came across your portfolio and would like to discuss a web project.",
  linkedinUrl: "",
  githubUrl: "https://github.com/imohamedelsayed",
  additionalProfileUrl: "",
  location: "Available Worldwide (Remote)",
  availability: "Available for freelance projects"
};

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  bestFor: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "website-dev",
    number: "01",
    title: "Website Development",
    description: "End-to-end website engineering built from the ground up with clean, maintainable code and performance-first architecture.",
    deliverables: [
      "Custom semantic markup",
      "Robust structure & performance",
      "Production-ready deployment"
    ],
    bestFor: "Individuals & growing businesses needing a tailored web foundation."
  },
  {
    id: "responsive-design",
    number: "02",
    title: "Responsive Website Design & Implementation",
    description: "Fluid, device-agnostic layouts that deliver seamless experiences across desktop, tablet, and mobile screens without awkward compromises.",
    deliverables: [
      "Fluid typography & spacing",
      "Touch-friendly interactions",
      "Cross-browser consistency"
    ],
    bestFor: "Brands wanting an effortless user experience on any device."
  },
  {
    id: "landing-pages",
    number: "03",
    title: "Landing Pages for Individuals and Startups",
    description: "Laser-focused landing pages designed to clearly communicate your unique value proposition and convert visitors into clients or early users.",
    deliverables: [
      "Compelling visual hierarchy",
      "Conversion-oriented layout",
      "Speed & Core Web Vitals focus"
    ],
    bestFor: "Product launches, independent consultants, and early-stage startups."
  },
  {
    id: "portfolio-business",
    number: "04",
    title: "Portfolio and Business Websites",
    description: "Distinctive, personal web presences that convey technical confidence, credibility, and thoughtful craftsmanship without cookie-cutter templates.",
    deliverables: [
      "Art-directed visual identity",
      "Content strategy & structure",
      "Accessible contact pathways"
    ],
    bestFor: "Creatives, founders, and specialized professionals."
  },
  {
    id: "ecommerce-dev",
    number: "05",
    title: "E-commerce Website Development",
    description: "Clean, product-centric digital storefronts focused on seamless product exploration, organized catalogs, and frictionless checkout flows.",
    deliverables: [
      "Product showcases & filtering",
      "Cart & checkout interfaces",
      "Optimized mobile purchasing"
    ],
    bestFor: "Boutique retail brands and direct-to-consumer product sellers."
  }
];

export interface TechnologyItem {
  name: string;
  iconId: string;
}

export const technologiesData: TechnologyItem[] = [
  { name: "TypeScript", iconId: "typescript" },
  { name: "GitHub", iconId: "github" },
  { name: "Node.js", iconId: "nodejs" },
  { name: "Git", iconId: "git" },
  { name: "Django", iconId: "django" },
  { name: "Express", iconId: "express" },
  { name: "PostgreSQL", iconId: "postgresql" },
  { name: "MySQL", iconId: "mysql" }
];

export interface ProjectConcept {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  fullOverview: string;
  deliverables: string[];
  techStack: string[];
  conceptType: string;
  visualType: 'ecommerce' | 'photography' | 'wedding' | 'startup' | 'agency' | 'dashboard';
  featured: boolean;
  demoInteractiveType: 'cart' | 'gallery' | 'rsvp' | 'tabs' | 'filter' | 'tasks';
}

export const projectsData: ProjectConcept[] = [
  {
    id: "pixel-store",
    title: "Pixel Store",
    category: "E-commerce Experience",
    tagline: "Modern electronics and hardware storefront concept with fluid product exploration.",
    description: "A refined digital hardware storefront highlighting crisp product presentation, structured category navigation, live specification sheets, and a frictionless cart drawer experience.",
    fullOverview: "Pixel Store explores how an electronics retailer can present technical specifications without cluttering the shopping flow. Features interactive category switching, dynamic cart management, and clear pricing architecture designed for high conversion.",
    deliverables: [
      "Product catalog & filter system",
      "Dynamic cart drawer with item count",
      "Responsive product detail modals"
    ],
    techStack: [
      "HTML5 / CSS3",
      "Modern JavaScript",
      "Component State",
      "Accessible Cart Flow"
    ],
    conceptType: "Demonstration Concept",
    visualType: "ecommerce",
    featured: true,
    demoInteractiveType: "cart"
  },
  {
    id: "lens-and-light",
    title: "Lens & Light",
    category: "Photographer Portfolio",
    tagline: "Editorial photography showcase emphasizing imagery, typography, and visual pacing.",
    description: "An image-first portfolio concept for editorial and documentary photographers. Balances generous whitespace with deliberate typography and an interactive gallery lightbox.",
    fullOverview: "Lens & Light proves that photographer portfolios should let the images speak first. The layout avoids heavy frames, using delicate margins, subtle photo captions, and an accessible photo switcher that maintains photographic aspect ratios perfectly.",
    deliverables: [
      "Editorial grid & single-image focus",
      "Lightweight gallery modal",
      "Inquiry booking pathway"
    ],
    techStack: [
      "Responsive CSS Grid",
      "Lightbox Interaction",
      "Aspect Ratio Optimization",
      "Editorial Typography"
    ],
    conceptType: "Demonstration Concept",
    visualType: "photography",
    featured: true,
    demoInteractiveType: "gallery"
  },
  {
    id: "ever-after",
    title: "Ever After",
    category: "Interactive Wedding Invitation",
    tagline: "Bespoke digital invitation with event details, timeline, and an interactive RSVP demo.",
    description: "An elegant digital celebration invitation featuring venue schedules, a live days counter, guest itinerary, and a responsive RSVP demonstration with local-only validation.",
    fullOverview: "Ever After demonstrates bespoke, heartfelt web design for private milestones. Rather than static paper invitations, guests enjoy an interactive schedule, dietary preference inputs, and calendar reminders with tasteful soft blue aesthetics.",
    deliverables: [
      "Event timeline & venue map",
      "Interactive RSVP demonstration",
      "Mobile-optimized schedule"
    ],
    techStack: [
      "Form Validation",
      "Event Countdown Logic",
      "Smooth Timeline Layout",
      "Accessible Micro-interactions"
    ],
    conceptType: "Demonstration Concept",
    visualType: "wedding",
    featured: false,
    demoInteractiveType: "rsvp"
  },
  {
    id: "launchpad",
    title: "Launchpad",
    category: "Startup Landing Page",
    tagline: "Conversion-oriented SaaS landing page with concise value messaging and feature tabs.",
    description: "A startup landing page concept created to showcase a SaaS platform's core benefits, feature walkthrough tabs, transparent pricing models, and direct conversion hooks.",
    fullOverview: "Launchpad focuses on clarity above all. It replaces buzzword clutter with a direct product value headline, an interactive tabbed feature showcase showing real UI workflows, and transparent tier cards that guide prospective users directly to action.",
    deliverables: [
      "Hero with product value statement",
      "Interactive tabbed feature walkthrough",
      "Responsive pricing grid"
    ],
    techStack: [
      "Interactive Tabs",
      "CSS Custom Properties",
      "Semantic Landing Structure",
      "Micro-animations"
    ],
    conceptType: "Demonstration Concept",
    visualType: "startup",
    featured: true,
    demoInteractiveType: "tabs"
  },
  {
    id: "studio-north",
    title: "Studio North",
    category: "Creative Agency Website",
    tagline: "Distinctive design studio website featuring curated case studies and bold typography.",
    description: "A minimal, art-directed agency portfolio concept. Combines asymmetric grid compositions, discipline filters (Branding, Web, Motion), and editorial project summaries.",
    fullOverview: "Studio North illustrates how a multidisciplinary studio can present complex creative work with restraint. It features dynamic case study filtering, bold typography hierarchy, and a structured services breakdown tailored for high-ticket clients.",
    deliverables: [
      "Discipline filter interaction",
      "Case study overview cards",
      "Structured client inquiry footer"
    ],
    techStack: [
      "Dynamic Filter State",
      "Asymmetric Layouts",
      "Typography Hierarchy",
      "Responsive Design"
    ],
    conceptType: "Demonstration Concept",
    visualType: "agency",
    featured: false,
    demoInteractiveType: "filter"
  },
  {
    id: "taskflow",
    title: "Taskflow",
    category: "Productivity Dashboard",
    tagline: "Responsive web application interface featuring live task status management and filters.",
    description: "A clean productivity dashboard concept demonstrating UI state management, status toggles (To Do, In Progress, Done), priority indicators, and responsive data hierarchy.",
    fullOverview: "Taskflow demonstrates interface engineering for data-heavy applications. Visitors can interact directly with demonstration task cards—moving items between status lanes, filtering by project tag, and observing instant feedback without backend delays.",
    deliverables: [
      "Interactive task status toggling",
      "Tag-based filter controls",
      "Clean data density & hierarchy"
    ],
    techStack: [
      "Interactive UI State",
      "Component Architecture",
      "Accessible Controls",
      "Data Visualization Patterns"
    ],
    conceptType: "Demonstration Concept",
    visualType: "dashboard",
    featured: false,
    demoInteractiveType: "tasks"
  }
];
