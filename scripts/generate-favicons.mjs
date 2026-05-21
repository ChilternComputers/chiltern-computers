// Regenerate the favicon set from public/favicon-source.png (the
// Chiltern Computers logo at 1080x1080). Outputs:
//   public/favicon.svg          — SVG wrapper around a small WebP (64x64)
//   public/favicon-16x16.png    — 16x16 raster (legacy + standard tab favicon)
//   public/favicon-32x32.png    — 32x32 raster (high-DPI tab favicon)
//   public/apple-touch-icon.png — 180x180 (iOS home-screen)
//   public/icons/icon-192x192.png — 192x192 (PWA Android)
//   public/icons/icon-512x512.png — 512x512 (PWA splash)
//   public/favicon.ico          — multi-size ICO (16, 32, 48) for legacy fallback
//
// Run: node scripts/generate-favicons.mjs
//
// Re-run any time the source logo changes. Don't hand-edit the outputs.
import sharp from 'sharp';
import { writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const SRC = resolve('public/favicon-source.png');
if (!existsSync(SRC)) {
  console.error(`[generate-favicons] missing ${SRC}`);
  console.error('  Copy the 1080x1080 logo into public/favicon-source.png first.');
  process.exit(1);
}

console.log('[generate-favicons] source:', SRC);

const targets = [
  { path: 'public/favicon-16x16.png',       size: 16 },
  { path: 'public/favicon-32x32.png',       size: 32 },
  { path: 'public/apple-touch-icon.png',    size: 180 },
  { path: 'public/icons/icon-192x192.png',  size: 192 },
  { path: 'public/icons/icon-512x512.png',  size: 512 },
];

for (const t of targets) {
  await sharp(SRC).resize(t.size, t.size, { fit: 'contain', background: '#ffffff' })
    .png({ compressionLevel: 9 })
    .toFile(t.path);
  console.log(`  -> ${t.path} (${t.size}x${t.size})`);
}

// SVG wrapper: embed a 64x64 WebP so the favicon scales for HiDPI displays
// while keeping the file under 4 KB. Matches the previous favicon.svg
// technique (embedded raster in an SVG <image>).
const webpBuf = await sharp(SRC).resize(64, 64).webp({ quality: 88 }).toBuffer();
const webpB64 = webpBuf.toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <image href="data:image/webp;base64,${webpB64}" width="64" height="64"/>
</svg>`;
writeFileSync('public/favicon.svg', svg);
console.log(`  -> public/favicon.svg (${(svg.length / 1024).toFixed(1)} KB)`);

// favicon.ico — multi-size PNG-format ICO (16, 32, 48). PNG-in-ICO has
// been supported by all major browsers since IE Vista era; safe for the
// fallback case.
const icoSizes = [16, 32, 48];
const icoPngs = await Promise.all(
  icoSizes.map((s) =>
    sharp(SRC).resize(s, s, { fit: 'contain', background: '#ffffff' })
      .png({ compressionLevel: 9 })
      .toBuffer()
  )
);

const headerSize = 6 + icoSizes.length * 16;
let dataOffset = headerSize;
const ico = Buffer.alloc(headerSize + icoPngs.reduce((a, b) => a + b.length, 0));

ico.writeUInt16LE(0, 0);                  // reserved
ico.writeUInt16LE(1, 2);                  // type 1 = icon
ico.writeUInt16LE(icoSizes.length, 4);    // image count

icoSizes.forEach((size, i) => {
  const entryOffset = 6 + i * 16;
  const png = icoPngs[i];
  ico.writeUInt8(size >= 256 ? 0 : size, entryOffset + 0);     // width (0 = 256)
  ico.writeUInt8(size >= 256 ? 0 : size, entryOffset + 1);     // height
  ico.writeUInt8(0, entryOffset + 2);                          // palette count
  ico.writeUInt8(0, entryOffset + 3);                          // reserved
  ico.writeUInt16LE(1, entryOffset + 4);                       // colour planes
  ico.writeUInt16LE(32, entryOffset + 6);                      // bits per pixel
  ico.writeUInt32LE(png.length, entryOffset + 8);              // data size
  ico.writeUInt32LE(dataOffset, entryOffset + 12);             // data offset
  png.copy(ico, dataOffset);
  dataOffset += png.length;
});

writeFileSync('public/favicon.ico', ico);
console.log(`  -> public/favicon.ico (${icoSizes.join('/')}, ${(ico.length / 1024).toFixed(1)} KB)`);

console.log('\nDone. Update <link rel="icon"> tags in src/components/SEO.astro if not already pointing at these files.');
