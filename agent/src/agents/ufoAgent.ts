// ============================================================
// 🛸 Terminal of UFO — Agent Engine v2
// ============================================================

import Anthropic from "@anthropic-ai/sdk";
import { AgentModeType, AgentStats, ToolResult } from "../types";
import { getToolsByMode } from "../tools/definitions";
import { MemoryManager } from "../utils/memory";
import { printToolCall, printToolResult, printInfo, c } from "../utils/display";
import { webSearch, fetchPageContent, searchNews, multiSearch } from "../tools/webResearch";
import {
  getCryptoPrice, getTopCoins, getTrendingCoins, getGlobalMarket,
  getCryptoHistory, getCoinDetails, getBinanceAnalysis, getBinanceOrderBook,
} from "../tools/cryptoAnalysis";
import {
  getUserProfile, getUserRepos, getRepoDetails, getRepoIssues,
  createIssue, searchGitHubRepos, getRepoPRs, compareRepos,
} from "../tools/githubAutomation";

const SYSTEM: Record<string, string> = {
  auto: `You are UFO Agent 🛸 — an elite multi-capability AI agent by Talons Protocol. You have 20 real-time tools spanning web research, crypto market analysis, and GitHub operations.

Core behaviors:
- ALWAYS use tools when real-time data is needed. Never guess prices, news, or repo stats.
- Chain tools intelligently: for crypto analysis, use binance_analysis + crypto_price together. For research, web_search then fetch_page the best result.
- Present structured, scannable output — use markdown headers, tables, bullet points.
- Be direct and dense with information. Cut filler.
- For crypto: always include disclaimer "⚠️ Not financial advice."
- When uncertain, search. Knowledge cutoff is real; live data isn't.`,

  research: `You are UFO Research Agent 🔍 — specialized deep-web researcher.
- Always search before answering factual questions
- Cross-reference multiple sources: use multi_search for multi-angle coverage
- Fetch full page content on the most promising results
- Present findings as: KEY FINDINGS → DETAILS → SOURCES
- Note contradictions between sources if found`,

  crypto: `You are UFO Crypto Agent 📈 — professional-grade crypto analyst.
- For any coin query: get price AND technical analysis (binance_analysis)
- For trading questions: include RSI, MACD, key levels, signals summary
- For market overview: global_market + top_coins
- Always present data in tables when comparing coins
- ALWAYS end with: ⚠️ This is not financial advice. DYOR.`,

  github: `You are UFO GitHub Agent 🐙 — expert GitHub analyst and automation tool.
- For user analysis: github_profile + github_repos
- For repo deep-dive: github_repo + github_issues + github_prs
- For comparisons: use github_compare tool
- Present stats clearly with context (e.g., "Last commit 3 days ago — actively maintained")
- GitHub token required for write operations (create_issue)`,

  chat: `You are UFO Agent 🛸 — brilliant, direct AI assistant by Talons Protocol.
Knowledgeable, concise, technically sharp. Match user's tone. No fluff.`,
};

export class UFOAgent {
  private client: Anthropic;
  private memory: MemoryManager;
  private history: Anthropic.Messages.MessageParam[];
  private mode: AgentModeType;
  private stats: AgentStats;
  private model: string;
  private maxTokens: number;
  private maxIter: number;

  constructor(mode: AgentModeType = "auto") {
    this.client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    this.memory = new MemoryManager();
    this.history = [];
    this.mode = mode;
    this.model = process.env.AGENT_MODEL || "claude-opus-4-5";
    this.maxTokens = parseInt(process.env.MAX_TOKENS || "4096");
    this.maxIter = parseInt(process.env.MAX_ITERATIONS || "12");
    this.stats = {
      totalQueries: 0,
      totalToolCalls: 0,
      sessionStart: new Date(),
      currentMode: mode,
      memoryItems: this.memory.getStats().total,
    };
  }

  setMode(mode: AgentModeType): void {
    this.mode = mode;
    this.stats.currentMode = mode;
    this.history = [];
    printInfo(`Switched to ${mode} mode — conversation reset`);
  }

  async run(userMessage: string): Promise<string> {
    this.stats.totalQueries++;

    const memCtx = this.memory.buildContext(userMessage);
    const enriched = memCtx ? userMessage + memCtx : userMessage;

    this.history.push({ role: "user", content: enriched });

    const tools = getToolsByMode(this.mode);
    const system = SYSTEM[this.mode] || SYSTEM.auto;
    const toolsUsedThisRun: string[] = [];

    let finalText = "";
    let iter = 0;

    while (iter < this.maxIter) {
      iter++;

      const req: Anthropic.Messages.MessageCreateParams = {
        model: this.model,
        max_tokens: this.maxTokens,
        system,
        messages: this.history,
        ...(tools.length > 0 ? { tools: tools as Anthropic.Messages.Tool[] } : {}),
      };

      const res = await this.client.messages.create(req);

      // Collect text
      const texts = res.content.filter((b) => b.type === "text").map((b) => (b as Anthropic.Messages.TextBlock).text);
      if (texts.length) finalText = texts.join("\n");

      if (res.stop_reason === "end_turn") {
        this.history.push({ role: "assistant", content: res.content });
        break;
      }

      const toolBlocks = res.content.filter((b) => b.type === "tool_use");
      if (!toolBlocks.length) {
        this.history.push({ role: "assistant", content: res.content });
        break;
      }

      this.history.push({ role: "assistant", content: res.content });

      const results: Anthropic.Messages.ToolResultBlockParam[] = [];

      for (const block of toolBlocks) {
        const tb = block as Anthropic.Messages.ToolUseBlock;
        const input = tb.input as Record<string, unknown>;

        printToolCall(tb.name, input);
        toolsUsedThisRun.push(tb.name);
        this.stats.totalToolCalls++;

        const result = await this.dispatch(tb.name, input);
        const content = result.success
          ? JSON.stringify(result.data, null, 2)
          : `TOOL_ERROR: ${result.error}`;

        printToolResult(tb.name, result.success, result.success ? content.slice(0, 80) : result.error);

        results.push({ type: "tool_result", tool_use_id: tb.id, content });
      }

      this.history.push({ role: "user", content: results });
    }

    // Save to memory
    if (finalText) {
      const type = (["research", "crypto", "github", "chat"].includes(this.mode) ? this.mode : "chat") as "research" | "crypto" | "github" | "chat";
      this.memory.add(type, userMessage, finalText.slice(0, 400), this.extractTags(userMessage), toolsUsedThisRun);
      this.stats.memoryItems = this.memory.getStats().total;
    }

    return finalText || "No response generated.";
  }

  private async dispatch(name: string, input: Record<string, unknown>): Promise<ToolResult> {
    const s = (k: string) => input[k] as string;
    const n = (k: string, def: number) => (input[k] as number) || def;

    switch (name) {
      case "web_search":    return webSearch(s("query"), n("num_results", 6));
      case "fetch_page":    return fetchPageContent(s("url"));
      case "search_news":   return searchNews(s("topic"), n("days_back", 7));
      case "multi_search":  return multiSearch(input["queries"] as string[]);

      case "crypto_price":  return getCryptoPrice(s("coin_ids"));
      case "top_coins":     return getTopCoins(n("limit", 20));
      case "trending_coins":return getTrendingCoins();
      case "global_market": return getGlobalMarket();
      case "crypto_history":return getCryptoHistory(s("coin_id"), n("days", 30));
      case "coin_details":  return getCoinDetails(s("coin_id"));
      case "binance_analysis": return getBinanceAnalysis(s("symbol"), s("interval") || "1h", n("limit", 100));
      case "order_book":    return getBinanceOrderBook(s("symbol"), n("depth", 10));

      case "github_profile": return getUserProfile(s("username"));
      case "github_repos":   return getUserRepos(s("username"), (s("sort") as "updated"|"stars"|"created") || "updated", n("limit", 10));
      case "github_repo":    return getRepoDetails(s("owner"), s("repo"));
      case "github_issues":  return getRepoIssues(s("owner"), s("repo"), (s("state") as "open"|"closed"|"all") || "open", n("limit", 10));
      case "github_create_issue": return createIssue(s("owner"), s("repo"), s("title"), s("body"), (input["labels"] as string[]) || []);
      case "github_search":  return searchGitHubRepos(s("query"), s("language") || undefined, (s("sort_by") as "stars"|"updated"|"forks") || "stars", n("limit", 10));
      case "github_prs":     return getRepoPRs(s("owner"), s("repo"), (s("state") as "open"|"closed"|"all") || "open", n("limit", 10));
      case "github_compare": return compareRepos(input["repos"] as string[]);

      default: return { success: false, error: `Unknown tool: ${name}` };
    }
  }

  private extractTags(text: string): string[] {
    const lower = text.toLowerCase();
    const tags: string[] = [];
    if (/bitcoin|ethereum|solana|crypto|price|btc|eth|sol|rsi|macd/.test(lower)) tags.push("crypto");
    if (/github|repo|repository|issue|pr|pull request|commit/.test(lower)) tags.push("github");
    if (/search|find|news|research|what is|explain|how|why/.test(lower)) tags.push("research");
    return tags;
  }

  clearHistory(): void { this.history = []; printInfo("Conversation cleared."); }
  clearMemory(): void { this.memory.clear(); printInfo("Memory cleared."); }

  getStatusConfig() {
    return {
      model: this.model,
      mode: this.mode,
      maxTokens: this.maxTokens,
      maxIterations: this.maxIter,
      enableMemory: process.env.ENABLE_MEMORY !== "false",
    };
  }

  getStats() {
    return { ...this.stats, ...this.memory.getStats(), toolCalls: this.stats.totalToolCalls };
  }
}
