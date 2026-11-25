import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

function resolveOutputPath(): string {
  const dir =
    process.env.MAKEFUN_OUTPUT_DIR ||
    process.env.OUTPUT_PATH ||
    (process.env.MAKEFUN_BOT_DIR ? "/output" : join(process.cwd(), "output"));
  return join(resolve(dir), "entry.txt");
}

const word = "no";
const out = resolveOutputPath();
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, word, "utf8");
