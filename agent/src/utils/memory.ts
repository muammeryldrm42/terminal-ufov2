// ============================================================
// 🛸 Terminal of UFO — Memory Manager v2
// ============================================================

import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";
import { AgentMemory, MemoryItem } from "../types";

export class MemoryManager {
  private filePath: string;
  private mem: AgentMemory;
  private maxItems: number;

  constructor() {
    this.filePath = path.resolve(process.cwd(), process.env.MEMORY_FILE || ".ufo_memory.json");
    this.maxItems = parseInt(process.env.MAX_MEMORY_ITEMS || "100");
    this.mem = this.load();
  }

  private load(): AgentMemory {
    try {
      if (fs.existsSync(this.filePath)) {
        return JSON.parse(fs.readFileSync(this.filePath, "utf-8"));
      }
    } catch { /* ignore */ }
    return { items: [], lastUpdated: new Date().toISOString(), totalQueries: 0 };
  }

  private save(): void {
    try {
      this.mem.lastUpdated = new Date().toISOString();
      fs.writeFileSync(this.filePath, JSON.stringify(this.mem, null, 2));
    } catch { /* ignore */ }
  }

  add(type: MemoryItem["type"], query: string, summary: string, tags: string[] = [], toolsUsed: string[] = []): void {
    if (process.env.ENABLE_MEMORY === "false") return;
    this.mem.items.unshift({
      id: crypto.randomBytes(6).toString("hex"),
      timestamp: new Date().toISOString(),
      type, query,
      summary: summary.slice(0, 600),
      tags, toolsUsed,
    });
    this.mem.totalQueries++;
    if (this.mem.items.length > this.maxItems) this.mem.items = this.mem.items.slice(0, this.maxItems);
    this.save();
  }

  search(query: string, limit = 4): MemoryItem[] {
    const q = query.toLowerCase();
    return this.mem.items
      .filter((i) =>
        i.query.toLowerCase().includes(q) ||
        i.summary.toLowerCase().includes(q) ||
        i.tags.some((t) => t.toLowerCase().includes(q))
      )
      .slice(0, limit);
  }

  getRecent(type?: MemoryItem["type"], limit = 5): MemoryItem[] {
    const items = type ? this.mem.items.filter((i) => i.type === type) : this.mem.items;
    return items.slice(0, limit);
  }

  buildContext(query: string): string {
    const relevant = this.search(query, 3);
    const recent = this.getRecent(undefined, 2);
    const all = [...relevant, ...recent].filter((v, i, arr) => arr.findIndex((t) => t.id === v.id) === i).slice(0, 5);
    if (!all.length) return "";
    return "\n\n[RELEVANT MEMORY]\n" + all.map((m) =>
      `- [${m.type.toUpperCase()} | ${new Date(m.timestamp).toLocaleDateString()}] "${m.query}" → ${m.summary}`
    ).join("\n");
  }

  clear(): void {
    this.mem = { items: [], lastUpdated: new Date().toISOString(), totalQueries: this.mem.totalQueries };
    this.save();
  }

  getStats() {
    const byType: Record<string, number> = {};
    this.mem.items.forEach((i) => { byType[i.type] = (byType[i.type] || 0) + 1; });
    return { total: this.mem.items.length, totalQueries: this.mem.totalQueries, byType, lastUpdated: this.mem.lastUpdated };
  }
}
