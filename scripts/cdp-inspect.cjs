const fs = require('fs');

async function main() {
  console.log('Connecting to Chrome CDP on port 9222...');
  const res = await fetch('http://127.0.0.1:9222/json/list');
  const pages = await res.json();
  const page = pages.find(p => p.type === 'page') || pages[0];
  if (!page || !page.webSocketDebuggerUrl) {
    console.error('No debugger URL found');
    return;
  }

  const ws = new WebSocket(page.webSocketDebuggerUrl);

  let idCounter = 1;
  const callbacks = new Map();

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const id = idCounter++;
      callbacks.set(id, resolve);
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

  // Set prefers-reduced-motion to no-preference to test realistic user motion
  await send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }]
  });

  // Reload the page to test fresh load animations
  await send('Page.reload');
  await new Promise(r => setTimeout(r, 1000));

  // 1. Desktop full viewport (1440x900)
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1.5,
    mobile: false
  });

  await new Promise(r => setTimeout(r, 600));
  const desktopHero = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/desktop_v2_hero.png', Buffer.from(desktopHero.data, 'base64'));
  console.log('Saved screenshots/desktop_v2_hero.png');

  // Scroll to About section and capture during typewriter effect
  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('about');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    })()`
  });
  // Wait 1.0s to capture typewriter in mid-typing state with cursor
  await new Promise(r => setTimeout(r, 1000));
  const desktopAboutTyping = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/desktop_v2_about_typing.png', Buffer.from(desktopAboutTyping.data, 'base64'));
  console.log('Saved screenshots/desktop_v2_about_typing.png');

  // Wait another 3s for typewriter animation to complete and stabilize
  await new Promise(r => setTimeout(r, 3000));
  const desktopAboutStable = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/desktop_v2_about.png', Buffer.from(desktopAboutStable.data, 'base64'));
  console.log('Saved screenshots/desktop_v2_about.png');

  // Scroll to Skills section
  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('skills');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    })()`
  });
  await new Promise(r => setTimeout(r, 1000));
  const desktopSkills = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/desktop_v2_skills.png', Buffer.from(desktopSkills.data, 'base64'));
  console.log('Saved screenshots/desktop_v2_skills.png');

  // Capture boundary between Skills and Contact
  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('skills');
      if (el) {
        const rect = el.getBoundingClientRect();
        window.scrollBy({ top: rect.bottom - 400, behavior: 'instant' });
      }
    })()`
  });
  await new Promise(r => setTimeout(r, 600));
  const desktopSkillsContactBoundary = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/desktop_v2_skills_contact.png', Buffer.from(desktopSkillsContactBoundary.data, 'base64'));
  console.log('Saved screenshots/desktop_v2_skills_contact.png');

  // 2. Tablet Viewport (768x1024)
  await send('Emulation.setDeviceMetricsOverride', {
    width: 768,
    height: 1024,
    deviceScaleFactor: 2,
    mobile: false
  });
  await send('Runtime.evaluate', { expression: `window.scrollTo(0, 0)` });
  await new Promise(r => setTimeout(r, 600));
  const tabletHero = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/tablet_v2_hero.png', Buffer.from(tabletHero.data, 'base64'));
  console.log('Saved screenshots/tablet_v2_hero.png');

  // Tablet Skills section
  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('skills');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    })()`
  });
  await new Promise(r => setTimeout(r, 600));
  const tabletSkills = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/tablet_v2_skills.png', Buffer.from(tabletSkills.data, 'base64'));
  console.log('Saved screenshots/tablet_v2_skills.png');

  // 3. Mobile Viewport (375x812)
  await send('Emulation.setDeviceMetricsOverride', {
    width: 375,
    height: 812,
    deviceScaleFactor: 2,
    mobile: true
  });

  await send('Runtime.evaluate', { expression: `window.scrollTo(0, 0)` });
  await new Promise(r => setTimeout(r, 600));
  const mobileHero = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/mobile_v2_hero.png', Buffer.from(mobileHero.data, 'base64'));
  console.log('Saved screenshots/mobile_v2_hero.png');

  // Mobile Skills section
  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('skills');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    })()`
  });
  await new Promise(r => setTimeout(r, 800));
  const mobileSkills = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/mobile_v2_skills.png', Buffer.from(mobileSkills.data, 'base64'));
  console.log('Saved screenshots/mobile_v2_skills.png');

  ws.close();
}

main().catch(console.error);
