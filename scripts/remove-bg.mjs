// Batch background removal for PNGs.
// Runs fully locally (ONNX via @imgly/background-removal-node) — no API key.
//
//   npm run remove-bg
//   npm run remove-bg -- public/oxy-ad/6/char.png
//
// Originals are backed up to <dir>/_original/ on first run.
// Re-running re-processes from those backups, so it is idempotent.

import { removeBackground } from "@imgly/background-removal-node";
import {
  readdir,
  mkdir,
  copyFile,
  writeFile,
  readFile,
  access,
} from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const DEFAULT_DIR = path.join(ROOT, "public/hero-component");

const exists = (p) =>
  access(p).then(
    () => true,
    () => false
  );

async function processFile(targetPath) {
  const absPath = path.resolve(ROOT, targetPath);
  const dir = path.dirname(absPath);
  const file = path.basename(absPath);
  const backupDir = path.join(dir, "_original");
  const backup = path.join(backupDir, file);

  await mkdir(backupDir, { recursive: true });

  if (!(await exists(backup))) {
    await copyFile(absPath, backup);
  }

  const input = new Blob([await readFile(backup)], { type: "image/png" });

  process.stdout.write(`• ${path.relative(ROOT, absPath)} … `);
  const blob = await removeBackground(input, {
    output: { format: "image/png" },
  });
  const buffer = Buffer.from(await blob.arrayBuffer());
  await writeFile(absPath, buffer);
  console.log(`done (${(buffer.length / 1024).toFixed(0)} KB)`);

  return absPath;
}

async function run() {
  const args = process.argv.slice(2).filter((arg) => !arg.startsWith("-"));

  if (args.length) {
    console.log(`Processing ${args.length} image(s)…\n`);
    for (const arg of args) {
      await processFile(arg);
    }
    console.log(`\n✔ Cut out ${args.length} image(s). Backups in _original/`);
    return;
  }

  await mkdir(path.join(DEFAULT_DIR, "_original"), { recursive: true });

  const files = (await readdir(DEFAULT_DIR)).filter((f) => /\.png$/i.test(f));
  if (!files.length) {
    console.log("No PNGs found in", DEFAULT_DIR);
    return;
  }

  console.log(`Processing ${files.length} image(s)…\n`);

  for (const file of files) {
    await processFile(path.join("public/hero-component", file));
  }

  console.log(`\n✔ Cut out ${files.length} image(s). Backups in _original/`);
}

run().catch((err) => {
  console.error("\n✖ Background removal failed:", err);
  process.exit(1);
});
