import { useEffect, useRef, useState } from 'react';

interface UseScrollReplayOptions {
  threshold?: number;
  rootMargin?: string;
  onEnter?: () => void;
  onLeave?: () => void;
}

/**
 * Reusable scroll intersection hook that handles coordinated entrance animations
 * and automatically resets and replays them whenever sections enter or leave the viewport.
 * 
 * Fully respects prefers-reduced-motion: reduce by immediately setting visible state
 * without animation delays or scroll observers.
 */
export function useScrollReplay<T extends HTMLElement = HTMLElement>(
  options: UseScrollReplayOptions = {}
) {
  const {
    threshold = 0.08,
    rootMargin = '0px 0px -40px 0px',
    onEnter,
    onLeave
  } = options;

  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [replayCount, setReplayCount] = useState(0);

  useEffect(() => {
    // 1. Accessibility: Check for prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    // 2. Safe fallback if IntersectionObserver is unsupported in legacy browser
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    // 3. Create observer that toggles visibility on enter AND exit
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setReplayCount((prev) => prev + 1);
            onEnter?.();
          } else {
            // When section leaves viewport, reset to initial state so it replays upon return
            setIsVisible(false);
            onLeave?.();
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, onEnter, onLeave]);

  return { ref, isVisible, replayCount };
}
