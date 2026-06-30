"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DUR, EASE, RISE, REVEAL_START, STAGGER } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Unified scroll-reveal engine for the whole site.
 *
 * Every element marked `[data-reveal]` fades + rises once as it enters the
 * viewport, batched so siblings revealing together share a single staggered
 * tween. This replaces the old IntersectionObserver/CSS system so all reveals
 * share one easing/timing vocabulary (see lib/motion.ts).
 *
 * Renders nothing — it only wires up GSAP after mount.
 */
export default function MotionLayer() {
  useEffect(() => {
    document.documentElement.classList.add("js");
    gsap.defaults({ ease: EASE, duration: DUR.enter });

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set("[data-reveal]", { autoAlpha: 1, y: 0 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set("[data-reveal]", { autoAlpha: 0, y: RISE });

      ScrollTrigger.batch("[data-reveal]", {
        start: REVEAL_START,
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            stagger: STAGGER,
            overwrite: true,
          }),
      });
    });

    // Re-measure after webfonts settle so every trigger reads correct positions.
    if (document.fonts) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => mm.revert();
  }, []);

  return null;
}
