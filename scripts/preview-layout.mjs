// Static preview of the HeroScene layout (geometry only, no animation).
// Composites the cut-out PNGs at the same positions/sizes/rotations used in
// HeroScene.tsx so the arrangement can be eyeballed against the target.
//
//   node scripts/preview-layout.mjs  ->  scripts/_preview.png
//
// Keep PIECES in sync with HeroScene.tsx.

import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const DIR = fileURLToPath(new URL("../public/hero-component", import.meta.url));
const OUT = fileURLToPath(new URL("./_preview.png", import.meta.url));

const W = 1100;
const H = Math.round((W * 9) / 16); // aspect-ratio 16 / 9

const PIECES = [
  { src: "notebook.png", x: 10, y: 19, w: 15, rot: -12 },
  { src: "smallnotepad.png", x: 90, y: 18, w: 13, rot: -14 },
  { src: "sandclock.png", x: 25, y: 85, w: 8, rot: 8 },
  { src: "tape.png", x: 11, y: 84, w: 24, rot: -6 },
  { src: "button.png", x: 84, y: 85, w: 26, rot: -10 },
];

async function run() {
  const layers = [];
  for (const p of PIECES) {
    const boxW = Math.round((p.w / 100) * W);
    let img = sharp(path.join(DIR, p.src)).resize(boxW, boxW, {
      fit: "inside",
    });
    if (p.rot) {
      img = img.rotate(p.rot, { background: { r: 0, g: 0, b: 0, alpha: 0 } });
    }
    const buf = await img.png().toBuffer();
    const meta = await sharp(buf).metadata();
    const cx = (p.x / 100) * W;
    const cy = (p.y / 100) * H;
    let left = Math.round(cx - meta.width / 2);
    let top = Math.round(cy - meta.height / 2);

    // Clip to the canvas (mirrors the card's overflow:hidden) so sharp never
    // sees a composite larger than the base.
    const sx = Math.max(0, -left);
    const sy = Math.max(0, -top);
    const ex = Math.min(meta.width, W - left);
    const ey = Math.min(meta.height, H - top);
    if (ex <= sx || ey <= sy) continue; // fully off-canvas
    let input = buf;
    if (sx > 0 || sy > 0 || ex < meta.width || ey < meta.height) {
      input = await sharp(buf)
        .extract({ left: sx, top: sy, width: ex - sx, height: ey - sy })
        .png()
        .toBuffer();
      left += sx;
      top += sy;
    }
    layers.push({ input, left, top });
  }

  // Approximate the centre title so text/piece spacing can be eyeballed.
  const cx = W / 2;
  const titleSize = 112;
  const line = titleSize * 0.98;
  const midY = H / 2;
  const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <style>
      .k{fill:#C9C4B8;font-family:sans-serif;font-size:15px;letter-spacing:6px;font-weight:600}
      .t{fill:#E5481F;font-family:Impact,'Arial Narrow',sans-serif;font-size:${titleSize}px;font-weight:700}
      .b{fill:#1b1b1d;font-family:sans-serif;font-size:12px;font-weight:700;letter-spacing:2px}
      .y{fill:#B9B4A8;font-family:sans-serif;font-size:14px;letter-spacing:2px}
    </style>
    <text x="${cx}" y="${midY - line + 8}" class="k" text-anchor="middle">INTERN</text>
    <text x="${cx}" y="${midY - line / 2 + 30}" class="t" text-anchor="middle">Marketing</text>
    <text x="${cx}" y="${midY + line / 2 + 22}" class="t" text-anchor="middle">Portfolio</text>
    <rect x="${cx - 95}" y="${midY + line + 12}" width="74" height="24" rx="5" fill="#EDE9E0"/>
    <text x="${cx - 58}" y="${midY + line + 28}" class="b" text-anchor="middle">PH.THAO</text>
    <text x="${cx + 18}" y="${midY + line + 28}" class="y" text-anchor="start">2026</text>
  </svg>`;

  await sharp({
    create: {
      width: W,
      height: H,
      channels: 4,
      background: { r: 27, g: 27, b: 29, alpha: 1 }, // dark hero #1b1b1d
    },
  })
    .composite([...layers, { input: Buffer.from(svg), top: 0, left: 0 }])
    .png()
    .toFile(OUT);

  console.log("Wrote", OUT);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
