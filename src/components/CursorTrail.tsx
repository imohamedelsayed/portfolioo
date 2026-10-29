import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  time: number;
}

export const CursorTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointsRef = useRef<Point[]>([]);
  const isMovingRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    // 1. Accessibility & Device Checks: Disable on touch, coarse pointers, or reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerFine = window.matchMedia('(pointer: fine)');

    if (prefersReducedMotion.matches || !pointerFine.matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // Render loop
    const render = (now: number) => {
      if (!ctx || !canvas) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      // Keep only points from the last 200ms for a restrained, short signature trail
      const maxAge = 200;
      pointsRef.current = pointsRef.current.filter((p) => now - p.time < maxAge);

      const points = pointsRef.current;

      if (points.length > 1) {
        // Draw delicate smooth trail
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];
          const ageRatio = (now - p1.time) / maxAge; // 0 (new) to 1 (old)
          const alpha = Math.max(0, (1 - ageRatio) * 0.42);
          const lineWidth = Math.max(0.5, (1 - ageRatio) * 3.2);

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(143, 197, 240, ${alpha})`;
          ctx.lineWidth = lineWidth;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        }

        // Draw subtle soft glow at current cursor head
        const head = points[0];
        const headAlpha = Math.max(0, (1 - (now - head.time) / maxAge) * 0.5);
        if (headAlpha > 0.05) {
          const grad = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 8);
          grad.addColorStop(0, `rgba(143, 197, 240, ${headAlpha})`);
          grad.addColorStop(0.5, `rgba(40, 120, 204, ${headAlpha * 0.4})`);
          grad.addColorStop(1, 'rgba(143, 197, 240, 0)');

          ctx.beginPath();
          ctx.arc(head.x, head.y, 8, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        rafIdRef.current = requestAnimationFrame(render);
      } else {
        // All points faded; sleep rAF until next pointer move to save resources
        isMovingRef.current = false;
        rafIdRef.current = null;
      }
    };

    const startAnimation = () => {
      if (!isMovingRef.current) {
        isMovingRef.current = true;
        rafIdRef.current = requestAnimationFrame(render);
      }
    };

    // Pointer move handler
    const onPointerMove = (e: PointerEvent) => {
      // Ignore simulated or touch events
      if (e.pointerType === 'touch') return;

      const now = performance.now();
      // Throttle points to at most one every 12ms for smooth curve without memory buildup
      if (now - lastTimeRef.current > 12) {
        pointsRef.current.unshift({ x: e.clientX, y: e.clientY, time: now });
        lastTimeRef.current = now;
        startAnimation();
      }
    };

    const onPointerLeave = () => {
      // Fade out trail when pointer leaves window
      pointsRef.current.forEach((p) => {
        p.time = performance.now() - 150;
      });
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeave);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="cursor-trail-canvas"
      aria-hidden="true"
    />
  );
};
export default CursorTrail;
