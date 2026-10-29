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

  await send('Console.enable');
  await send('Page.enable');
  await send('Runtime.enable');

  await send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }]
  });

  await send('Page.reload');
  await new Promise(r => setTimeout(r, 1200));

  console.log('\n--- TEST 1: 1440px Desktop Viewport ---');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1.5,
    mobile: false
  });

  // Scroll into view
  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('skills');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    })()`
  });

  await new Promise(r => setTimeout(r, 1200));

  const domInspection = await send('Runtime.evaluate', {
    expression: `(() => {
      const skillsSection = document.getElementById('skills');
      const heading = skillsSection.querySelector('#skills-heading')?.textContent?.trim();
      const subtitle = skillsSection.querySelector('.section-subtitle')?.textContent?.trim();
      
      const primaryGroup = skillsSection.querySelector('.skills-marquee-group');
      const primaryItems = Array.from(primaryGroup.querySelectorAll('.tech-showcase-item'));
      const accessibleItems = primaryItems.filter(item => item.getAttribute('tabindex') === '0');
      
      const techNames = accessibleItems.map(item => item.getAttribute('aria-label') || item.querySelector('.tech-tooltip')?.textContent?.trim());
      
      const svgs = Array.from(skillsSection.querySelectorAll('.tech-logo-wrapper svg')).map((svg, i) => {
        const rect = svg.getBoundingClientRect();
        return {
          index: i,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          hasPaths: svg.querySelectorAll('path, rect').length > 0
        };
      });

      return {
        heading,
        subtitle,
        accessibleCount: accessibleItems.length,
        techNames,
        totalSvgCount: svgs.length,
        first8SvgDimensions: svgs.slice(0, 8)
      };
    })()`,
    returnByValue: true
  });

  console.log('Heading:', domInspection.result.value.heading);
  console.log('Subtitle:', domInspection.result.value.subtitle);
  console.log('Accessible Items Count:', domInspection.result.value.accessibleCount);
  console.log('Technologies in exact order:', domInspection.result.value.techNames);
  console.log('First 8 SVG dimensions:', domInspection.result.value.first8SvgDimensions);

  const screenshot1440 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/desktop_marquee_1440.png', Buffer.from(screenshot1440.data, 'base64'));
  console.log('Saved screenshot: screenshots/desktop_marquee_1440.png');

  // Verify Marquee Movement
  console.log('\n--- TEST 2: Marquee Horizontal Continuous Movement ---');
  const pos1 = await send('Runtime.evaluate', {
    expression: `document.querySelector('.skills-marquee-track').getBoundingClientRect().left`,
    returnByValue: true
  });
  await new Promise(r => setTimeout(r, 1200));
  const pos2 = await send('Runtime.evaluate', {
    expression: `document.querySelector('.skills-marquee-track').getBoundingClientRect().left`,
    returnByValue: true
  });
  const moved = Math.abs(pos1.result.value - pos2.result.value) > 5;
  console.log(`Track left at t0: ${pos1.result.value.toFixed(2)}px, at t+1.2s: ${pos2.result.value.toFixed(2)}px. Movement verified: ${moved}`);

  // Test Hover Tooltip & Marquee Pause
  console.log('\n--- TEST 3: Hover Tooltip & Marquee Pause ---');
  // Find currently visible logo on screen to hover on
  const hoverTarget = await send('Runtime.evaluate', {
    expression: `(() => {
      const items = Array.from(document.querySelectorAll('.tech-showcase-item'));
      // Find item near center of viewport
      const centerItem = items.find(it => {
        const r = it.getBoundingClientRect();
        return r.left > 300 && r.right < 1100;
      }) || items[0];
      
      const techName = centerItem.getAttribute('aria-label') || centerItem.querySelector('.tech-tooltip')?.textContent?.trim();
      const r = centerItem.getBoundingClientRect();
      return {
        techName,
        x: Math.round(r.left + r.width / 2),
        y: Math.round(r.top + r.height / 2)
      };
    })()`,
    returnByValue: true
  });

  console.log('Hovering over item:', hoverTarget.result.value);

  // Dispatch mouse move to hover center of this item
  await send('Input.dispatchMouseEvent', {
    type: 'mouseMoved',
    x: hoverTarget.result.value.x,
    y: hoverTarget.result.value.y
  });

  // Wait 300ms for transition
  await new Promise(r => setTimeout(r, 300));

  const hoverVerification = await send('Runtime.evaluate', {
    expression: `(() => {
      const activeTooltip = Array.from(document.querySelectorAll('.tech-tooltip')).find(tt => {
        const s = window.getComputedStyle(tt);
        return parseFloat(s.opacity) > 0.5 && s.visibility === 'visible';
      });
      const track = document.querySelector('.skills-marquee-track');
      const isPaused = window.getComputedStyle(track).animationPlayState === 'paused' || track.classList.contains('is-paused');
      return {
        hasVisibleTooltip: Boolean(activeTooltip),
        tooltipText: activeTooltip?.textContent?.trim(),
        isMarqueePaused: isPaused
      };
    })()`,
    returnByValue: true
  });
  console.log('Hover verification result:', hoverVerification.result.value);

  const screenshotHover = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/desktop_marquee_hover.png', Buffer.from(screenshotHover.data, 'base64'));
  console.log('Saved screenshot: screenshots/desktop_marquee_hover.png');

  // Move mouse away
  await send('Input.dispatchMouseEvent', {
    type: 'mouseMoved',
    x: 10,
    y: 10
  });
  await new Promise(r => setTimeout(r, 200));

  // Test 1024px Laptop
  console.log('\n--- TEST 4: 1024px Laptop Viewport ---');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1024,
    height: 768,
    deviceScaleFactor: 1.5,
    mobile: false
  });
  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('skills');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    })()`
  });
  await new Promise(r => setTimeout(r, 600));
  const screenshot1024 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/laptop_marquee_1024.png', Buffer.from(screenshot1024.data, 'base64'));
  console.log('Saved screenshot: screenshots/laptop_marquee_1024.png');

  // Test 768px Tablet
  console.log('\n--- TEST 5: 768px Tablet Viewport ---');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 768,
    height: 1024,
    deviceScaleFactor: 2,
    mobile: false
  });
  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('skills');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    })()`
  });
  await new Promise(r => setTimeout(r, 600));
  const screenshot768 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/tablet_marquee_768.png', Buffer.from(screenshot768.data, 'base64'));
  console.log('Saved screenshot: screenshots/tablet_marquee_768.png');

  // Test 375px Mobile Viewport
  console.log('\n--- TEST 6: 375px Mobile Viewport ---');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 375,
    height: 812,
    deviceScaleFactor: 2,
    mobile: true
  });
  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('skills');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    })()`
  });
  await new Promise(r => setTimeout(r, 600));

  const overflowCheck = await send('Runtime.evaluate', {
    expression: `(() => {
      const docWidth = document.documentElement.scrollWidth;
      const winWidth = window.innerWidth;
      const hasHorizontalScrollbar = docWidth > winWidth;
      return { docWidth, winWidth, hasHorizontalScrollbar };
    })()`,
    returnByValue: true
  });
  console.log('Mobile 375px overflow check:', overflowCheck.result.value);

  // Mobile tap-to-reveal on a visible item
  const mobileTap = await send('Runtime.evaluate', {
    expression: `(() => {
      const visibleItem = Array.from(document.querySelectorAll('.skills-marquee-group .tech-showcase-item[tabindex="0"]'))
        .find(it => {
          const r = it.getBoundingClientRect();
          return r.left >= 0 && r.right <= window.innerWidth;
        });
      if (visibleItem) {
        visibleItem.click();
        const tooltip = visibleItem.querySelector('.tech-tooltip');
        return {
          clicked: true,
          label: visibleItem.getAttribute('aria-label'),
          tooltipText: tooltip?.textContent?.trim()
        };
      }
      return { clicked: false };
    })()`,
    returnByValue: true
  });
  console.log('Mobile tap-to-reveal result:', mobileTap.result.value);

  const screenshot375 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/mobile_marquee_375.png', Buffer.from(screenshot375.data, 'base64'));
  console.log('Saved screenshot: screenshots/mobile_marquee_375.png');

  // Test 360px Narrow Mobile
  console.log('\n--- TEST 7: 360px Narrow Mobile ---');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 360,
    height: 740,
    deviceScaleFactor: 2,
    mobile: true
  });
  await new Promise(r => setTimeout(r, 400));
  const narrowOverflow = await send('Runtime.evaluate', {
    expression: `(() => {
      const docWidth = document.documentElement.scrollWidth;
      const winWidth = window.innerWidth;
      return { docWidth, winWidth, hasOverflow: docWidth > winWidth };
    })()`,
    returnByValue: true
  });
  console.log('Narrow 360px overflow check:', narrowOverflow.result.value);

  // Test Reduced Motion
  console.log('\n--- TEST 8: Prefers Reduced Motion ---');
  await send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: 'reduce' }]
  });
  await send('Page.reload');
  await new Promise(r => setTimeout(r, 1200));
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1.5,
    mobile: false
  });
  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('skills');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    })()`
  });
  await new Promise(r => setTimeout(r, 600));

  const reducedMotionCheck = await send('Runtime.evaluate', {
    expression: `(() => {
      const track = document.querySelector('.skills-marquee-track');
      const trackStyle = window.getComputedStyle(track);
      const isAnimationNone = trackStyle.animationName === 'none' || trackStyle.animationDuration === '0s';
      const visibleLogos = Array.from(document.querySelectorAll('.tech-showcase-item'))
        .filter(el => {
          const style = window.getComputedStyle(el);
          return style.display !== 'none' && style.visibility !== 'hidden' && parseFloat(style.opacity) > 0;
        });
      return {
        trackAnimationName: trackStyle.animationName,
        isAnimationNone,
        visibleLogosCount: visibleLogos.length
      };
    })()`,
    returnByValue: true
  });
  console.log('Reduced motion check:', reducedMotionCheck.result.value);

  const screenshotReducedMotion = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/marquee_reduced_motion.png', Buffer.from(screenshotReducedMotion.data, 'base64'));
  console.log('Saved screenshot: screenshots/marquee_reduced_motion.png');

  // Test Scroll Replay
  console.log('\n--- TEST 9: Scroll Exit & Re-entry Replay ---');
  await send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }]
  });
  await send('Page.reload');
  await new Promise(r => setTimeout(r, 1000));

  await send('Runtime.evaluate', { expression: `window.scrollTo(0, 0)` });
  await new Promise(r => setTimeout(r, 600));

  const replayTest = await send('Runtime.evaluate', {
    expression: `(() => {
      const skills = document.getElementById('skills');
      skills.scrollIntoView({ behavior: 'instant' });
      return { scrolled: true };
    })()`,
    returnByValue: true
  });
  console.log('Re-entered skills section:', replayTest.result.value);
  await new Promise(r => setTimeout(r, 800));

  const trackStillMoving = await send('Runtime.evaluate', {
    expression: `(() => {
      const track = document.querySelector('.skills-marquee-track');
      return {
        hasAnimation: window.getComputedStyle(track).animationName === 'marqueeScroll',
        isVisibleClass: document.getElementById('skills').classList.contains('is-visible')
      };
    })()`,
    returnByValue: true
  });
  console.log('Scroll re-entry check:', trackStillMoving.result.value);

  ws.close();
  console.log('\nAll tests completed successfully!');
}

runVerification().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
