import React, { useRef, useEffect, useState } from 'react';

/**
 * LetterReveal - Kinetic typography component for mobile & desktop scroll.
 * Splits text into words and letters, animating them in one by one
 * with an ultra-catchy 3D entrance and landing shimmer when scrolled into view.
 */
export const LetterReveal = ({
  children,
  className = '',
  as: Component = 'span',
  delay = 0,
  staggerMs = 22,
  ...props
}) => {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Instantly reveal if inside an on-demand revealed section
    if (el.closest('.on-demand-revealed-section') || el.closest('#interview-roadmaps') || el.closest('#resources')) {
      setRevealed(true);
      return;
    }

    // Check if element or parent section is already in viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
      setRevealed(true);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    );

    observer.observe(el);

    // Also observe ancestor .reveal container if present
    const parentReveal = el.closest('.reveal, .reveal-stagger');
    let mutObs = null;
    if (parentReveal) {
      if (parentReveal.classList.contains('is-revealed')) {
        setRevealed(true);
      } else {
        mutObs = new MutationObserver(() => {
          if (parentReveal.classList.contains('is-revealed')) {
            setRevealed(true);
            if (mutObs) mutObs.disconnect();
          }
        });
        mutObs.observe(parentReveal, { attributes: true, attributeFilter: ['class'] });
      }
    }

    return () => {
      observer.disconnect();
      if (mutObs) mutObs.disconnect();
    };
  }, []);

  let charCounter = 0;

  const renderContent = (node, keyPrefix = 'root') => {
    if (typeof node === 'string' || typeof node === 'number') {
      const text = String(node);
      const words = text.split(/(\s+)/);

      return words.map((word, wIdx) => {
        if (/^\s+$/.test(word)) {
          return (
            <span key={`${keyPrefix}-sp-${wIdx}`} className="letter-space">
              {' '}
            </span>
          );
        }

        return (
          <span key={`${keyPrefix}-w-${wIdx}`} className="letter-word">
            {Array.from(word).map((char, cIdx) => {
              const idx = charCounter++;
              const charDelay = delay + idx * (staggerMs / 1000);

              return (
                <span
                  key={`${keyPrefix}-c-${idx}`}
                  className="letter-char"
                  style={{
                    '--char-idx': idx,
                    transitionDelay: `${charDelay.toFixed(3)}s`,
                    animationDelay: `${(charDelay + 0.12).toFixed(3)}s`,
                  }}
                >
                  {char}
                </span>
              );
            })}
          </span>
        );
      });
    }

    if (React.isValidElement(node)) {
      if (!node.props.children) {
        return node;
      }

      return React.cloneElement(node, {
        key: node.key || `${keyPrefix}-elem-${charCounter}`,
        children: React.Children.map(node.props.children, (child, idx) =>
          renderContent(child, `${keyPrefix}-sub-${idx}`)
        ),
      });
    }

    return node;
  };

  return (
    <Component
      ref={ref}
      className={`letter-reveal-wrap ${revealed ? 'is-revealed' : ''} ${className}`}
      {...props}
    >
      {React.Children.map(children, (child, idx) => renderContent(child, `c-${idx}`))}
    </Component>
  );
};
