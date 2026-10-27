const fs = require('fs');

let css = fs.readFileSync('src/styles/main.formatted.tmp.css', 'utf8');

// Update Hero padding
css = css.replace(
  /\.hero-section\s*\{[^}]*\}/,
  `.hero-section {
  position: relative;
  padding-top: clamp(3.75rem, 5.5vw, 5rem);
  padding-bottom: clamp(2rem, 3.2vw, 3rem);
  overflow: hidden;
  background-color: var(--bg-main);
}`
);

// Update hero-grid desktop columns
css = css.replace(
  /grid-template-columns:1fr 1\.15fr;\s*gap:clamp\(2rem,3\.5vw,3\.75rem\);/,
  `grid-template-columns: 1fr 1.2fr;\n  gap: clamp(2rem, 3.5vw, 4rem);`
);

// Update hero-name-display gradient and properties
css = css.replace(
  /\.hero-name-display\s*\{[^}]*\}/,
  `.hero-name-display {
  font-family: var(--font-display);
  font-size: clamp(2.6rem, 5.2vw, 4.4rem);
  font-weight: 800;
  line-height: 1.14;
  letter-spacing: -0.035em;
  margin-bottom: 0.85rem;
  background: linear-gradient(135deg, #4A93D8 0%, #2068BA 52%, #143B68 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: #143B68;
  display: inline-block;
  padding-top: 0.06em;
  padding-bottom: 0.12em;
  padding-right: 0.05em;
  overflow: visible;
  animation: heroFadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.05s backwards;
}`
);

// Update portrait-wrapper max-width
css = css.replace(
  /max-width:700px;/,
  'max-width: 720px;'
);

// Update hero-portrait-img max-height
css = css.replace(
  /max-height:740px;/,
  'max-height: 750px;'
);

// Update tablet portrait max-width
css = css.replace(
  /\.portrait-wrapper\s*\{\s*max-width:490px;\s*margin:1\.5rem auto 0\s*\}/,
  `.portrait-wrapper {
  max-width: 520px;
  margin: 1.5rem auto 0;
}`
);

// Update mobile portrait max-width
css = css.replace(
  /\.portrait-wrapper\s*\{\s*max-width:370px\s*\}/,
  `.portrait-wrapper {
  max-width: 390px;
}`
);

// Update skills-section styling
css = css.replace(
  /\.skills-section\s*\{[^}]*\}/,
  `.skills-section {
  background: linear-gradient(180deg, #F4F7FB 0%, #EBF2F9 100%);
  overflow: hidden;
  padding-top: clamp(4rem, 6vw, 5.5rem);
  padding-bottom: clamp(4.5rem, 7vw, 6.5rem);
  border-bottom: 1px solid rgba(38, 55, 70, 0.12);
  position: relative;
}`
);

fs.writeFileSync('src/styles/main.css', css, 'utf8');
console.log('Successfully wrote src/styles/main.css, line count:', css.split('\n').length);
