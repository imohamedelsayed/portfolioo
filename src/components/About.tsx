import React, { useState, useEffect, useRef } from 'react';

const aboutParagraphs = [
  "I build complete websites from the ground up, handling both visual direction and frontend implementation. Rather than treating design and development as disconnected phases, I focus on how layout, typography, interaction, and code structure inform one another to create cohesive digital products.",
  "A successful website needs to look intentional, but it also has to work reliably. I pay close attention to the fundamentals: semantic HTML for accessibility and search visibility, well-structured CSS for fluid responsiveness across devices, and performant logic that keeps page loads fast on mobile networks.",
  "My work centers on individuals, founders, and startups who need a distinct online presence without the bloat of unnecessary frameworks or generic templates. Every website is built with purpose, structured for real users, and engineered to remain clean and maintainable over time."
];

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentPIndex, setCurrentPIndex] = useState(0);
  const [charCounts, setCharCounts] = useState<number[]>([0, 0, 0]);
  const hasTriggeredRef = useRef(false);

  // Trigger typewriter on website load or when section enters view (whichever is earlier)
  useEffect(() => {
    const startTyping = () => {
      if (!hasTriggeredRef.current) {
        hasTriggeredRef.current = true;
        setHasStarted(true);
      }
    };

    // Auto-start on load with a brief initial delay
    const loadTimer = setTimeout(() => {
      startTyping();
    }, 300);

    // Also observe intersection so if user scrolls directly, it triggers immediately
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          startTyping();
          observer.disconnect();
        }
      },
      {
        threshold: 0.05,
        rootMargin: '100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      clearTimeout(loadTimer);
      observer.disconnect();
    };
  }, []);

  // Typewriter ticker: advances character count smoothly without layout shift
  useEffect(() => {
    if (!hasStarted || isCompleted) return;

    const interval = setInterval(() => {
      setCharCounts((prev) => {
        const next = [...prev];
        const targetLen = aboutParagraphs[currentPIndex].length;
        // Advance 2 characters per 18ms tick (~110 chars/sec) for a readable, polished pace
        const nextCount = Math.min(next[currentPIndex] + 2, targetLen);
        next[currentPIndex] = nextCount;

        if (nextCount >= targetLen) {
          if (currentPIndex < aboutParagraphs.length - 1) {
            setCurrentPIndex((idx) => idx + 1);
          } else {
            setIsCompleted(true);
            clearInterval(interval);
          }
        }
        return next;
      });
    }, 18);

    return () => clearInterval(interval);
  }, [hasStarted, isCompleted, currentPIndex]);

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="section about-section" 
      aria-labelledby="about-heading"
    >
      <div className="container">
        <div className="about-unified-content">
          <h2 id="about-heading" className="section-title">
            About
          </h2>

          {/* Accessible screen-reader text: guarantees full content is immediately read by assistive tech */}
          <div className="sr-only">
            {aboutParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="about-text-body">
            {aboutParagraphs.map((text, idx) => {
              // When animation is complete or reduced motion is active, render stable paragraph
              if (isCompleted) {
                return (
                  <div key={idx} className="about-paragraph-wrapper">
                    <p className="about-p-stable">{text}</p>
                  </div>
                );
              }

              // During animation, render a hidden ghost paragraph to reserve 100% exact layout space (0 layout shift)
              // and a visible animated typing layer on top.
              const visibleLength = charCounts[idx];
              const displayedText = text.slice(0, visibleLength);
              const isTypingThis = hasStarted && currentPIndex === idx && !isCompleted;

              return (
                <div key={idx} className="about-paragraph-wrapper" aria-hidden="true">
                  {/* Layout spacer: preserves full height & wrapping at all times */}
                  <p className="about-p-ghost">{text}</p>

                  {/* Animated typing layer */}
                  <p className="about-p-animated">
                    {displayedText}
                    {isTypingThis && (
                      <span className="typewriter-cursor" aria-hidden="true" />
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
