import { useEffect } from 'react';

/**
 * useScrollReveal - attaches an IntersectionObserver to every
 * .reveal and .reveal-stagger element in the document and adds
 * the .is-revealed class when they enter the viewport.
 *
 * Safe fallback for Firefox which lacks CSS scroll-driven animations.
 */
export function useScrollReveal() {
  useEffect(() => {
    const observe = (el, obs) => {
      // Already revealed (e.g. already in viewport on mount)
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        el.classList.add('is-revealed');
      } else {
        obs.observe(el);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -36px 0px' }
    );

    const attach = () => {
      document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => {
        if (!el.classList.contains('is-revealed')) {
          observe(el, observer);
        }
      });
    };

    attach();

    // Watch for new elements added by React
    const mutObs = new MutationObserver(attach);
    mutObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutObs.disconnect();
    };
  }, []);
}


