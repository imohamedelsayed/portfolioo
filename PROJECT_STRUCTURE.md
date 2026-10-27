# Project Structure — Personal Portfolio (`personal_port`)

This document defines the clean, practical file and folder structure for Mohamed El-Sayed's personal portfolio. Built strictly with vanilla HTML, CSS, and modern JavaScript, this structure prioritizes modularity and zero build-step overhead while avoiding unnecessary abstractions.

---

## 1. Directory Tree Overview

```text
personal_port/
├── index.html                  # Main single-page portfolio document
├── DESIGN_BRIEF.md             # Approved design guidelines, tokens, and aesthetic rules
├── IMPLEMENTATION_PLAN.md      # Phased execution milestones and verification checklist
├── PROJECT_STRUCTURE.md        # File & directory organization specification (this file)
│
├── css/                        # Modular vanilla stylesheets (no preprocessor needed)
│   ├── variables.css           # Design tokens: palette, typography scale, spacing, shadows
│   ├── base.css                # Modern CSS reset, typography base, container & layout utilities
│   ├── components.css          # Reusable UI elements (buttons, badges, cards, inputs, tooltips)
│   └── sections.css            # Section-specific styles (hero, projects, services, skills, etc.)
│
├── js/                         # Modular vanilla JavaScript (ES modules via type="module")
│   ├── main.js                 # App entry point: imports & initializes modules on DOM ready
│   ├── navigation.js           # Floating navbar behavior, mobile drawer, scroll-spy active state
│   ├── animations.js           # IntersectionObserver scroll reveals & reduced-motion safeguards
│   └── contact.js              # Accessible form validation & one-click email copy functionality
│
└── assets/                     # Static media and vector assets
    ├── icons/                  # Authentic SVG icons for tech stack and UI actions
    │   ├── tech/               # Authentic technology logos (HTML5, CSS3, JS, Git, Figma, etc.)
    │   └── ui/                 # UI icons (arrows, mail, copy, menu-toggle, checkmark, external-link)
    │
    ├── images/                 # Image assets and illustrations
    │   ├── portrait/           # Mohamed's transparent PNG cutout & background shape graphics
    │   └── projects/           # High-fidelity preview mockups for the 3 showcase concepts
    │
    └── favicon/                # Browser favicon files and web manifest
```

---

## 2. Directory & File Breakdown

### 2.1 Root Documents
- **`index.html`**: The unified semantic entry point containing the full portfolio structure:
  - Accessible skip link (`#main-content`).
  - Floating navigation bar.
  - Asymmetric Hero section (`#hero`).
  - About section (`#about`).
  - Selected Projects showcase (`#projects`).
  - Services section (`#services`).
  - Skills & Authentic Tools grid (`#skills`).
  - 4-Stage Process section (`#process`).
  - Contact section & inquiry form (`#contact`).
  - Footer & Back-to-Top trigger.

### 2.2 Stylesheets (`/css`)
To keep vanilla CSS maintainable without a build tool like Vite or PostCSS, stylesheets are organized by distinct concern and imported cleanly or linked directly in `<head>`:
- **`variables.css`**: Central source of truth for design tokens:
  - Exact color hex codes: `--bg-main: #F4F7FB`, `--primary-blue: #8FC5F0`, `--soft-blue: #D8EAF9`, `--text-dark: #263746`, `--surface-card: #FFFFFF`.
  - Fluid typography clamps (`--text-h1`, `--text-h2`, `--text-body`, etc.).
  - 8-point spacing units (`--space-1` through `--space-16`).
  - Layered elevation shadows and transition timings.
- **`base.css`**: CSS normalization, box-sizing rules, standard body styles, focus-visible outlines, accessibility utility classes (e.g. `.sr-only`), and shared grid/flex container rules (`.container`, `.section`).
- **`components.css`**: Self-contained styles for reusable elements:
  - Primary, secondary, and icon buttons.
  - Floating pill navigation bar and mobile drawer.
  - Status badges ("Available for freelance").
  - Form controls (inputs, labels, error states).
  - Toast/notification tooltip.
- **`sections.css`**: Layout arrangements for individual sections:
  - Hero asymmetric split layout (60/40 desktop ratio) and portrait geometric shape composition.
  - Project showcase hybrid card layouts.
  - Services card grid and Process timeline.
  - Skills icon grid.
  - Footer bar.

### 2.3 JavaScript Modules (`/js`)
Using native ES modules (`<script type="module" src="js/main.js"></script>`) allows clean separation of logic without bundling tools:
- **`main.js`**: Bootstraps the application when the DOM is ready; imports and runs initializers from submodules.
- **`navigation.js`**: Manages the floating navbar:
  - Changes elevation/background on page scroll.
  - Opens and closes the accessible mobile navigation drawer (trapping focus and handling escape key).
  - Highlights active navigation links based on scroll position using `IntersectionObserver`.
- **`animations.js`**: Handles gentle, purposeful entry reveals:
  - Checks `window.matchMedia('(prefers-reduced-motion: reduce)')` first.
  - Observes section headers and project cards to apply staggered reveal classes.
- **`contact.js`**:
  - Handles client-side validation for the contact form with accessible feedback.
  - Implements the one-click "Copy Email" feature using the modern Clipboard API (`navigator.clipboard.writeText`) with fallback and tooltip feedback.

### 2.4 Assets Handling & Placeholders (`/assets`)
Per project constraints, assets are never assumed to exist until provided or verified:
- **Portrait Cutout:** The hero portrait is designated to live in `assets/images/portrait/mohamed-portrait.png`. A designated SVG graphic or placeholder backdrop element will structure the blue geometry (`#D8EAF9` and `#8FC5F0`) so that swapping in Mohamed's transparent PNG cutout requires zero CSS refactoring.
- **Project Previews:** Designated placeholders in `assets/images/projects/` will use structured SVG/CSS mockups representing:
  1. `ecommerce-preview.svg`
  2. `photographer-preview.svg`
  3. `wedding-preview.svg`
- **Tech Stack Logos:** High-quality, authentic SVG files stored directly in `assets/icons/tech/` (HTML5, CSS3, JavaScript, Git, Figma, etc.) ensuring razor-sharp rendering on Retina displays without third-party icon font dependencies.

---

## 3. Maintenance & Scalability Principles

1. **Zero External Build Tooling:** All files run directly in any standard browser or local static HTTP server (e.g. Python `http.server`, VS Code Live Server, or Node `serve`).
2. **Easy Content Updates:** All copy, project titles, service items, and skill lists remain directly in readable, semantic HTML, making future revisions straightforward.
3. **Deterministic Styling:** All colors and spacing are bound to CSS variables; theme modifications or color shifts can be adjusted in a single file (`css/variables.css`).
