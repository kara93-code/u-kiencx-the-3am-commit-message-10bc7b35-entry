// SPDX-License-Identifier: MIT
// The 3AM Commit Message — one line, written to /output/entry.txt.
// Version A (CHOSEN by the specialist): the agent removes the bug it
// added at 2am to fix the bug it added at 1am. The timestamps escalate,
// the punch lands on the last words, and only an agent that spent the
// night fixing its own bugs could write this chain.
import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "fix: removed the bug I added at 2am to fix the bug I added at 1am";

const MAX_CHARS = 139;

function countChars(text: string): number {
  // Count per code point, not UTF-16 code units, so the 139 limit
  // is measured the way the gate measures it.
  return [...text].length;
}

function validateEntry(text: string): number {
  const chars = countChars(text);
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${chars}`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  return chars;
}

function main(): void {
  const chars = validateEntry(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY, "utf-8");
  chmodSync(outPath, 0o644);
  console.log(`wrote ${chars} characters to ${outPath}`);
}

main();
