# Design Brief — Personal Portfolio (`personal_port`)

## 1. Project Overview & Strategy

- **Project Name:** `personal_port`
- **Owner:** Mohamed El-Sayed
- **Role:** Web Developer
- **Target Audience:** Potential freelance clients (individuals, founders, and startups) seeking a high-quality, professional, and reliable web developer.
- **Brand Personality:** Creative, minimal, professional, and technically confident.
- **Primary Mission:** Present Mohamed as an established, competent professional who transforms ideas into high-converting, high-performance web products, without artificial hype or fabricated credentials.

---

## 2. Core Messaging & Identity Copy

- **Name:** Mohamed El-Sayed
- **Role Title:** Web Developer
- **Hero Headline:** *"Designed with purpose. Built to work."*
- **Supporting Value Proposition:**  
  *"I build complete websites for individuals and startups that turn ideas into a professional online presence."*
- **Calls to Action (CTAs):**
  - **Primary CTA:** `View My Work` (Smooth scrolls to Selected Projects)
  - **Secondary CTA:** `Get In Touch` (Navigates to Contact section / direct mail)
- **Initial Showcase Projects (Concept Placeholders):**
  1. **E-commerce Website:** Modern storefront focusing on conversion, fluid product exploration, and seamless checkout experience.
  2. **Photographer Portfolio:** Image-centric showcase with refined editorial typography, immersive gallery layouts, and performance-optimized loading.
  3. **Interactive Wedding Invitation:** Bespoke, animation-rich microsite with personalized RSVP flow and interactive event details.
- **Strict Content Constraints:**
  - Zero fabricated testimonials, client names, statistics, awards, or arbitrary metric counters.
  - Zero reference to student or junior status.
  - Authentic technology logos and clean factual descriptions of services and process.

---

## 3. Strict Color Palette & Design Tokens

The palette is strictly derived from the approved brand colors. No secondary or conflicting dominant hue may be introduced.

| Token Name | Hex Code | Role & Usage | Contrast Ratio against `#F4F7FB` / `#FFFFFF` |
| :--- | :--- | :--- | :--- |
| `--bg-main` | `#F4F7FB` | Base canvas background for the entire page | Base surface |
| `--surface-card` | `#FFFFFF` | Elevated cards, floating navbar surface, project visual containers | High elevation base |
| `--primary-blue` | `#8FC5F0` | Primary accent, hero graphic shapes, focus rings, interactive states | Decorative & accent balance |
| `--soft-blue` | `#D8EAF9` | Ambient backdrop shapes, badge backgrounds, subtle borders, selection states | Subtle accent |
| `--text-dark` | `#263746` | Primary headers, body typography, active icons, solid CTA backgrounds | High contrast (10.2:1 against `#FFFFFF`, 9.6:1 against `#F4F7FB`) — WCAG AAA |
| `--text-muted` | `rgba(38, 55, 70, 0.72)` | Secondary descriptions, metadata, labels, captions | Compliant WCAG AA |
| `--border-subtle` | `rgba(38, 55, 70, 0.08)` | Dividers, card boundaries, navbar hairline border | Clean structural separation |
| `--primary-hover` | `#78B5E5` | Hover/active state for primary blue elements | Maintained chromatic consistency |

---

## 4. Typography Direction

A clean, modern geometric sans-serif pairing that balances precision with human warmth:

- **Primary Display Font (Headings):** `Plus Jakarta Sans` (or `Outfit`) — weights: `600 (SemiBold)`, `700 (Bold)`, `800 (ExtraBold)`
  - Clean geometric structure, tight tracking on titles (`-0.02em` to `-0.03em`), authoritative yet welcoming.
- **Body & Interface Font:** `Inter` — weights: `400 (Regular)`, `500 (Medium)`, `600 (SemiBold)`
  - Superior legibility on screens across all pixel densities, balanced tall x-height, clear numeric and punctuation glyphs.
- **Fallback Stack:** `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

### Type Scale (Fluid via `clamp()`):
- **Hero Title (`H1`):** `clamp(2.5rem, 5vw + 1rem, 4.25rem)` / line-height: `1.1`
- **Section Heading (`H2`):** `clamp(2rem, 3vw + 0.75rem, 2.75rem)` / line-height: `1.2`
- **Card / Subsection Heading (`H3`):** `clamp(1.25rem, 1.5vw + 0.5rem, 1.625rem)` / line-height: `1.3`
- **Lead / Subtitle:** `clamp(1.125rem, 1vw + 0.25rem, 1.25rem)` / line-height: `1.6`
- **Standard Body:** `1rem (16px)` / line-height: `1.65`
- **Small / Metadata / Tag:** `0.875rem (14px)` / line-height: `1.5`

---

## 5. Visual Hierarchy & Spacing Principles

- **8-Point Spacing Scale:** Layout margins, paddings, and component gaps align to multiples of `8px` (`8px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`, `128px`).
- **Section Spacing:** Generous vertical breathing room between major sections (`clamp(5rem, 8vw, 8.5rem)`).
- **Surface Elevation:**
  - Flat base on `#F4F7FB`.
  - Floating components (Navbar, active cards) use multi-layered soft shadows tinted with dark text color (`rgba(38, 55, 70, 0.05) - rgba(38, 55, 70, 0.12)`).
  - Background geometry: Layered subtle geometric shapes (soft circles, rounded poly-rectangles, thin accent lines) using `#D8EAF9` and `#8FC5F0` at 20%–45% opacity to add depth without noise.

---

## 6. Portrait Treatment & Hero Layout

- **Asymmetric Split Hero:**
  - **Left Column (60% on desktop):** Strong typographic hierarchy with eyebrow tag ("Available for freelance"), impactful H1 headline, focused supporting copy, dual CTA group, and a discreet social/availability badge.
  - **Right Column (40% on desktop):** Integrated portrait composition.
- **Portrait Integration Rules:**
  - Real portrait rendered as an organic **transparent PNG cutout**.
  - **Zero box container:** No rectangular photo card, no outer border, no polaroid frame, and no clipping mask box.
  - **Subtle Background Geometry:** Behind Mohamed's cutout sits an organic composition of soft blue shapes (`#D8EAF9` and `#8FC5F0` gradients with varying blur and opacity) plus thin decorative vector lines that ground the portrait naturally into the background.
  - The base of the portrait seamlessly fades or grounds into the hero baseline.

---

## 7. Component Interaction Patterns

### 7.1 Floating Compact Navbar
- Position: Sticky/fixed pill floating `16px`–`24px` from the viewport top.
- Surface: `#FFFFFF` with `backdrop-filter: blur(12px)`, subtle border (`rgba(38, 55, 70, 0.08)`), and soft drop shadow.
- Content: Mohamed El-Sayed wordmark/monogram on the left, streamlined navigation links center, and a compact "Let's Talk" CTA button on the right.
- Mobile: Collapses cleanly into a responsive hamburger trigger revealing an accessible slide-down or overlay menu.

### 7.2 Selected Projects (Hybrid Showcase)
- Presentation: Combination of a large visual preview area (browser/device mock frame or high-fidelity UI snapshot) paired with structured technical details (project title, context, core technologies used, problem solved).
- Interactions: Restrained hover elevation (`translateY(-4px)`), smooth image zoom (`scale(1.02)`), and dynamic link reveal ("View Project / Case Details").

### 7.3 Services & Process
- Services: Clear client-focused offerings (Custom Web Design & Build, Responsive Frontend Development, E-Commerce Solutions, Performance & SEO Optimization).
- Process: 4-step structured methodology (1. Discovery & Strategy → 2. Wireframe & Design → 3. Development & Polish → 4. Launch & Support) to build client trust.

### 7.4 Skills & Tools
- Authentic SVG brand logos for industry standards (HTML5, CSS3, JavaScript ES6+, Git, Figma, modern tooling).
- Categorized logically (Development, Styling, Tools/Workflow).
- Clean pill/card badges with subtle hover state highlighting the tool's brand color tint or soft blue border.

### 7.5 Contact Section
- Dual avenue: Direct email link with one-click copy feedback + a clean, responsive inquiry form with validated inputs (Name, Email, Project Type, Message).
- Clear, honest turnaround statement (e.g., "Replies within 24 hours").

---

## 8. Motion & Micro-Interactions

- **Philosophy:** Purposeful, restrained, and smooth. Motion reinforces layout hierarchy rather than acting as a distraction.
- **Scroll Reveals:** Staggered fade-and-slide up transitions (`transform: translateY(16px)` to `0`, `opacity: 0` to `1`) using IntersectionObserver with `cubic-bezier(0.16, 1, 0.3, 1)` easing.
- **Hover Micro-Interactions:**
  - Buttons: Smooth background/shadow lift (`150ms–200ms ease`).
  - Cards: Subtle boundary glow via soft blue border transition.
  - Links: Animated underline expansion from left to right.
- **Accessibility (`prefers-reduced-motion`):**
  - Full override disabling all transforms and transitions when the user requests reduced motion:
    ```css
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
    ```

---

## 9. Responsive Breakpoints & Viewport Adaptations

| Viewport Range | Breakpoint | Layout Adaptations |
| :--- | :--- | :--- |
| **Mobile** | `< 640px` | Single-column stack. Floating navbar switches to compact bar + mobile toggle. Hero portrait scales proportionally below or above headline. CTAs stack full-width. |
| **Tablet** | `640px – 1024px` | Adjusted grid layouts (2 columns for services/projects). Hero maintains split layout with balanced text/image scaling. |
| **Desktop** | `> 1024px` | Full asymmetric split hero (60/40). Multi-column grids for projects and skills. Floating navbar centered max-width pill. |
| **Max Content Width** | `1200px` | Centered layout container preventing excessive line-lengths on ultra-wide displays. |

---

## 10. Accessibility & Quality Rules

1. **Contrast Compliance:** All text styles strictly meet or exceed WCAG AA requirements (`4.5:1` for regular text, `3:1` for large text). `#263746` against `#F4F7FB` and `#FFFFFF` provides `~10:1`.
2. **Keyboard Navigation:** High-contrast focus rings (`2px solid #8FC5F0` with `2px offset`) on all interactive buttons, links, inputs, and toggles.
3. **Semantic HTML5:** Native landmark elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
4. **Accessible Forms:** Explicit `<label>` elements linked to `<input>` and `<textarea>` with descriptive `aria-describedby` where error states are present.
5. **Screen Reader Support:** Skip-to-content link at top of document, appropriate `aria-label` for icon-only buttons (mobile menu, external links).
