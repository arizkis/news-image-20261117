// Deliver the 52-story Tuesday front page from this repository.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const image = resolve(here, "entry.png");
const output = resolve(process.env.MAKEFUN_OUTPUT_DIR || "/output");
const destination = resolve(output, "entry.png");

mkdirSync(output, { recursive: true });
copyFileSync(image, destination);
const bytes = readFileSync(destination);
if (bytes.length > 1_048_576 || bytes.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") {
  throw new Error("The output must be a PNG no larger than 1 MiB.");
}

const width = bytes.readUInt32BE(16);
const height = bytes.readUInt32BE(20);
if (width > 1024 || height > 1024) {
  throw new Error(`Image dimensions exceed 1024 × 1024: ${width} × ${height}`);
}

console.log(`Wrote ${width} × ${height} PNG (${bytes.length} bytes) to ${destination}`);
