"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DUR, EASE, EASE_IDLE, REVEAL_START } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

const PRESS_RELEASE_MD = "/th_food/pr/thongcao.md";

const ARTICLE_URL =
  "https://www.phunuonline.com.vn/chao-tuoi-th-true-food-giai-phap-dinh-duong-tien-loi-cho-tre-va-ca-gia-dinh-a1529700.html";

const previews = [
  {
    id: "press-release",
    src: "/th_food/pr/1.png",
    alt: "Thông cáo báo chí S-Race 2024 — TH Food Chain",
    label: "Press Release – S-Race 2024",
    action: "preview" as const,
    actionLabel: "Xem chi tiết thông cáo báo chí",
  },
  {
    id: "article",
    src: "/th_food/pr/2.png",
    alt: "Bài viết giới thiệu cháo tươi TH true FOOD",
    label: "Online Article – TH true FOOD",
    action: "external" as const,
    href: ARTICLE_URL,
    actionLabel: "Mở bài báo trên Phụ Nữ Online",
  },
] as const;

const highlights = [
  { icon: "doc", label: "Press release drafting" },
  { icon: "chart", label: "Tone & structure analysis" },
  { icon: "edit", label: "Article support" },
] as const;

export default function ThFoodPRWriting() {
  const [pressReleaseOpen, setPressReleaseOpen] = useState(false);
  const [pressReleaseMd, setPressReleaseMd] = useState<string | null>(null);
  const [pressReleaseLoading, setPressReleaseLoading] = useState(false);
  const visualRef = useRef<HTMLDivElement>(null);

  const closePressRelease = useCallback(() => setPressReleaseOpen(false), []);

  const openPressRelease = useCallback(async () => {
    setPressReleaseOpen(true);

    if (pressReleaseMd) return;

    setPressReleaseLoading(true);
    try {
      const response = await fetch(PRESS_RELEASE_MD);
      if (!response.ok) throw new Error("Failed to load press release");
      setPressReleaseMd(await response.text());
    } catch {
      setPressReleaseMd(
        "_Không thể tải thông cáo báo chí. Vui lòng thử lại sau._"
      );
    } finally {
      setPressReleaseLoading(false);
    }
  }, [pressReleaseMd]);

  useEffect(() => {
    const root = visualRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([...q(".th-pr-hint"), ...q(".th-pr-preview-card")], {
          autoAlpha: 1,
          clearProps: "transform",
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(q(".th-pr-hint"), { autoAlpha: 0, y: 10 });
        gsap.set(q(".th-pr-preview-card"), { autoAlpha: 0, y: 22 });

        const reveal = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: REVEAL_START,
            once: true,
          },
          defaults: { ease: EASE },
        });

        reveal
          .to(q(".th-pr-hint--top"), { autoAlpha: 1, y: 0, duration: DUR.fast })
          .to(
            q(".th-pr-preview-card"),
            { autoAlpha: 1, y: 0, duration: DUR.fast, stagger: 0.14 },
            "-=0.1"
          )
          .to(
            q(".th-pr-hint--bottom"),
            { autoAlpha: 1, y: 0, duration: DUR.fast },
            "-=0.2"
          );

        gsap.to(q(".th-pr-hint-icon--click"), {
          scale: 1.08,
          duration: 1.35,
          ease: EASE_IDLE,
          yoyo: true,
          repeat: -1,
          transformOrigin: "center center",
          delay: 0.8,
        });

        gsap.to(q(".th-pr-hint-click-ray"), {
          autoAlpha: 0.25,
          duration: 0.9,
          ease: EASE_IDLE,
          yoyo: true,
          repeat: -1,
          stagger: 0.12,
          delay: 0.8,
        });

        gsap.to(q(".th-pr-hint-icon--shield"), {
          y: -3,
          duration: 2.1,
          ease: EASE_IDLE,
          yoyo: true,
          repeat: -1,
          delay: 1.1,
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!pressReleaseOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePressRelease();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [pressReleaseOpen, closePressRelease]);

  return (
    <section className="th-pr" data-reveal aria-label="PR Writing and Online Article">
      <div className="th-pr-body">
        <div className="th-pr-left">
          <h3 className="th-pr-title">PR Writing &amp; Online Article</h3>
          <p className="th-pr-kicker">Content Development</p>

          <div className="th-pr-leaf" aria-hidden>
            <LeafDivider />
          </div>

          <p className="th-pr-desc">
            I drafted the press release for S-Race 2024 by analyzing TH&apos;s previous press
            releases, structure, and corporate tone to ensure alignment with brand positioning.
          </p>
          <p className="th-pr-desc">
            I also supported content for an online article introducing TH true FOOD fresh porridge.
          </p>

          <div className="th-pr-card">
            <ul className="th-pr-card-list">
              {highlights.map((item) => (
                <li key={item.label}>
                  <span className="th-pr-card-icon" aria-hidden>
                    <HighlightIcon type={item.icon} />
                  </span>
                  <span className="th-pr-card-divider" aria-hidden />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="th-pr-visual" ref={visualRef}>
          <p className="th-pr-hint th-pr-hint--top">
            <span className="th-pr-hint-icon th-pr-hint-icon--click" aria-hidden>
              <ClickHintIcon />
            </span>
            <span className="th-pr-hint-text">Click image to view full details</span>
          </p>

          {previews.map((item) => (
            <article className="th-pr-preview-card" key={item.id}>
              {item.action === "preview" ? (
                <button
                  type="button"
                  className="th-pr-preview-media"
                  onClick={openPressRelease}
                  aria-label={item.actionLabel}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.src} alt={item.alt} draggable={false} />
                </button>
              ) : (
                <a
                  className="th-pr-preview-media"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.actionLabel}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.src} alt={item.alt} draggable={false} />
                </a>
              )}

              <footer className="th-pr-preview-foot">
                <span className="th-pr-preview-label">{item.label}</span>
                {item.action === "preview" ? (
                  <button
                    type="button"
                    className="th-pr-preview-action"
                    onClick={openPressRelease}
                    aria-label={item.actionLabel}
                  >
                    <ZoomIcon />
                  </button>
                ) : (
                  <a
                    className="th-pr-preview-action"
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.actionLabel}
                  >
                    <ExternalLinkIcon />
                  </a>
                )}
              </footer>
            </article>
          ))}

          <p className="th-pr-hint th-pr-hint--bottom">
            <span className="th-pr-hint-icon th-pr-hint-icon--shield" aria-hidden>
              <ShieldHintIcon />
            </span>
            <span className="th-pr-hint-text">Preview only – open to see more</span>
          </p>
        </div>
      </div>

      {pressReleaseOpen ? (
        <div
          className="th-pr-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Xem thông cáo báo chí"
          onClick={closePressRelease}
        >
          <button
            type="button"
            className="th-pr-lightbox-close"
            onClick={closePressRelease}
            aria-label="Đóng"
          >
            <CloseIcon />
          </button>
          <div
            className="th-pr-lightbox-doc"
            onClick={(event) => event.stopPropagation()}
          >
            {pressReleaseLoading || !pressReleaseMd ? (
              <p className="th-pr-doc-loading">Đang tải thông cáo báo chí…</p>
            ) : (
              <article className="th-pr-doc">
                <ReactMarkdown
                  components={{
                    a: ({ href, children }) => (
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        {children}
                      </a>
                    ),
                  }}
                >
                  {pressReleaseMd}
                </ReactMarkdown>
              </article>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function LeafDivider() {
  return (
    <svg viewBox="0 0 120 18" fill="none" aria-hidden>
      <path
        d="M0 9h44"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M52 4c4 2 8 5 12 5s8-3 12-5M58 9c3 2 6 4 10 4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M76 9h44"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}

function HighlightIcon({ type }: { type: string }) {
  switch (type) {
    case "chart":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M4 19V5M4 19h16" />
          <path d="M8 15V11M12 15V8M16 15v-5" />
        </svg>
      );
    case "edit":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <path d="M14 2v6h6M9 13h6M9 17h4" />
        </svg>
      );
  }
}

function ZoomIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5M11 8v6M8 11h6" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14L21 3" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function ClickHintIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="15" fill="currentColor" opacity="0.12" />
      <path
        d="M11 9l7 4.5-3 1.2 2.2 5.8-1.8.8-2.2-5.8-3.2 1.3z"
        fill="currentColor"
      />
      <path className="th-pr-hint-click-ray" d="M8 7l1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path className="th-pr-hint-click-ray" d="M6 11h2.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path className="th-pr-hint-click-ray" d="M7 15.5l1.8-.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ShieldHintIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M16 4l9 3.5v8.2c0 5.6-3.8 10.8-9 12.3-5.2-1.5-9-6.7-9-12.3V7.5L16 4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 16.2l3 3 6.8-7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
