// useReveal.js
import { useEffect } from "react";

/**
 * useReveal - attach 'reveal' effect to elements with data-reveal attribute
 * Adds 'is-revealed' class when element intersects viewport.
 * Optional data-delay attribute can stagger animations.
 */
export default function useReveal(rootMargin = "0px 0px -10% 0px") {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            const delay = el.getAttribute("data-delay") || 0;
            // add small timeout to allow staggering
            setTimeout(() => el.classList.add("is-revealed"), Number(delay));
            io.unobserve(el);
          }
        });
      },
      { root: null, rootMargin, threshold: 0.12 }
    );

    els.forEach((el, idx) => {
      // gentle built-in stagger if none provided
      if (!el.hasAttribute("data-delay")) el.setAttribute("data-delay", idx * 80);
      io.observe(el);
    });

    return () => io.disconnect();
  }, [rootMargin]);
}
