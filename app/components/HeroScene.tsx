"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { DUR, EASE, EASE_EMPHASIS, EASE_IDLE } from "../lib/motion";

/**
 * Layered hero illustration with 2 independent motion layers:
 *
 *   .floaty  → IDLE float (infinite)  writes y + rotation (middle wrapper)
 *   .art     → INTRO fly-in (once)    writes x/y/scale/autoAlpha (the <img>)
 *
 * Each motion writes to a DIFFERENT element, so no two tweens ever fight over
 * the same inline transform. Nested transforms simply compose.
 *
 * (Cursor parallax was intentionally removed — no hover/mouse-move effect.)
 */

type Piece = {
  src: string;
  /** base position of the piece's CENTER, as % of the frame */
  x: number;
  y: number;
  /** piece box width, as % of the frame width (height follows the square art) */
  w: number;
  /** base rotation in degrees */
  rot: number;
  /** parallax multiplier — closer objects (bigger) move more */
  depth: number;
  hand?: boolean;
};

// Pieces are scattered around the PERIMETER so the centre stays clear for the
// title. DOM order = stacking order (back → front).
const PIECES: Piece[] = [
  { src: "notebook.png", x: 10, y: 19, w: 15, rot: -12, depth: 0.24 },
  { src: "smallnotepad.png", x: 90, y: 18, w: 13, rot: -14, depth: 0.26 },
  { src: "sandclock.png", x: 25, y: 85, w: 8, rot: 8, depth: 0.3 },
  { src: "tape.png", x: 11, y: 84, w: 24, rot: -6, depth: 0.4 },
  { src: "button.png", x: 84, y: 85, w: 26, rot: -10, depth: 0.5 },
];

export default function HeroScene() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      const floaties = q(".floaty") as HTMLDivElement[];
      const arts = q(".art:not([data-hand])") as HTMLImageElement[];
      const handArt = q(".art[data-hand]") as HTMLImageElement[];

      const mm = gsap.matchMedia();

      // ---- Reduced motion: just show everything, no movement --------------
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([...q(".art"), ...q(".hero-reveal")], { autoAlpha: 1 });
      });

      // ---- Full motion ----------------------------------------------------
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let idleTweens: gsap.core.Tween[] = [];

        const killIdle = () => {
          idleTweens.forEach((t) => t.kill());
          idleTweens = [];
        };

        // LAYER 2 — idle: each piece bobs forever with random duration/delay
        // so they never move in lock-step. Writes only y + rotation on .floaty.
        const startIdle = () => {
          killIdle();
          idleTweens = floaties.map((el) =>
            gsap.to(el, {
              y: gsap.utils.random(-16, -8),
              rotation: gsap.utils.random(-3, 3),
              duration: gsap.utils.random(2.8, 4.2),
              delay: gsap.utils.random(0, 1.2),
              ease: EASE_IDLE,
              repeat: -1,
              yoyo: true,
            })
          );
        };

        // LAYER 3 — intro: props fly in from random positions.
        // Writes x/y/scale/rotation/autoAlpha on .art only.
        const tl = gsap.timeline({
          defaults: { ease: EASE_EMPHASIS, duration: 0.9 },
          onComplete: startIdle, // also fires on replay/restart
        });

        tl.from(arts, {
          autoAlpha: 0,
          scale: 0.4,
          x: () => gsap.utils.random(-320, 320),
          y: () => gsap.utils.random(-320, 320),
          rotation: () => gsap.utils.random(-50, 50),
          stagger: { each: 0.12, from: "random" },
        });

        // Optional hero piece (kept generic; no-op if none is flagged).
        if (handArt.length) {
          tl.from(
            handArt,
            {
              autoAlpha: 0,
              scale: 0.6,
              y: 140,
              rotation: -8,
              duration: 1.1,
              ease: EASE_EMPHASIS,
            },
            "-=0.15"
          );
        }

        // Centre title rises in as the props settle around it.
        tl.from(
          q(".hero-reveal"),
          {
            autoAlpha: 0,
            y: 26,
            duration: DUR.enter,
            ease: EASE,
            stagger: 0.12,
          },
          0.25
        );

        // Cleanup for this media context (idle tweens are created lazily in
        // onComplete, so matchMedia can't auto-revert them — kill manually).
        return () => {
          killIdle();
          tl.kill();
        };
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="hero-scene" ref={rootRef}>
      {PIECES.map((p, i) => (
        <div
          className="layer"
          key={p.src}
          data-depth={p.depth}
          style={{ zIndex: i + 1 }}
        >
          {/* .pos = static base placement (left/top/width/rotate); GSAP never
              touches it, so it never fights the animated transforms below. */}
          <div
            className="pos"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.w}%`,
              transform: `translate(-50%, -50%) rotate(${p.rot}deg)`,
            }}
          >
            <div className="floaty">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="art"
                src={`/hero-component/${p.src}`}
                alt=""
                data-hand={p.hand ? "" : undefined}
                draggable={false}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="hero-copy">
        <span className="hero-kicker hero-reveal">Tran Viet Phuong Thao</span>
        <h1 className="hero-title hero-reveal">
          Marketing
          <br />
          Portfolio
        </h1>
        <div className="hero-tags hero-reveal">
          <span className="hero-badge">INTERN</span>
          <span className="hero-year">2026</span>
        </div>
      </div>
    </div>
  );
}
