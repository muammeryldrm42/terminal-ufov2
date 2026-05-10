#!/usr/bin/env node
// ============================================================
// 🛸 Terminal of UFO — CLI Entry Point v2
// ============================================================

import "dotenv/config";
import * as readline from "readline";
import { program } from "commander";
import { UFOAgent } from "./agents/ufoAgent";
import { AgentModeType } from "./types";
import {
  printBanner, printModeMenu, printUser, printAssistant,
  printError, printOk, printInfo, printDivider, printThinking,
  printStatus, c, MODE_ICONS,
} from "./utils/display";

program
  .name("ufo")
  .description("🛸 Terminal of UFO — Multi-Capability AI Agent")
  .version("2.0.0")
  .option("-m, --mode <mode>", "Start mode: auto|research|crypto|github|chat", "auto")
  .option("-q, --query <query>", "Run a single query and exit")
  .parse(process.argv);

const opts = program.opts();

if (!process.env.ANTHROPIC_API_KEY) {
  console.error(
    "\n" + c.red("  ✗ ANTHROPIC_API_KEY not set.\n") +
    c.muted("  Copy .env.example → .env and add your key.\n") +
    c.muted("  Get yours: https://console.anthropic.com/\n")
  );
  process.exit(1);
}

const MODES: Record<string, AgentModeType> = {
  "1": "research", "2": "crypto", "3": "chat", "4": "github", "5": "auto",
  research: "research", crypto: "crypto", chat: "chat", github: "github", auto: "auto",
};

async function main(): Promise<void> {
  printBanner();

  let mode: AgentModeType = (MODES[opts.mode] as AgentModeType) || "auto";
  const agent = new UFOAgent(mode);

  // Single-query mode (--query flag)
  if (opts.query) {
    printThinking(mode);
    const spinner = setInterval(() => process.stdout.write("."), 500);
    try {
      const res = await agent.run(opts.query);
      clearInterval(spinner);
      process.stdout.write("\n");
      printAssistant(res);
    } catch (e: unknown) {
      clearInterval(spinner);
      printError(e instanceof Error ? e.message : String(e));
    }
    process.exit(0);
  }

  printModeMenu();

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
  const ask = (): Promise<string> =>
    new Promise((res) => {
      const icon = MODE_ICONS[mode] || "🛸";
      process.stdout.write(c.purple.bold(`\n  [${icon} ${mode}] `) + c.white("› "));
      rl.once("line", (l) => res(l.trim()));
    });

  console.log(c.muted("  Ready. Type your query or a command.\n"));

  while (true) {
    let input: string;
    try { input = await ask(); }
    catch { break; }

    if (!input) continue;

    // ── Exit ────────────────────────────────────────────────────────────────
    if (["exit", "quit", "q", "bye"].includes(input.toLowerCase())) {
      console.log();
      printOk("UFO Agent signing off. 🛸");
      console.log();
      rl.close();
      process.exit(0);
    }

    // ── Mode switch ─────────────────────────────────────────────────────────
    if (MODES[input]) {
      mode = MODES[input];
      agent.setMode(mode);
      printOk(`Mode: ${MODE_ICONS[mode]} ${mode}`);
      continue;
    }

    // ── Commands ─────────────────────────────────────────────────────────────
    switch (input) {
      case "/help":   case "help":   printModeMenu(); continue;
      case "/status": printStatus(agent.getStatusConfig() as Record<string, unknown>, agent.getStats() as unknown as Record<string, unknown>); continue;
      case "/memory": {
        const s = agent.getStats();
        console.log(c.cyan("\n  Memory Stats:"));
        console.log(c.muted("  Total stored: ") + c.white(String(s.total)));
        console.log(c.muted("  All-time queries: ") + c.white(String(s.totalQueries)));
        Object.entries(s.byType as Record<string,number>).forEach(([t, n]) =>
          console.log(c.muted(`  ${t}: `) + c.amber(String(n)))
        );
        continue;
      }
      case "/clear":  agent.clearHistory(); continue;
      case "/forget": agent.clearMemory();  continue;
      case "/mode":   printModeMenu();      continue;
    }

    // ── Mode prefix (@crypto, @research, etc.) ───────────────────────────────
    let query = input;
    const prefixMatch = input.match(/^@(research|crypto|github|chat)\s+(.+)/i);
    if (prefixMatch) {
      mode = prefixMatch[1].toLowerCase() as AgentModeType;
      query = prefixMatch[2];
      agent.setMode(mode);
    }

    // ── Run ──────────────────────────────────────────────────────────────────
    printUser(query);
    printDivider();
    printThinking(mode);
    const spinner = setInterval(() => process.stdout.write("."), 400);

    try {
      const response = await agent.run(query);
      clearInterval(spinner);
      process.stdout.write("\n");
      printAssistant(response);
    } catch (e: unknown) {
      clearInterval(spinner);
      process.stdout.write("\n");
      const msg = e instanceof Error ? e.message : String(e);
      printError(msg);
      if (msg.includes("401") || msg.includes("authentication")) printInfo("Check ANTHROPIC_API_KEY in .env");
    }

    printDivider();
  }
}

main().catch((e) => { printError(e.message); process.exit(1); });
