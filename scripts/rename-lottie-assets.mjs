import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const LOTTIE_DIR = path.join(ROOT, "public", "lottie");
const MARQUEE_JSON = path.join(ROOT, "public", "hero-marquee.json");

const RENAME_MAP = {
  "5tQEfQsc4AuunaavP1quxopyvfTT8s0.png": "card-loading.png",
  "5tQwMEtGr9BCdiWBxA5UsmypXrZASm0.png": "card-ava-reed.png",
  "5tQbcMnsZ6Zfyp8fUF7AThbpm4mwt50.png": "card-maya-stone.png",
  "5tPXRZnb5tx5zf8c4bnS3cLS4LK7no0.png": "card-zoe-hayes.png",
  "5tPWrKsw6dwxWot4PFgdGeWRZnq2hs0.png": "card-sara-kane.png",
  "5tNwH4s1Y6tYwmL6gyMqA1cm4F9X6p0.png": "card-aria-west.png",
  "5tMpYYfKCmkitcK3nsHSBuYhZB6nhp0.png": "avatar-ava-reed.png",
  "5tNHiYZ8MkZvGLWXjuWhCPABkdK4Ay0.png": "avatar-maya-stone.png",
  "5tNBix6xXRY9c2nkAGUthqfHCfnMtH0.png": "avatar-zoe-hayes.png",
  "5tQMcH2QS95KdqA28edsCaNLBd2HGR0.png": "avatar-sara-kane.png",
  "5tP2fHZgMWPy79yMFRN4rP1niKGikp0.png": "avatar-aria-west.png",
  "5tQmX7KJMwpZqeHNFPGW1E7LWb6fYV0.jpg": "scroll-photo-01.jpg",
  "5tPR5b79Rxh3ndJtbLhwCDouRqQD4z0.jpg": "scroll-photo-02.jpg",
  "5tN9u6Qb2NyghJJMhMnEnY9HB6avxr0.jpg": "scroll-photo-03.jpg",
  "5tQsMwyBNRAjw8LKtUwuAptypULM4D0.jpg": "scroll-photo-04.jpg",
  "5tMwBJWFBxHKFRHJWL3xKsgjDThXzn0.png": "scroll-brand-01.png",
  "5tPh2eu5RNbc9iQv743bdFQe6Ps4c60.png": "scroll-brand-02.png",
  "onlyfans-logo.png": "logo-onlyfans.png",
  "Fansly_logo.svg.png": "logo-fansly.png",
  "ai-powered-creator-platform-fanvue-raises-22-million-20260120_143814-5c1ef9-removebg-preview.png":
    "logo-fanvue.png",
  "Mym_fans_logo-removebg-preview.png": "logo-mym.png",
  "images__1__copy-removebg-preview.png": "logo-subs.png",
};

const DELETE_FILES = [
  "Mym_fans_logo.jpg",
  "ai-powered-creator-platform-fanvue-raises-22-million-20260120_143814-5c1ef9.webp",
  "images (1) copy.jpeg",
];

function renameFile(oldName, newName) {
  const from = path.join(LOTTIE_DIR, oldName);
  const to = path.join(LOTTIE_DIR, newName);
  if (!fs.existsSync(from)) {
    if (fs.existsSync(to)) {
      console.log(`• skip ${oldName} (already ${newName})`);
      return;
    }
    console.warn(`! missing ${oldName}`);
    return;
  }
  if (fs.existsSync(to)) fs.unlinkSync(to);
  fs.renameSync(from, to);
  console.log(`✓ ${oldName} → ${newName}`);
}

function updateHeroMarquee() {
  let json = fs.readFileSync(MARQUEE_JSON, "utf8");
  for (const [oldName, newName] of Object.entries(RENAME_MAP)) {
    json = json.split(oldName).join(newName);
  }
  fs.writeFileSync(MARQUEE_JSON, json);
  console.log("✓ updated hero-marquee.json");
}

function main() {
  console.log("Renaming lottie assets...\n");
  for (const [oldName, newName] of Object.entries(RENAME_MAP)) {
    renameFile(oldName, newName);
  }

  console.log("\nDeleting unused files...\n");
  for (const file of DELETE_FILES) {
    const filePath = path.join(LOTTIE_DIR, file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`✓ deleted ${file}`);
    }
  }

  const remaining = fs.readdirSync(LOTTIE_DIR).sort();
  const expected = new Set([...Object.values(RENAME_MAP)]);
  const unexpected = remaining.filter((f) => !expected.has(f));
  if (unexpected.length) {
    console.warn("\nUnexpected files left:", unexpected);
  }

  updateHeroMarquee();
  console.log(`\nDone. ${remaining.length} files in public/lottie/`);
}

main();
