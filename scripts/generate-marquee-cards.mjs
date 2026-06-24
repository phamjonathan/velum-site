import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const LOTTIE_DIR = path.join(ROOT, "public", "lottie");
const CONFIG = path.join(ROOT, "marquee-executives.json");
const MASK_SOURCE = path.join(LOTTIE_DIR, "card-loading.png");
const DISPLAY_FONT = path.join(ROOT, "public", "fonts", "inter-display-400.woff2");

const CARD_SIZE = 384;
const LOGO_MAX_W = 200;
const LOGO_MAX_H = 60;
const LOGO_CY = 139.5;
const NAME_CY = 272;
const NAME_SIZE = 50;
const NAME_TRACKING = -2.1;

const AVATAR_SIZE = 1080;
const AVATAR_LOGO_MAX = 980;

const RECOLOR_WHITE_TO_BLACK = ["logo-fanvue.png", "logo-mym.png", "logo-subs.png"];

function isWhitePixel(r, g, b, a) {
  if (a < 128) return false;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return max > 170 && max - min < 55;
}

async function recolorWhiteTextToBlack(logoPath) {
  const { data, info } = await sharp(logoPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    if (isWhitePixel(r, g, b, a)) {
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
    }
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(logoPath);
}

async function loadLogoBuffer(logoFile) {
  return sharp(path.join(LOTTIE_DIR, logoFile)).ensureAlpha().png().toBuffer();
}

function getCardLogoBounds(logoFile, meta) {
  if (!RECOLOR_WHITE_TO_BLACK.includes(logoFile)) {
    return { maxW: LOGO_MAX_W, maxH: LOGO_MAX_H, centerY: LOGO_CY };
  }

  const aspect = meta.width / meta.height;
  if (aspect >= 1.3) {
    return { maxW: 340, maxH: 150, centerY: LOGO_CY };
  }

  return { maxW: 220, maxH: 220, centerY: 125 };
}

function getAvatarLogoMax(logoFile, meta) {
  if (!RECOLOR_WHITE_TO_BLACK.includes(logoFile)) {
    return AVATAR_LOGO_MAX;
  }

  const aspect = meta.width / meta.height;
  return aspect >= 1.3 ? AVATAR_SIZE : Math.round(AVATAR_SIZE * 0.94);
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function createSquircleBase() {
  const { data, info } = await sharp(MASK_SOURCE)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = Buffer.alloc(data.length);

  for (let i = 0; i < data.length; i += 4) {
    pixels[i] = 255;
    pixels[i + 1] = 255;
    pixels[i + 2] = 255;
    pixels[i + 3] = data[i + 3];
  }

  return sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();
}

async function renderName(name) {
  const fontBase64 = fs.readFileSync(DISPLAY_FONT).toString("base64");

  const svg = `
    <svg width="${CARD_SIZE}" height="${CARD_SIZE}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          @font-face {
            font-family: "Inter Display";
            src: url("data:font/woff2;base64,${fontBase64}") format("woff2");
            font-weight: 400;
            font-style: normal;
          }
        </style>
      </defs>
      <text
        x="${CARD_SIZE / 2}"
        y="${NAME_CY}"
        text-anchor="middle"
        dominant-baseline="middle"
        font-family="'Inter Display', 'Inter', 'Segoe UI', Helvetica, Arial, sans-serif"
        font-size="${NAME_SIZE}"
        font-weight="400"
        fill="#000000"
        letter-spacing="${NAME_TRACKING}px"
      >${escapeXml(name)}</text>
    </svg>
  `;

  return sharp(Buffer.from(svg)).png().toBuffer();
}

async function prepareLogo(logoFile) {
  const source = await loadLogoBuffer(logoFile);
  const meta = await sharp(source).metadata();
  const { maxW, maxH, centerY } = getCardLogoBounds(logoFile, meta);
  const scale = Math.min(maxW / meta.width, maxH / meta.height);
  const width = Math.max(1, Math.round(meta.width * scale));
  const height = Math.max(1, Math.round(meta.height * scale));

  const logo = await sharp(source).resize(width, height, { fit: "inside" }).png().toBuffer();

  return {
    logo,
    left: Math.round((CARD_SIZE - width) / 2),
    top: Math.round(centerY - height / 2),
  };
}

async function generateCard(card, base) {
  const { logo, left, top } = await prepareLogo(card.logo);
  const nameLayer = await renderName(card.name);

  const outputPath = path.join(LOTTIE_DIR, card.output);
  await sharp(base)
    .composite([
      { input: logo, left, top },
      { input: nameLayer, left: 0, top: 0 },
    ])
    .png()
    .toFile(outputPath);

  console.log(`✓ card  ${card.output} — ${card.name}`);
}

async function generateAvatar(card) {
  const source = await loadLogoBuffer(card.logo);
  const meta = await sharp(source).metadata();
  const maxSize = getAvatarLogoMax(card.logo, meta);
  const scale = Math.min(maxSize / meta.width, maxSize / meta.height);
  const width = Math.max(1, Math.round(meta.width * scale));
  const height = Math.max(1, Math.round(meta.height * scale));

  const logo = await sharp(source).resize(width, height, { fit: "inside" }).png().toBuffer();

  const outputPath = path.join(LOTTIE_DIR, card.avatarOutput);

  await sharp({
    create: {
      width: AVATAR_SIZE,
      height: AVATAR_SIZE,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: logo,
        left: Math.round((AVATAR_SIZE - width) / 2),
        top: Math.round((AVATAR_SIZE - height) / 2),
      },
    ])
    .png()
    .toFile(outputPath);

  console.log(`✓ avatar ${card.avatarOutput} — ${card.name}`);
}

async function main() {
  for (const file of RECOLOR_WHITE_TO_BLACK) {
    const logoPath = path.join(LOTTIE_DIR, file);
    await recolorWhiteTextToBlack(logoPath);
    console.log(`✓ recolored ${file}`);
  }

  const cards = JSON.parse(fs.readFileSync(CONFIG, "utf8"));
  const base = await createSquircleBase();

  for (const card of cards) {
    await generateCard(card, base);
    await generateAvatar(card);
  }

  console.log(`\nGenerated ${cards.length} flip cards + ${cards.length} avatars in public/lottie/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
