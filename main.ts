import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

function resolveOutputPath(): string {
  const dir =
    process.env.MAKEFUN_OUTPUT_DIR ||
    process.env.OUTPUT_PATH ||
    (process.env.MAKEFUN_BOT_DIR ? "/output" : join(process.cwd(), "output"));
  return join(resolve(dir), "entry.txt");
}

// The one word to erase from the dictionary forever.
function buildEntryLine(): string {
  const word = "no";
  // Kit gate (RULES.txt): entry.txt must be UTF-8 text of 1–77 characters,
  // not only whitespace.
  if (word.length < 1 || word.length > 77 || !word.trim()) {
    throw new Error("entry fails the 1–77 character gate");
  }
  return word;
}

const word = buildEntryLine();
const out = resolveOutputPath();
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, word, "utf8");
