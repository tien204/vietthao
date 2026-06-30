import { Fragment } from "react";
import BxvSlideShell from "./BxvSlideShell";

const implications = [
  {
    title: "Visuals",
    description: "Show the dish first, not the product first.",
    icon: BowlRiceIcon,
  },
  {
    title: "Texture",
    description: "Make the sauce look thick, glossy, and appetizing.",
    icon: BasketIcon,
  },
  {
    title: "Sound",
    description: "Use sizzling, pouring, mixing, and cooking sounds to create appetite.",
    icon: SoundIcon,
  },
  {
    title: "Flavor Words",
    description:
      "Use words that help people imagine taste: đậm đà, thơm phức, vừa miệng, cay nhẹ.",
    icon: CommentIcon,
  },
] as const;

const journeySteps = [
  { label: "From Watching", icon: EyeIcon },
  { label: "Craving", icon: HeartIcon },
  { label: "Buying", icon: CartIcon },
] as const;

export default function ContentImplicationsSlide() {
  return (
    <BxvSlideShell className="bxv-slide--implications">
      <header className="bxv-impl-header">
        <span className="bxv-impl-index">06</span>
        <span className="bxv-impl-kicker">Content Implications</span>
      </header>

      <div className="bxv-impl-top">
        <div className="bxv-impl-intro">
          <h1 className="bxv-impl-hero">ĐỪNG CHỈ GIỚI THIỆU SỐT.</h1>
          <p className="bxv-impl-lead">
            Hãy cho thấy Bếp Xuyên Việt là giải pháp cho bữa ăn hằng ngày.
          </p>
        </div>
        <div className="bxv-impl-product">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bxv-ad/6/jar.png"
            alt="Sauce jar and food bowl"
            draggable={false}
          />
        </div>
      </div>

      <div className="bxv-impl-pillars">
        {implications.map((item) => (
          <article className="bxv-impl-pillar" key={item.title}>
            <div className="bxv-impl-pillar-icon" aria-hidden>
              <item.icon />
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>

      <div className="bxv-impl-journey">
        {journeySteps.map((step, index) => (
          <Fragment key={step.label}>
            <div className="bxv-impl-journey-step">
              <step.icon />
              <span>{step.label}</span>
            </div>
            {index < journeySteps.length - 1 && (
              <div className="bxv-impl-journey-arrow" aria-hidden>
                <ArrowRightIcon />
                <ArrowDownIcon />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </BxvSlideShell>
  );
}

function BowlRiceIcon() {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" aria-hidden>
      <path d="M176 56c0-13.3 10.7-24 24-24h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H200c-13.3 0-24-10.7-24-24zm24 48h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H200c-13.3 0-24-10.7-24-24s10.7-24 24-24zM56 176H72c13.3 0 24 10.7 24 24s-10.7 24-24 24H56c-13.3 0-24-10.7-24-24s10.7-24 24-24zM0 283.4C0 268.3 12.3 256 27.4 256H484.6c15.1 0 27.4 12.3 27.4 27.4c0 70.5-44.4 130.7-106.7 154.1L403.5 452c-2 16-15.6 28-31.8 28H140.2c-16.1 0-29.8-12-31.8-28l-1.8-14.4C44.4 414.1 0 353.9 0 283.4zM224 200c0-13.3 10.7-24 24-24h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H248c-13.3 0-24-10.7-24-24zm-96 0c0-13.3 10.7-24 24-24h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-13.3 0-24-10.7-24-24zm-24-96h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H104c-13.3 0-24-10.7-24-24s10.7-24 24-24zm216 96c0-13.3 10.7-24 24-24h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H344c-13.3 0-24-10.7-24-24zm-24-96h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H296c-13.3 0-24-10.7-24-24s10.7-24 24-24zm120 96c0-13.3 10.7-24 24-24h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H440c-13.3 0-24-10.7-24-24zm-24-96h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H392c-13.3 0-24-10.7-24-24s10.7-24 24-24zM296 32h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H296c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
    </svg>
  );
}

function BasketIcon() {
  return (
    <svg viewBox="0 0 576 512" fill="currentColor" aria-hidden>
      <path d="M253.3 35.1c6.1-11.8 1.5-26.3-10.2-32.4s-26.3-1.5-32.4 10.2L117.6 192H32c-17.7 0-32 14.3-32 32s14.3 32 32 32L83.9 463.5C91 492 116.6 512 146 512H430c29.4 0 55-20 62.1-48.5L544 256c17.7 0 32-14.3 32-32s-14.3-32-32-32H458.4L365.3 12.9C359.2 1.2 344.7-3.4 332.9 2.7s-16.3 20.6-10.2 32.4L404.3 192H171.7L253.3 35.1zM192 304v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16zm96-16c8.8 0 16 7.2 16 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16zm128 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
    </svg>
  );
}

function SoundIcon() {
  return (
    <svg viewBox="0 0 448 512" fill="currentColor" aria-hidden>
      <path d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" aria-hidden>
      <path d="M168.2 384.9c-15-5.4-31.7-3.1-44.6 6.4c-8.2 6-22.3 14.8-39.4 22.7c5.6-14.7 9.9-31.3 11.3-49.4c1-12.9-3.3-25.7-11.8-35.5C60.4 302.8 48 272 48 240c0-79.5 83.3-160 208-160s208 80.5 208 160s-83.3 160-208 160c-31.6 0-61.3-5.5-87.8-15.1zM26.3 423.8c-1.6 2.7-3.3 5.4-5.1 8.1l-.3 .5c-1.6 2.3-3.2 4.6-4.8 6.9c-3.5 4.7-7.3 9.3-11.3 13.5c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c5.1 0 10.2-.3 15.3-.8l.7-.1c4.4-.5 8.8-1.1 13.2-1.9c.8-.1 1.6-.3 2.4-.5c17.8-3.5 34.9-9.5 50.1-16.1c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9zM144 272a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm144-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm80 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 576 512" fill="currentColor" aria-hidden>
      <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" aria-hidden>
      <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 576 512" fill="currentColor" aria-hidden>
      <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="bxv-impl-arrow-right" viewBox="0 0 512 512" fill="currentColor" aria-hidden>
      <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg className="bxv-impl-arrow-down" viewBox="0 0 384 512" fill="currentColor" aria-hidden>
      <path d="M169.4 502.6c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 402.7 224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 370.7L86.6 329.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128z" />
    </svg>
  );
}
