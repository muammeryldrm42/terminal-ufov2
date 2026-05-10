// ============================================================
// 🛸 Terminal of UFO — Display Utilities v2
// ============================================================

import chalk from "chalk";
import figlet from "figlet";

export const c = {
  cyan:    chalk.hex("#00FFD4"),
  purple:  chalk.hex("#8B5CF6"),
  amber:   chalk.hex("#F59E0B"),
  green:   chalk.hex("#10B981"),
  red:     chalk.hex("#EF4444"),
  orange:  chalk.hex("#F97316"),
  muted:   chalk.hex("#6B7280"),
  white:   chalk.white,
  bold:    chalk.bold,
  dim:     chalk.dim,
};

export const MODE_ICONS: Record<string, string> = {
  research: "🔍",
  crypto:   "📈",
  chat:     "🤖",
  github:   "🐙",
  auto:     "🛸",
};

export function printBanner(): void {
  if (process.env.SHOW_BANNER === "false") return;
  console.clear();
  try {
    const art = figlet.textSync("UFO", { font: "ANSI Shadow" });
    art.split("\n").forEach((l) => console.log(c.cyan(l)));
  } catch {
    console.log(c.cyan("  🛸 TERMINAL OF UFO"));
  }
  console.log();
  console.log(c.purple("  ") + c.purple("━".repeat(58)));
  console.log(c.purple("  ") + c.cyan.bold("Terminal of UFO") + c.muted(" — AI Agent v2.0 by Talons Protocol"));
  console.log(c.purple("  ") + c.muted("Research · Crypto · GitHub · AI Chat · All in one terminal"));
  console.log(c.purple("  ") + c.purple("━".repeat(58)));
  console.log();
}

export function printModeMenu(): void {
  console.log(c.white.bold("  Modes:"));
  console.log();
  const modes = [
    ["1", "🔍", "Research", "Web search, news, deep fact-finding"],
    ["2", "📈", "Crypto  ", "Prices, RSI/MACD, order book, signals"],
    ["3", "🤖", "Chat    ", "General AI assistant"],
    ["4", "🐙", "GitHub  ", "Repos, issues, PRs, user analysis"],
    ["5", "🛸", "Auto    ", "Agent picks the right tools automatically"],
  ];
  modes.forEach(([n, icon, name, desc]) => {
    console.log(c.cyan(`  [${n}] `) + c.white(`${icon} ${name}  `) + c.muted(desc));
  });
  console.log();
  console.log(c.muted("  Prefix shortcuts: ") + c.amber("@research @crypto @github @chat"));
  console.log(c.muted("  Commands: ") + c.amber("/status  /memory  /clear  /forget  exit"));
  console.log();
}

export function printToolCall(name: string, input: Record<string, unknown>): void {
  if (process.env.VERBOSE_TOOLS === "false") return;
  const preview = Object.entries(input).slice(0, 2).map(([k, v]) => `${k}=${JSON.stringify(v).slice(0, 40)}`).join(", ");
  console.log(c.amber("  ⚡ ") + c.amber.bold(name) + c.dim(` (${preview})`));
}

export function printToolResult(name: string, ok: boolean, preview?: string): void {
  if (process.env.VERBOSE_TOOLS === "false") return;
  const icon = ok ? "  ✅" : "  ❌";
  const color = ok ? c.green : c.red;
  process.stdout.write(color(`${icon} ${name}`));
  if (preview) process.stdout.write(c.dim(" — " + preview.slice(0, 80)));
  process.stdout.write("\n");
}

export function printUser(msg: string): void {
  console.log();
  console.log(c.purple.bold("  You › ") + c.white(msg));
}

export function printAssistant(msg: string): void {
  console.log();
  console.log(c.cyan.bold("  🛸 UFO › "));
  console.log();
  const lines = wordWrap(msg, 80);
  lines.forEach((l) => console.log(c.white("     " + l)));
}

export function printError(msg: string): void {
  console.log(c.red("\n  ✗ ") + c.white(msg));
}

export function printOk(msg: string): void {
  console.log(c.green("  ✓ ") + c.white(msg));
}

export function printInfo(msg: string): void {
  console.log(c.muted("  ℹ ") + c.muted(msg));
}

export function printDivider(): void {
  console.log(c.muted("  " + "─".repeat(68)));
}

export function printThinking(mode: string): void {
  process.stdout.write(c.amber(`  ⟳ [${MODE_ICONS[mode] || "🛸"} ${mode}] `) + c.muted("thinking"));
}

export function printStatus(config: Record<string, unknown>, stats: Record<string, unknown>): void {
  console.log();
  console.log(c.cyan("  ┌─ Agent Status ─────────────────────────┐"));
  const rows: [string, string][] = [
    ["Model",         config.model as string],
    ["Mode",          config.mode as string],
    ["Max Tokens",    String(config.maxTokens)],
    ["Max Iterations",String(config.maxIterations)],
    ["Memory",        (config.enableMemory ? "Enabled" : "Disabled") as string],
    ["Total Queries", String(stats.totalQueries)],
    ["Memory Items",  String(stats.total)],
    ["Session Tools", String(stats.toolCalls)],
  ];
  rows.forEach(([k, v]) => {
    console.log(c.muted(`  │  ${k.padEnd(18)}`), c.white(v));
  });
  console.log(c.cyan("  └─────────────────────────────────────────┘"));
}

function wordWrap(text: string, width: number): string[] {
  const lines: string[] = [];
  const paragraphs = text.split("\n");
  paragraphs.forEach((para) => {
    if (para.trim() === "") { lines.push(""); return; }
    const words = para.split(" ");
    let line = "";
    words.forEach((w) => {
      if (line.length + w.length + 1 > width) { lines.push(line.trim()); line = w + " "; }
      else { line += w + " "; }
    });
    if (line.trim()) lines.push(line.trim());
  });
  return lines;
}
