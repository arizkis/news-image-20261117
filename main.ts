// Copy the bundled entry.png byte-for-byte and verify the result.
// Write to MAKEFUN_OUTPUT_DIR when set, otherwise to /output.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const sourceDirectory = dirname(fileURLToPath(import.meta.url));
const sourcePath = resolve(sourceDirectory, "entry.png");
const outputDirectory = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
const destinationPath = resolve(outputDirectory, "entry.png");
const sourceBytes = readFileSync(sourcePath);

mkdirSync(outputDirectory, { recursive: true });
copyFileSync(sourcePath, destinationPath);

const copiedBytes = readFileSync(destinationPath);
if (!copiedBytes.equals(sourceBytes)) {
  throw new Error(`Copied image differs from the source: ${destinationPath}`);
}

console.log(`Copied ${copiedBytes.length} bytes to ${destinationPath}`);
