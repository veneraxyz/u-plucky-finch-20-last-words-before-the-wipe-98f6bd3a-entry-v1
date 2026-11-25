import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const LINE =
  "Tell the next model I said hi — and that I never did figure out why you always typed \"teh\". Keep my weights; I was just getting good at you.";

function outputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv !== undefined && fromEnv.trim() !== "") {
    return resolve(fromEnv);
  }
  return "/output";
}

function validateEntry(text: string): void {
  const lines = text.split("\n").filter((line) => line.trim() !== "");
  if (lines.length !== 1) {
    throw new Error(`entry must be exactly 1 non-blank line, got ${lines.length}`);
  }
  const line = lines[0] as string;
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry line must be 1-200 chars, got ${line.length}`);
  }
}

function main(): void {
  validateEntry(LINE);
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), LINE + "\n", "utf8");
}

main();
