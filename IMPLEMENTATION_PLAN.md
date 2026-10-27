# Implementation Plan — Personal Portfolio (`personal_port`)

This document outlines the ordered, milestone-driven phases for constructing Mohamed El-Sayed's personal portfolio using vanilla HTML, CSS, and modern JavaScript. Each phase defines clear deliverables, strict dependencies, and concrete visual verification criteria.

---

## Phase 1: Core Foundation & Design System Setup

### Milestone Goal
Establish the foundational markup skeleton, global CSS custom properties (design tokens), normalized typography, reset styles, and utility layout wrappers.

### Deliverables
1. **Document Skeleton (`index.html`):**
   - HTML5 standard structure with complete metadata (`meta charset`, viewport, description, open graph tags).
   - Link to Google Fonts (`Plus Jakarta Sans` / `Inter`).
   - Landmark containers with unique semantic IDs (`#hero`, `#about`, `#projects`, `#services`, `#skills`, `#process`, `#contact`).
2. **Global Stylesheet (`css/variables.css` & `css/base.css`):**
   - Palette token definition (`--bg-main`, `--primary-blue`, `--soft-blue`, `--text-dark`, `--surface-card`).
   - Fluid typography system using CSS `clamp()`.
   - 8pt spacing system and container width utilities (`.container`, `.section`).
   - CSS Reset and focus state declarations.

### Dependencies
- None (Phase 1 is the prerequisite for all subsequent phases).

### Visual & Functional Verification Steps
- [ ] Inspect the page background to verify `#F4F7FB` is uniform across viewport resizes.
- [ ] Verify typography loads correctly with Google Fonts fallback to system fonts if offline.
- [ ] Check text contrast of `#263746` over `#F4F7FB` in browser devtools (must exceed 7:1 ratio).
- [ ] Confirm baseline CSS reset removes unwanted default margins and box-sizing discrepancies across Chrome, Firefox, and Edge.

---

## Phase 2: Navigation & Asymmetric Hero Section

### Milestone Goal
Implement the floating pill navigation bar and the asymmetric split hero section featuring Mohamed's transparent cutout portrait, organic background shapes, and typography.

### Deliverables
1. **Floating Pill Navigation Bar:**
   - Fixed/floating container with blurred translucent white background (`rgba(255, 255, 255, 0.85)` + `backdrop-filter: blur(12px)`).
   - Brand monogram/wordmark, primary section navigation links, and a high-visibility "Let's Talk" button.
   - Accessible mobile hamburger button with slide-down navigation drawer.
2. **Asymmetric Split Hero Layout:**
   - **Left Column:** Eyebrow availability badge ("● Available for freelance work"), primary `H1` headline (*"Designed with purpose. Built to work."*), supporting value copy, and dual CTA button row ("View My Work", "Get In Touch").
   - **Right Column:** Transparent portrait integration with multi-layered subtle blue geometric backdrop (`#D8EAF9` and `#8FC5F0` soft shapes and SVG contour lines). No rigid card or rectangular image frame.

### Dependencies
- Phase 1 (Foundation tokens & typography).

### Visual & Functional Verification Steps
- [ ] **Navbar Floating Effect:** Scroll down the page; verify the navbar remains fixed, retains its blurred background, and does not occlude hero content on initial load.
- [ ] **Mobile Navbar Toggle:** Shrink viewport to 375px; verify the mobile menu toggles smoothly with proper ARIA attributes (`aria-expanded="true/false"`).
- [ ] **Portrait Integration:** Inspect hero portrait visual; ensure no rectangular border or card boundary is visible around the cutout; confirm blue ambient shapes sit behind the portrait.
- [ ] **CTA Interactions:** Test hover states on both "View My Work" (solid accent) and "Get In Touch" (subtle ghost/outline). Verify keyboard tab index and focus rings.

---

## Phase 3: Content Sections (About, Services, Skills & Tools, Process)

### Milestone Goal
Build the narrative and client-focused informational sections that communicate Mohamed's value proposition, service offerings, authentic technical skillset, and workflow methodology.

### Deliverables
1. **About Section:**
   - Concise professional overview detailing Mohamed's philosophy of combining clean code with purposeful design.
   - Value pillars (Performance-first, Clean code standards, Client-centric delivery) without fabricated statistics.
2. **Services Section:**
   - 3–4 focused service cards (Custom Website Development, Frontend Engineering, E-Commerce Solutions, Performance & SEO).
   - Clean iconography, concise deliverables list per service, and clear client outcomes.
3. **Skills & Tools Section:**
   - Categorized grid with authentic technology SVGs:
     - *Frontend Core:* HTML5, CSS3, Modern JavaScript (ES6+), Semantic Web.
     - *Styling & Architecture:* Responsive Web Design, CSS Grid/Flexbox, UI/UX Systems.
     - *Workflow & Tools:* Git/GitHub, Figma to Code, Performance Auditing, DevTools.
   - Clean card/pill hover states with soft blue borders.
4. **Process Section:**
   - Step-by-step 4-stage client workflow:
     1. *Discovery & Strategy* (Scope, objectives, structure)
     2. *Design & Wireframing* (Aesthetic direction, user journeys)
     3. *Development & Polish* (Semantic coding, responsiveness, accessibility)
     4. *Testing, Launch & Handover* (Speed optimization, deployment, guidance)

### Dependencies
- Phase 1 & 2 (Layout container styles, typography scale).

### Visual & Functional Verification Steps
- [ ] Ensure all skill icons render clean, authentic vector SVGs (no pixelation or low-res PNGs).
- [ ] Verify card grid transitions smoothly from 3–4 columns on desktop (`>1024px`) to 2 columns on tablet (`768px`) to single-column stack on mobile (`<640px`).
- [ ] Check vertical rhythm and consistent section spacing (`clamp(5rem, 8vw, 8.5rem)`).

---

## Phase 4: Selected Projects Showcase (Hybrid Presentation)

### Milestone Goal
Implement the core work showcase presenting Mohamed's three project concepts using high-impact visual mockups and restrained, technical interactive details.

### Deliverables
1. **Hybrid Project Cards:**
   - **Project 1:** E-commerce Website (Modern storefront experience).
   - **Project 2:** Photographer Portfolio (Image-forward editorial showcase).
   - **Project 3:** Interactive Wedding Invitation (Bespoke interactive microsite).
2. **Card Structure:**
   - High-fidelity visual preview frame with subtle elevation and rounded corners.
   - Project metadata tags (e.g. "Concept", "Frontend & UI Design", "Responsive Web").
   - Brief problem/solution breakdown and technical highlights (e.g. Vanilla JS, CSS Grid, Accessible Forms).
   - Restrained hover interaction: subtle image scale (`scale(1.02)`), gentle card lift (`translateY(-4px)`), and link reveal.

### Dependencies
- Phase 1 & 2 (Typography, palette, card elevation).

### Visual & Functional Verification Steps
- [ ] Verify project cards do not cause horizontal layout overflow or layout shifts when hovered.
- [ ] Check image aspect ratios across viewports to avoid stretching or awkward cropping.
- [ ] Verify each project card has accessible link targets with keyboard focus states.

---

## Phase 5: Contact Section, Footer & Interactive Polish

### Milestone Goal
Build the conversion-focused contact area, responsive footer, smooth scrolling logic, and micro-interactions.

### Deliverables
1. **Contact Section:**
   - Direct contact options (direct email link with one-click copy button + notification tooltip).
   - Clean, accessible client inquiry form (Name, Email, Project Type dropdown/pills, Project Details).
   - Form validation feedback with clear accessible error/success indicators.
2. **Footer:**
   - Clean copyright notice, back-to-top button, navigation anchor links, and social profile links (GitHub, LinkedIn).
3. **Vanilla JavaScript Interactions (`js/main.js`):**
   - Mobile navigation drawer toggle and click-outside dismissal.
   - Smooth anchor scrolling with sticky header offset correction.
   - IntersectionObserver triggers for staggered entry transitions on cards and headers.
   - One-click email copy functionality with visual toast feedback.

### Dependencies
- Phases 1 through 4.

### Visual & Functional Verification Steps
- [ ] **Form Validation:** Submit form with empty fields; verify HTML5 validation triggers or inline custom errors without submitting.
- [ ] **Email Copy Button:** Click copy email button; verify clipboard writes correctly and "Copied to clipboard!" tooltip appears and auto-dismisses.
- [ ] **Back to Top:** Scroll past hero; verify back-to-top button fades in and smoothly navigates to top when clicked.

---

## Phase 6: Accessibility, Performance, Motion Audit & Cross-Browser Testing

### Milestone Goal
Rigorous QA audit ensuring the site is accessible, fast, fully responsive, and honors user system preferences.

### Deliverables
1. **`prefers-reduced-motion` Enforcement:**
   - Ensure all animations, transitions, and smooth scrolling gracefully downgrade to immediate cuts for users with motion sensitivity.
2. **Accessibility Audit:**
   - Keyboard navigation tab-order walkthrough from top of DOM to bottom.
   - Screen reader announcements for mobile menu toggle and form submission status.
   - Color contrast checks for every single state (default, hover, focus, disabled).
3. **Performance Optimization:**
   - Ensure SVGs are minified.
   - Zero render-blocking third-party scripts.
   - Lighthouse performance, accessibility, and best practices audit score target: 95+.

### Dependencies
- All prior phases.

### Visual & Functional Verification Steps
- [ ] Toggle `prefers-reduced-motion: reduce` in DevTools rendering tab; verify zero slide/fade animations run.
- [ ] Tab completely through the page using only keyboard `Tab` and `Shift+Tab`; confirm focus ring is visible on all interactive elements at all times.
- [ ] Test across desktop viewports (1920px, 1440px, 1280px) and mobile viewports (iPhone SE 375px, Pixel 7 412px, iPad 768px, iPad Pro 1024px).
