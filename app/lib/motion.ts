// Shared motion tokens — single source of truth for the site's GSAP motion.
// Keep the easing vocabulary small and restrained for a refined, professional feel.

/** Primary ease for content entering (calm deceleration). */
export const EASE = "power3.out";
/** Subtle emphasis ease — gentle overshoot, no toy-ish bounce. */
export const EASE_EMPHASIS = "back.out(1.4)";
/** Idle / looping ease. */
export const EASE_IDLE = "sine.inOut";

/** Durations (seconds). */
export const DUR = { enter: 0.7, fast: 0.45 } as const;

/** Default rise distance for reveals (px). */
export const RISE = 24;
/** Default stagger between siblings (seconds). */
export const STAGGER = 0.08;

/** ScrollTrigger start position for scroll reveals. */
export const REVEAL_START = "top 85%";
