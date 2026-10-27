# Mohamed El-Sayed — Personal Portfolio (`personal_port`)

> **"Designed with purpose. Built to work."**  
> *"I build complete websites for individuals and startups, turning ideas into a professional online presence."*

A minimal, technically confident personal portfolio engineered to convert visitors into freelance clients. Built with React, TypeScript, and Vite, featuring custom CSS design tokens strictly bound to the approved brand palette, authentic technology brand vectors, and interactive project prototypes.

---

## 1. Core Visual Direction & Brand Identity

- **Art Direction:** Quiet visuals. Strong engineering.
- **Approved Color Palette:**
  - Background Canvas: `#F4F7FB`
  - Primary Blue Accent: `#8FC5F0`
  - Soft Blue Surface & Highlights: `#D8EAF9`
  - Dark Headings & Primary Text: `#263746` (exceeds WCAG AAA contrast)
  - Card & Container Surfaces: `#FFFFFF`
- **Typography:** Display headings in `Plus Jakarta Sans`, body and interface copy in `Inter`.
- **Portrait Art Direction:** Mohamed's authentic cutout portrait integrated into the hero layout with the original blue circle artwork strictly preserved. Zero artificial picture frames or circular avatar crops.

---

## 2. Technology Stack

- **Framework:** [React 18](https://react.dev/) with [TypeScript 5](https://www.typescriptlang.org/)
- **Bundler & Dev Server:** [Vite 5](https://vitejs.dev/)
- **Design System:** Custom CSS tokens and modular component stylesheets (`src/styles/variables.css`, `base.css`, `main.css`)
- **Iconography:**
  - General UI: [Lucide React](https://lucide.dev/)
  - Tech Stack Brand Logos: Handcrafted authentic SVG vectors (`src/components/TechIcons.tsx`)
- **Verification:** Headless Chrome & Chrome DevTools Protocol (CDP) for multi-viewport audits and automated screenshots

---

## 3. Six Distinct Demonstration Concepts

The portfolio showcases six demonstration concepts illustrating different interface engineering patterns without misrepresenting them as deployed client work:

1. **Pixel Store (E-commerce Experience):** Hardware and computer storefront with interactive category switching, real-time cart state management, and checkout simulation.
2. **Lens & Light (Photographer Portfolio):** Editorial archive layout with generous whitespace, EXIF metadata overlays, and an interactive 4-plate gallery viewer.
3. **Ever After (Interactive Wedding Invitation):** Bespoke celebration microsite featuring an event schedule, live countdown ticker, and an interactive RSVP demonstration.
4. **Launchpad (Startup Landing Page):** SaaS infrastructure landing page with concise product messaging and interactive feature tab walkthroughs (Observability, Edge, Security).
5. **Studio North (Creative Agency Website):** Minimal art-directed agency portfolio with real-time discipline filtering (Identity, Digital Systems).
6. **Taskflow (Productivity Dashboard):** Application task board demonstrating UI state management with interactive status cycling (To Do → In Progress → Completed).

---

## 4. Centralized Site & Contact Configuration

All personal information, contact links, service descriptions, and project data are centralized in a single file:

📁 **`src/config/site.ts`**

### Contact Fields Reference:
```typescript
export const siteConfig = {
  name: "Mohamed El-Sayed",
  role: "Web Developer",
  headline: "Designed with purpose. Built to work.",
  usp: "I build complete websites for individuals and startups, turning ideas into a professional online presence.",
  
  // Set your real contact destinations here:
  email: "mohamed.elsayed.dev@example.com", // Replace with real email
  whatsappNumber: "",                       // Enter international format e.g. "+201000000000"
  whatsappPrefillText: "Hello Mohamed, I came across your portfolio and would like to discuss a web project.",
  linkedinUrl: "",                          // e.g. "https://linkedin.com/in/your-profile"
  githubUrl: "",                            // e.g. "https://github.com/your-username"
  additionalProfileUrl: "",
  location: "Available Worldwide (Remote)",
  availability: "Available for freelance projects"
};
```

*Note on Unconfigured Fields:*
- If `whatsappNumber` is left empty, the WhatsApp channel is cleanly marked as unconfigured in the UI without generating dead links.
- If `githubUrl` or `linkedinUrl` is empty, the button is visibly disabled and indicates configuration is pending in `site.ts`.
- Direct email includes one-click copy with an instant accessible confirmation toast.
- The project inquiry form uses a transparent client-side `mailto:` generator that pre-fills your email client with structured project details without requiring an unverified external backend.

---

## 5. Getting Started & Commands

### Prerequisites
- Node.js (v18+ recommended; tested on v24.18.0)
- npm (v9+ recommended; tested on v11.16.0)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Opens the live development server on `http://localhost:3000/`.

### 3. Build for Production
```bash
npm run build
```
Compiles TypeScript, processes CSS tokens, bundles optimized assets into `dist/`.

### 4. Preview Production Build
```bash
npm run preview
```
Serves the compiled production build locally for QA.

---

## 6. Directory Structure

```text
personal_port/
├── public/
│   ├── favicon.svg             # Brand monogram SVG favicon
│   └── images/
│       └── mohamed-portrait.png # Authentic portrait cutout (blue circle preserved)
├── src/
│   ├── config/
│   │   └── site.ts             # Central configuration (contact, projects, skills, services)
│   ├── components/
│   │   ├── Navbar.tsx          # Floating compact glassmorphic navbar & mobile drawer
│   │   ├── Hero.tsx            # Asymmetric split composition, headline & USP, portrait
│   │   ├── About.tsx           # Engineering philosophy & 4 craft pillars
│   │   ├── Projects.tsx        # 6-project hybrid showcase with preview triggers
│   │   ├── ProjectVisuals.tsx  # Bespoke SVG/HTML/CSS mockups for all 6 concepts
│   │   ├── ProjectModal.tsx    # Interactive live prototype demonstration modal
│   │   ├── Services.tsx        # 5 core client offerings with deliverables list
│   │   ├── Skills.tsx          # Verified skillset with authentic tech brand SVGs
│   │   ├── TechIcons.tsx       # Official SVG vectors (Python, C++, HTML5, CSS3, Django, etc.)
│   │   ├── Process.tsx         # 5-stage collaboration workflow & timeline
│   │   ├── Contact.tsx         # Direct channels, WhatsApp, email copy, inquiry form
│   │   └── Footer.tsx          # Deliberate ending, navigation links, copyright year
│   ├── styles/
│   │   ├── variables.css       # Color tokens, fluid typography clamp scale, spacing
│   │   ├── base.css            # Reset, layout utilities, reduced-motion safeguards
│   │   └── main.css            # Art-directed section styles, responsive breakpoints
│   ├── App.tsx                 # Main layout & section scroll tracking
│   └── main.tsx                # React root mount point
├── screenshots/                # Real browser visual verification captures
│   ├── desktop_1440.png        # Desktop 1440x900 viewport capture
│   ├── tablet_768x1024.png     # Tablet 768x1024 viewport capture
│   ├── mobile_cdp_emulated.png # Mobile 390x844 viewport capture
│   └── modal_cdp_test.png      # Interactive demo modal capture
├── index.html                  # HTML entry point with Google Fonts & metadata
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

---

## 7. Quality Assurance & Verification Summary

- **Visual Hierarchy & Palette:** Verified via desktop (1440×900), laptop (1280×800), tablet (768×1024), and mobile (390×844) captures.
- **Portrait Integration:** Mohamed's authentic cutout renders with the original blue circle intact, with zero bounding boxes or artificial clipping.
- **Interactivity:**
  - Navigation smooth scrolling with header offset correction.
  - Active section highlight via `IntersectionObserver`.
  - Mobile drawer toggle with Escape key support.
  - Modal interactive demonstrations (e-commerce cart, photography plate switcher, wedding RSVP flow, startup metrics tabs, agency filter, task status cyclist).
  - One-click email copy with toast confirmation.
- **Accessibility:**
  - High-contrast text `#263746` over `#F4F7FB` and `#FFFFFF` (WCAG AAA compliant: >10:1 ratio).
  - Dedicated keyboard skip-to-content link.
  - Visible focus rings on all interactive elements.
  - Full `@media (prefers-reduced-motion: reduce)` support.
- **Build Verification:** Production build verified with TypeScript checking (`tsc && vite build`) producing clean, minified, gzip-optimized bundles without warnings or errors.
