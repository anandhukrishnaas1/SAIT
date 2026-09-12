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
  delay = 0.08,
  staggerMs = 24,
  ...props
}) => {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timer = null;

    const doReveal = () => {
      timer = setTimeout(() => {
        setRevealed(true);
      }, 40);
    };

    const isElementInViewport = () => {
      const rect = el.getBoundingClientRect();
      return rect.height > 0 && rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
    };

    // If currently visible in viewport (e.g. Hero on load or section on page refresh), animate!
    if (isElementInViewport()) {
      doReveal();
      return () => {
        if (timer) clearTimeout(timer);
      };
    }

    // IntersectionObserver for scroll reveal
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          doReveal();
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);

    // Watch for ancestor becoming visible (e.g. main-site-wrapper removing site-content-hidden after intro)
    const siteWrapper = el.closest('.main-site-wrapper') || document.querySelector('.main-site-wrapper');
    let mutObs = null;
    if (siteWrapper) {
      mutObs = new MutationObserver(() => {
        if (!siteWrapper.classList.contains('site-content-hidden')) {
          if (isElementInViewport()) {
            doReveal();
            observer.disconnect();
            if (mutObs) mutObs.disconnect();
          }
        }
      });
      mutObs.observe(siteWrapper, { attributes: true, attributeFilter: ['class'] });
    }

    return () => {
      observer.disconnect();
      if (mutObs) mutObs.disconnect();
      if (timer) clearTimeout(timer);
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
                    '--char-delay': `${charDelay.toFixed(3)}s`,
                    transitionDelay: `${charDelay.toFixed(3)}s`,
                    animationDelay: `${charDelay.toFixed(3)}s`,
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
