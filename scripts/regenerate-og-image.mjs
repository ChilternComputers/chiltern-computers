// Regenerate Facebook/Twitter/LinkedIn OG image so the logo sits inside the
// centred safe zone (≈600×600 of a 1200×630 canvas). Earlier versions had the
// logo touching both edges, which Facebook's small/square link-card crop sliced
// straight through.
//
// Usage:  node scripts/regenerate-og-image.mjs
//         (run from repo root)
//
// Inputs:  public/og-image.webp  (used as source — auto-trimmed to logo bbox)
// Outputs: public/og-image.webp  (overwritten, 1200×630)
//          public/og-image.jpg   (overwritten, 1200×630)
// Backups: public/og-image.webp.bak / .jpg.bak (kept if not already present)

import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";

const PUBLIC = path.resolve("public");
const SRC = path.join(PUBLIC, "og-image.webp");

const CANVAS_W = 1200;
const CANVAS_H = 630;
// Safe zone for logo width — Facebook small thumbnails crop to roughly the
// centred square (≈630×630), so anything past x=285 / x=915 risks being cut.
// Cap logo width at 620px to leave a small margin inside the safe zone.
const LOGO_MAX_W = 620;
const LOGO_MAX_H = 480;
const BG = { r: 255, g: 255, b: 255, alpha: 1 };

async function backupOnce(file) {
  const bak = file + ".bak";
  try {
    await fs.access(bak);
    // backup already exists, leave it alone
  } catch {
    try {
      await fs.copyFile(file, bak);
      console.log("backup written:", path.basename(bak));
    } catch (e) {
      if (e.code !== "ENOENT") throw e;
    }
  }
}

async function main() {
  await backupOnce(path.join(PUBLIC, "og-image.webp"));
  await backupOnce(path.join(PUBLIC, "og-image.jpg"));

  // 1. Trim the source down to just the logo. sharp.trim() removes pixels
  //    matching the top-left corner colour by default — perfect for white-bg
  //    logos. threshold relaxes "matching" so antialias halos don't survive.
  const trimmed = await sharp(SRC)
    .trim({ threshold: 20 })
    .toBuffer({ resolveWithObject: true });
  console.log("trimmed logo:", trimmed.info.width + "x" + trimmed.info.height);

  // 2. Resize to fit safe zone, preserving aspect.
  const logo = await sharp(trimmed.data)
    .resize({
      width: LOGO_MAX_W,
      height: LOGO_MAX_H,
      fit: "inside",
      withoutEnlargement: false,
    })
    .toBuffer({ resolveWithObject: true });
  console.log("resized logo:", logo.info.width + "x" + logo.info.height);

  // 3. Composite onto fresh 1200×630 white canvas, centred.
  const canvas = sharp({
    create: {
      width: CANVAS_W,
      height: CANVAS_H,
      channels: 3,
      background: BG,
    },
  }).composite([
    {
      input: logo.data,
      left: Math.round((CANVAS_W - logo.info.width) / 2),
      top: Math.round((CANVAS_H - logo.info.height) / 2),
    },
  ]);

  // 4. Encode to buffers first — sharp can't safely overwrite a file it's
  //    still reading from in the same pipeline (the source is lazily streamed).
  const webpBuf = await canvas.clone().webp({ quality: 90 }).toBuffer();
  const jpgBuf = await canvas
    .clone()
    .jpeg({ quality: 88, mozjpeg: true })
    .toBuffer();

  // Write to temp paths then atomically rename — works even if another process
  // (dev server, file watcher) currently holds the destination open.
  const webpOut = path.join(PUBLIC, "og-image.webp");
  const jpgOut = path.join(PUBLIC, "og-image.jpg");
  const webpTmp = webpOut + ".new";
  const jpgTmp = jpgOut + ".new";
  await fs.writeFile(webpTmp, webpBuf);
  await fs.writeFile(jpgTmp, jpgBuf);
  // Retry rename — Windows Search Indexer / AV will sometimes briefly lock a
  // freshly-created file as it scans, causing EPERM on the immediate rename.
  await renameWithRetry(webpTmp, webpOut);
  await renameWithRetry(jpgTmp, jpgOut);

  console.log("wrote: public/og-image.webp + public/og-image.jpg (1200×630)");
}

async function renameWithRetry(from, to, attempts = 8) {
  for (let i = 0; i < attempts; i++) {
    try {
      await fs.rename(from, to);
      return;
    } catch (e) {
      if (e.code !== "EPERM" && e.code !== "EBUSY") throw e;
      // Windows occasionally refuses rename-over-existing even when the file
      // looks unlocked (suspect AV / Search Indexer holding a transient ref).
      // Delete-then-rename works as a fallback.
      try {
        await fs.unlink(to);
        await fs.rename(from, to);
        return;
      } catch (e2) {
        if (i === attempts - 1) throw e2;
        await new Promise((r) => setTimeout(r, 200 * (i + 1)));
      }
    }
  }
}

main().catch((e) => {
  console.error("regeneration failed:", e);
  process.exit(1);
});
