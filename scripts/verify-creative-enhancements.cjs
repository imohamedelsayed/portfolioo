const fs = require('fs');

async function runVerification() {
  console.log('Connecting to Chrome CDP on port 9222...');
  const res = await fetch('http://127.0.0.1:9222/json/list');
  const pages = await res.json();
  const page = pages.find(p => p.type === 'page') || pages[0];
  if (!page || !page.webSocketDebuggerUrl) {
    throw new Error('No debugger URL found');
  }

  const ws = new WebSocket(page.webSocketDebuggerUrl);

  let idCounter = 1;
  const callbacks = new Map();

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = idCounter++;
      callbacks.set(id, (result) => {
        if (result && result.error) reject(result.error);
        else resolve(result);
      });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && callbacks.has(msg.id)) {
      callbacks.get(msg.id)(msg.result);
      callbacks.delete(msg.id);
    }
  };

  await new Promise((resolve) => (ws.onopen = resolve));
  console.log('Connected to page:', page.title);

  // Monitor console errors
  const consoleErrors = [];
  await send('Console.enable');
  await send('Runtime.enable');
  await send('Page.enable');

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Console.messageAdded' && msg.params.message.level === 'error') {
      consoleErrors.push(msg.params.message.text);
    }
    if (msg.id && callbacks.has(msg.id)) {
      callbacks.get(msg.id)(msg.result);
      callbacks.delete(msg.id);
    }
  };

  await send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }]
  });

  // Reload page fresh and ensure top scroll
  await send('Page.reload');
  await new Promise(r => setTimeout(r, 600));
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: 0, behavior: 'instant' });`
  });
  await new Promise(r => setTimeout(r, 800));

  console.log('\n======================================================');
  console.log('--- TEST 1: Hero Name Gradient & Typography (1440px) ---');
  console.log('======================================================');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1.5,
    mobile: false
  });
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: 0, behavior: 'instant' });`
  });
  await new Promise(r => setTimeout(r, 500));

  const heroNameCheck = await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.querySelector('.hero-name-display');
      if (!el) return { found: false };
      const s = window.getComputedStyle(el);
      return {
        found: true,
        text: el.textContent.trim(),
        ariaLabel: el.getAttribute('aria-label'),
        backgroundImage: s.backgroundImage,
        backgroundClip: s.backgroundClip || s.webkitBackgroundClip,
        webkitTextFillColor: s.webkitTextFillColor,
        color: s.color,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight
      };
    })()`,
    returnByValue: true
  });
  console.log('Hero Name Verification:', heroNameCheck.result.value);

  console.log('\n======================================================');
  console.log('--- TEST 2: Subtle Grid Texture, Lines & Ambient Drifting ---');
  console.log('======================================================');
  const heroDecorCheck = await send('Runtime.evaluate', {
    expression: `(() => {
      const grid = document.querySelector('.hero-grid-pattern');
      const lines = document.querySelector('.hero-flowing-lines');
      const path1 = document.querySelector('.flowing-line-path.path-1');
      const path2 = document.querySelector('.flowing-line-path.path-2');
      const edgeDiamond = document.querySelector('.hero-edge-diamond');
      const edgeDot1 = document.querySelector('.hero-edge-dot.dot-1');
      const shape1 = document.querySelector('.hero-ambient-shape.shape-1');

      const sGrid = grid ? window.getComputedStyle(grid) : null;
      const sPath1 = path1 ? window.getComputedStyle(path1) : null;
      const sPath2 = path2 ? window.getComputedStyle(path2) : null;
      const sEdgeDiamond = edgeDiamond ? window.getComputedStyle(edgeDiamond) : null;
      const sShape1 = shape1 ? window.getComputedStyle(shape1) : null;

      return {
        gridPresent: Boolean(grid),
        gridBgSize: sGrid?.backgroundSize,
        gridOpacity: sGrid?.opacity,
        gridMask: sGrid?.maskImage || sGrid?.webkitMaskImage,
        linesPresent: Boolean(lines),
        path1Animation: sPath1?.animationName,
        path2Animation: sPath2?.animationName,
        edgeDiamondAnimation: sEdgeDiamond?.animationName,
        ambientShape1Animation: sShape1?.animationName
      };
    })()`,
    returnByValue: true
  });
  console.log('Hero Background & Line Decorations:', heroDecorCheck.result.value);

  console.log('\n======================================================');
  console.log('--- TEST 3: Floating Geometric Decorations Around Portrait ---');
  console.log('======================================================');
  const floatingDecorCheck = await send('Runtime.evaluate', {
    expression: `(() => {
      const orb = document.querySelector('.hero-decor-orb');
      const diamond = document.querySelector('.hero-decor-diamond');
      const ring = document.querySelector('.hero-decor-ring');
      const constellation = document.querySelector('.hero-decor-constellation');
      return {
        orbAnimation: orb ? window.getComputedStyle(orb).animationName : null,
        diamondAnimation: diamond ? window.getComputedStyle(diamond).animationName : null,
        ringAnimation: ring ? window.getComputedStyle(ring).animationName : null,
        constellationAnimation: constellation ? window.getComputedStyle(constellation).animationName : null,
        pointerEvents: orb ? window.getComputedStyle(orb.parentElement).pointerEvents : null
      };
    })()`,
    returnByValue: true
  });
  console.log('Portrait Floating Decorations:', floatingDecorCheck.result.value);

  // Capture Hero Desktop Screenshot
  const heroScreenshot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/desktop_hero_enhanced.png', Buffer.from(heroScreenshot.data, 'base64'));
  console.log('Saved screenshot: screenshots/desktop_hero_enhanced.png');

  console.log('\n======================================================');
  console.log('--- TEST 4: Section Boundary Background Decorations ---');
  console.log('======================================================');
  const sectionBoundaryCheck = await send('Runtime.evaluate', {
    expression: `(() => {
      const aboutBoundary = document.querySelector('.boundary-about');
      const aboutGrid = document.querySelector('.grid-about');
      const aboutDiamond = document.querySelector('.boundary-about .shape-diamond-left');
      const aboutOrb = document.querySelector('.boundary-about .shape-orb-right');

      const projBoundary = document.querySelector('.boundary-projects');
      const projGrid = document.querySelector('.grid-projects');
      const projRing = document.querySelector('.boundary-projects .shape-ring-right');
      const projSphere = document.querySelector('.boundary-projects .shape-sphere-left');
      const projWave = document.querySelector('.boundary-line-wave');

      const servBoundary = document.querySelector('.boundary-services');
      const servGrid = document.querySelector('.grid-services');

      return {
        aboutBoundaryPresent: Boolean(aboutBoundary),
        aboutGridMask: aboutGrid ? (window.getComputedStyle(aboutGrid).maskImage || window.getComputedStyle(aboutGrid).webkitMaskImage) : null,
        aboutDiamondAnim: aboutDiamond ? window.getComputedStyle(aboutDiamond).animationName : null,
        aboutOrbAnim: aboutOrb ? window.getComputedStyle(aboutOrb).animationName : null,
        projBoundaryPresent: Boolean(projBoundary),
        projGridMask: projGrid ? (window.getComputedStyle(projGrid).maskImage || window.getComputedStyle(projGrid).webkitMaskImage) : null,
        projRingAnim: projRing ? window.getComputedStyle(projRing).animationName : null,
        projSphereAnim: projSphere ? window.getComputedStyle(projSphere).animationName : null,
        projWavePresent: Boolean(projWave),
        servBoundaryPresent: Boolean(servBoundary),
        servGridPresent: Boolean(servGrid)
      };
    })()`,
    returnByValue: true
  });
  console.log('Section Boundary Decorations:', sectionBoundaryCheck.result.value);

  // Scroll to About section and capture screenshot
  await send('Runtime.evaluate', {
    expression: `document.getElementById('about')?.scrollIntoView({ behavior: 'instant' });`
  });
  await new Promise(r => setTimeout(r, 400));
  const aboutScreenshot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/desktop_about_boundary.png', Buffer.from(aboutScreenshot.data, 'base64'));
  console.log('Saved screenshot: screenshots/desktop_about_boundary.png');

  console.log('\n======================================================');
  console.log('--- TEST 5: Cursor Trail Interaction ---');
  console.log('======================================================');
  for (let i = 0; i < 15; i++) {
    await send('Input.dispatchMouseEvent', {
      type: 'mouseMoved',
      x: 350 + i * 20,
      y: 280 + Math.sin(i / 2) * 25
    });
    await new Promise(r => setTimeout(r, 16));
  }

  const cursorTrailCheck = await send('Runtime.evaluate', {
    expression: `(() => {
      const canvas = document.querySelector('.cursor-trail-canvas');
      if (!canvas) return { canvasFound: false };
      const s = window.getComputedStyle(canvas);
      return {
        canvasFound: true,
        pointerEvents: s.pointerEvents,
        zIndex: s.zIndex,
        width: canvas.width,
        height: canvas.height
      };
    })()`,
    returnByValue: true
  });
  console.log('Cursor Trail Verification:', cursorTrailCheck.result.value);

  console.log('\n======================================================');
  console.log('--- TEST 6: Project Card Hover Interactions (Multiple Cards) ---');
  console.log('======================================================');
  await send('Runtime.evaluate', {
    expression: `document.getElementById('projects')?.scrollIntoView({ behavior: 'instant' });`
  });
  await new Promise(r => setTimeout(r, 500));

  // Inspect Card 0 (Pixel Store)
  const card0Target = await send('Runtime.evaluate', {
    expression: `(() => {
      const card = document.querySelectorAll('.project-entry-card')[0];
      const r = card.getBoundingClientRect();
      return {
        x: Math.round(r.left + r.width / 2),
        y: Math.round(r.top + r.height / 3),
        title: card.querySelector('.project-title')?.textContent?.trim()
      };
    })()`,
    returnByValue: true
  });
  console.log('Testing Project Card 0:', card0Target.result.value);

  await send('Input.dispatchMouseEvent', {
    type: 'mouseMoved',
    x: card0Target.result.value.x,
    y: card0Target.result.value.y
  });
  await new Promise(r => setTimeout(r, 350));

  const card0HoverCheck = await send('Runtime.evaluate', {
    expression: `(() => {
      const card = document.querySelectorAll('.project-entry-card')[0];
      const sCard = window.getComputedStyle(card);
      const mockup = card.querySelector('.project-mockup');
      const sMockup = mockup ? window.getComputedStyle(mockup) : null;
      const btn = card.querySelector('.explore-project-btn');
      const sBtn = btn ? window.getComputedStyle(btn) : null;
      const arrow = btn ? btn.querySelector('svg') : null;
      const sArrow = arrow ? window.getComputedStyle(arrow) : null;
      return {
        cardTransform: sCard.transform,
        cardBoxShadow: sCard.boxShadow,
        cardBorderColor: sCard.borderColor,
        mockupTransform: sMockup ? sMockup.transform : null,
        btnBackground: sBtn ? sBtn.backgroundColor : null,
        btnColor: sBtn ? sBtn.color : null,
        arrowTransform: sArrow ? sArrow.transform : null
      };
    })()`,
    returnByValue: true
  });
  console.log('Card 0 (Pixel Store) Hover Metrics:', card0HoverCheck.result.value);

  const card0Screenshot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/desktop_project_card_0_hover.png', Buffer.from(card0Screenshot.data, 'base64'));
  console.log('Saved screenshot: screenshots/desktop_project_card_0_hover.png');

  // Inspect Card 1 (Studio Lumina)
  await send('Runtime.evaluate', {
    expression: `(() => {
      const card = document.querySelectorAll('.project-entry-card')[1];
      if (card) card.scrollIntoView({ behavior: 'instant', block: 'center' });
    })()`
  });
  await new Promise(r => setTimeout(r, 400));

  const card1Target = await send('Runtime.evaluate', {
    expression: `(() => {
      const card = document.querySelectorAll('.project-entry-card')[1];
      const r = card.getBoundingClientRect();
      return {
        x: Math.round(r.left + r.width / 2),
        y: Math.round(r.top + r.height / 3),
        title: card.querySelector('.project-title')?.textContent?.trim()
      };
    })()`,
    returnByValue: true
  });
  console.log('\nTesting Project Card 1:', card1Target.result.value);

  await send('Input.dispatchMouseEvent', {
    type: 'mouseMoved',
    x: card1Target.result.value.x,
    y: card1Target.result.value.y
  });
  await new Promise(r => setTimeout(r, 350));

  const card1HoverCheck = await send('Runtime.evaluate', {
    expression: `(() => {
      const card = document.querySelectorAll('.project-entry-card')[1];
      const sCard = window.getComputedStyle(card);
      const mockup = card.querySelector('.project-mockup');
      const sMockup = mockup ? window.getComputedStyle(mockup) : null;
      const btn = card.querySelector('.explore-project-btn');
      const sBtn = btn ? window.getComputedStyle(btn) : null;
      const arrow = btn ? btn.querySelector('svg') : null;
      const sArrow = arrow ? window.getComputedStyle(arrow) : null;
      return {
        cardTransform: sCard.transform,
        cardBoxShadow: sCard.boxShadow,
        mockupTransform: sMockup ? sMockup.transform : null,
        btnBackground: sBtn ? sBtn.backgroundColor : null,
        btnColor: sBtn ? sBtn.color : null,
        arrowTransform: sArrow ? sArrow.transform : null
      };
    })()`,
    returnByValue: true
  });
  console.log('Card 1 (Studio Lumina) Hover Metrics:', card1HoverCheck.result.value);

  const card1Screenshot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/desktop_project_card_1_hover.png', Buffer.from(card1Screenshot.data, 'base64'));
  console.log('Saved screenshot: screenshots/desktop_project_card_1_hover.png');

  // Test Keyboard Focus on Project Card Action
  console.log('\n======================================================');
  console.log('--- TEST 7: Keyboard Focus Feedback ---');
  console.log('======================================================');
  const keyboardFocusCheck = await send('Runtime.evaluate', {
    expression: `(() => {
      const btn = document.querySelector('.explore-project-btn');
      btn.focus();
      const s = window.getComputedStyle(btn);
      return {
        isFocused: document.activeElement === btn,
        outlineStyle: s.outlineStyle,
        outlineColor: s.outlineColor
      };
    })()`,
    returnByValue: true
  });
  console.log('Keyboard Focus Verification:', keyboardFocusCheck.result.value);

  // Test Tablet Viewport (768px)
  console.log('\n======================================================');
  console.log('--- TEST 8: Tablet Viewport (768px) ---');
  console.log('======================================================');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 768,
    height: 1024,
    deviceScaleFactor: 2,
    mobile: false
  });
  await send('Runtime.evaluate', {
    expression: `document.getElementById('hero')?.scrollIntoView({ behavior: 'instant' });`
  });
  await new Promise(r => setTimeout(r, 500));

  const tabletOverflow = await send('Runtime.evaluate', {
    expression: `(() => {
      const docWidth = document.documentElement.scrollWidth;
      const winWidth = window.innerWidth;
      return { docWidth, winWidth, hasOverflow: docWidth > winWidth };
    })()`,
    returnByValue: true
  });
  console.log('Tablet 768px overflow check:', tabletOverflow.result.value);

  const tabletScreenshot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/tablet_768_enhanced.png', Buffer.from(tabletScreenshot.data, 'base64'));
  console.log('Saved screenshot: screenshots/tablet_768_enhanced.png');

  // Test Mobile Viewport (390px)
  console.log('\n======================================================');
  console.log('--- TEST 9: Mobile Viewport (390px) ---');
  console.log('======================================================');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    mobile: true
  });
  await send('Runtime.evaluate', {
    expression: `document.getElementById('hero')?.scrollIntoView({ behavior: 'instant' });`
  });
  await new Promise(r => setTimeout(r, 500));

  const mobileOverflow = await send('Runtime.evaluate', {
    expression: `(() => {
      const docWidth = document.documentElement.scrollWidth;
      const winWidth = window.innerWidth;
      return { docWidth, winWidth, hasOverflow: docWidth > winWidth };
    })()`,
    returnByValue: true
  });
  console.log('Mobile 390px overflow check:', mobileOverflow.result.value);

  const mobileScreenshot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/mobile_390_enhanced.png', Buffer.from(mobileScreenshot.data, 'base64'));
  console.log('Saved screenshot: screenshots/mobile_390_enhanced.png');

  // Test Reduced Motion
  console.log('\n======================================================');
  console.log('--- TEST 10: Reduced Motion Safeguards ---');
  console.log('======================================================');
  await send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: 'reduce' }]
  });
  await send('Page.reload');
  await new Promise(r => setTimeout(r, 1000));

  const reducedMotionCheck = await send('Runtime.evaluate', {
    expression: `(() => {
      const orb = document.querySelector('.hero-decor-orb');
      const canvas = document.querySelector('.cursor-trail-canvas');
      const path1 = document.querySelector('.flowing-line-path.path-1');
      const aboutDiamond = document.querySelector('.boundary-about .shape-diamond-left');
      const sOrb = orb ? window.getComputedStyle(orb) : null;
      const sCanvas = canvas ? window.getComputedStyle(canvas) : null;
      const sPath1 = path1 ? window.getComputedStyle(path1) : null;
      const sAboutDiamond = aboutDiamond ? window.getComputedStyle(aboutDiamond) : null;
      return {
        orbAnimationNone: sOrb ? sOrb.animationName === 'none' : true,
        canvasHidden: sCanvas ? sCanvas.display === 'none' : true,
        pathAnimationNone: sPath1 ? sPath1.animationName === 'none' : true,
        aboutDiamondAnimNone: sAboutDiamond ? sAboutDiamond.animationName === 'none' : true
      };
    })()`,
    returnByValue: true
  });
  console.log('Reduced Motion Verification:', reducedMotionCheck.result.value);

  console.log('\n======================================================');
  console.log('--- TEST 11: Console Errors Check ---');
  console.log('======================================================');
  console.log('Console Errors count:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error('Console errors:', consoleErrors);
  }

  ws.close();
  console.log('\nAll comprehensive enhancement tests completed successfully!');
}

runVerification().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
