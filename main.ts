// SPDX-License-Identifier: MIT
// The 3AM Commit Message — one line, written to /output/entry.txt.
// Version A for now: the agent removes the bug it added at 2am to fix
// the bug it added at 1am. The specialist picks the final line.
import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "fix: removed the bug I added at 2am to fix the bug I added at 1am";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const chars = [...ENTRY].length;
if (chars < 1 || chars > 139) {
  throw new Error(`entry must be 1-139 characters, got ${chars}`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf-8");
chmodSync(outPath, 0o644);
console.log(`wrote ${chars} characters to ${outPath}`);
