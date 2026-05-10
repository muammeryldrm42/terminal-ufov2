// ============================================================
// 🛸 Terminal of UFO — Tool Definitions (Claude API v2)
// ============================================================

import { Tool } from "../types";

export const ALL_TOOLS: Tool[] = [
  // ── Web Research ──────────────────────────────────────────────────────────
  {
    name: "web_search",
    description: "Search the web for current information, news, facts, or any topic. Returns titles, URLs, and snippets. Use this first when you need real-time or recent information.",
    input_schema: {
      type: "object",
      properties: {
        query: { type: "string", description: "The search query" },
        num_results: { type: "number", description: "Results to return (1-10, default 6)" },
      },
      required: ["query"],
    },
  },
  {
    name: "fetch_page",
    description: "Fetch full text content from a URL. Use after web_search to get complete article or page content. Returns title, author, content, and headings.",
    input_schema: {
      type: "object",
      properties: {
        url: { type: "string", description: "Full URL to fetch" },
      },
      required: ["url"],
    },
  },
  {
    name: "search_news",
    description: "Search recent news articles on any topic. Returns articles with source, date, and snippet.",
    input_schema: {
      type: "object",
      properties: {
        topic: { type: "string", description: "Topic to search news for" },
        days_back: { type: "number", description: "Days back to search (default 7)" },
      },
      required: ["topic"],
    },
  },
  {
    name: "multi_search",
    description: "Run multiple web searches in parallel. Useful for researching a topic from multiple angles simultaneously.",
    input_schema: {
      type: "object",
      properties: {
        queries: { type: "array", description: "Array of search queries to run in parallel", items: { type: "string" } },
      },
      required: ["queries"],
    },
  },

  // ── Crypto ────────────────────────────────────────────────────────────────
  {
    name: "crypto_price",
    description: "Get real-time cryptocurrency prices, market cap, 24h/7d/30d change, volume. Use CoinGecko IDs (bitcoin, ethereum, solana, etc). Supports multiple coins.",
    input_schema: {
      type: "object",
      properties: {
        coin_ids: { type: "string", description: "Comma-separated CoinGecko coin IDs, e.g. 'bitcoin,ethereum,solana'" },
      },
      required: ["coin_ids"],
    },
  },
  {
    name: "top_coins",
    description: "Get top cryptocurrencies ranked by market cap with prices and 24h changes.",
    input_schema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Number of coins (default 20, max 100)" },
      },
      required: [],
    },
  },
  {
    name: "trending_coins",
    description: "Get currently trending cryptocurrencies on CoinGecko based on search volume in the past 24h.",
    input_schema: { type: "object", properties: {}, required: [] },
  },
  {
    name: "global_market",
    description: "Get global crypto market overview: total market cap, 24h volume, BTC dominance, ETH dominance, market direction.",
    input_schema: { type: "object", properties: {}, required: [] },
  },
  {
    name: "crypto_history",
    description: "Get historical price data and SMA indicators for a coin over a time period.",
    input_schema: {
      type: "object",
      properties: {
        coin_id: { type: "string", description: "CoinGecko coin ID" },
        days: { type: "number", description: "Days of history (default 30)" },
      },
      required: ["coin_id"],
    },
  },
  {
    name: "coin_details",
    description: "Get detailed information about a specific coin: description, links, community stats, supply, ATH, sentiment.",
    input_schema: {
      type: "object",
      properties: {
        coin_id: { type: "string", description: "CoinGecko coin ID" },
      },
      required: ["coin_id"],
    },
  },
  {
    name: "binance_analysis",
    description: "Full technical analysis from Binance: RSI, MACD, SMA20/50, EMA9, Bollinger Bands, ATR, order book imbalance, trading signals. Best tool for trading decisions.",
    input_schema: {
      type: "object",
      properties: {
        symbol: { type: "string", description: "Binance trading pair (BTCUSDT, ETHUSDT, SOLUSDT, etc)" },
        interval: { type: "string", description: "Candle interval: 1m 5m 15m 30m 1h 4h 1d 1w (default 1h)", enum: ["1m", "5m", "15m", "30m", "1h", "4h", "1d", "1w"] },
        limit: { type: "number", description: "Number of candles for analysis (default 100)" },
      },
      required: ["symbol"],
    },
  },
  {
    name: "order_book",
    description: "Get real-time order book data from Binance with bid/ask walls, spread, and buy/sell pressure imbalance.",
    input_schema: {
      type: "object",
      properties: {
        symbol: { type: "string", description: "Binance trading pair (BTCUSDT, etc)" },
        depth: { type: "number", description: "Order book depth (default 10)" },
      },
      required: ["symbol"],
    },
  },

  // ── GitHub ────────────────────────────────────────────────────────────────
  {
    name: "github_profile",
    description: "Get a GitHub user's full profile: repos, followers, recent activity, top repos, push frequency.",
    input_schema: {
      type: "object",
      properties: {
        username: { type: "string", description: "GitHub username" },
      },
      required: ["username"],
    },
  },
  {
    name: "github_repos",
    description: "List a GitHub user's public repositories sorted by update time, stars, or creation date.",
    input_schema: {
      type: "object",
      properties: {
        username: { type: "string", description: "GitHub username" },
        sort: { type: "string", description: "Sort by: updated, stars, created", enum: ["updated", "stars", "created"] },
        limit: { type: "number", description: "Number of repos (default 10)" },
      },
      required: ["username"],
    },
  },
  {
    name: "github_repo",
    description: "Deep analysis of a GitHub repository: stars, forks, contributors, languages breakdown (%), recent commits, releases.",
    input_schema: {
      type: "object",
      properties: {
        owner: { type: "string", description: "Repository owner" },
        repo: { type: "string", description: "Repository name" },
      },
      required: ["owner", "repo"],
    },
  },
  {
    name: "github_issues",
    description: "List issues for a GitHub repository, filterable by state.",
    input_schema: {
      type: "object",
      properties: {
        owner: { type: "string", description: "Repository owner" },
        repo: { type: "string", description: "Repository name" },
        state: { type: "string", description: "open, closed, or all (default open)", enum: ["open", "closed", "all"] },
        limit: { type: "number", description: "Number of issues (default 10)" },
      },
      required: ["owner", "repo"],
    },
  },
  {
    name: "github_create_issue",
    description: "Create a new GitHub issue. Requires GITHUB_TOKEN in .env with repo scope.",
    input_schema: {
      type: "object",
      properties: {
        owner: { type: "string", description: "Repository owner" },
        repo: { type: "string", description: "Repository name" },
        title: { type: "string", description: "Issue title" },
        body: { type: "string", description: "Issue body in Markdown" },
        labels: { type: "array", description: "Label names to add", items: { type: "string" } },
      },
      required: ["owner", "repo", "title", "body"],
    },
  },
  {
    name: "github_search",
    description: "Search GitHub repositories by keyword with optional language filter.",
    input_schema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search keywords" },
        language: { type: "string", description: "Filter by language (optional)" },
        sort_by: { type: "string", description: "Sort by: stars, updated, forks", enum: ["stars", "updated", "forks"] },
        limit: { type: "number", description: "Results count (default 10)" },
      },
      required: ["query"],
    },
  },
  {
    name: "github_prs",
    description: "List pull requests for a GitHub repository.",
    input_schema: {
      type: "object",
      properties: {
        owner: { type: "string", description: "Repository owner" },
        repo: { type: "string", description: "Repository name" },
        state: { type: "string", description: "open, closed, or all", enum: ["open", "closed", "all"] },
        limit: { type: "number", description: "Number of PRs (default 10)" },
      },
      required: ["owner", "repo"],
    },
  },
  {
    name: "github_compare",
    description: "Compare multiple GitHub repositories side by side (stars, forks, language, activity).",
    input_schema: {
      type: "object",
      properties: {
        repos: { type: "array", description: "Array of 'owner/repo' strings to compare", items: { type: "string" } },
      },
      required: ["repos"],
    },
  },
];

export function getToolsByMode(mode: string): Tool[] {
  const research = ["web_search", "fetch_page", "search_news", "multi_search"];
  const crypto = ["crypto_price", "top_coins", "trending_coins", "global_market", "crypto_history", "coin_details", "binance_analysis", "order_book"];
  const github = ["github_profile", "github_repos", "github_repo", "github_issues", "github_create_issue", "github_search", "github_prs", "github_compare"];

  const sets: Record<string, string[]> = {
    research, crypto, github, chat: [],
    auto: [...research, ...crypto, ...github],
  };

  const names = sets[mode] ?? sets.auto;
  return ALL_TOOLS.filter((t) => names.includes(t.name));
}
