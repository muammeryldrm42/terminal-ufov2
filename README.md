<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=220&section=header&text=Terminal%20of%20UFO&fontSize=64&fontColor=00FFD4&animation=fadeIn&fontAlignY=40&desc=Multi-Capability%20AI%20Agent%20v2.0&descAlignY=62&descAlign=50&descSize=18" width="100%"/>

<br/>

<p align="center">
  <img src="https://img.shields.io/badge/version-2.0.0-00FFD4?style=for-the-badge&labelColor=0a0a0a"/>
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=0a0a0a"/>
  <img src="https://img.shields.io/badge/Claude-Powered-8B5CF6?style=for-the-badge&logo=anthropic&logoColor=white&labelColor=0a0a0a"/>
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white&labelColor=0a0a0a"/>
  <img src="https://img.shields.io/badge/License-MIT-F59E0B?style=for-the-badge&labelColor=0a0a0a"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/🔍%20Web%20Research-4%20tools-00FFD4?style=flat-square&labelColor=0a0a0a"/>
  &nbsp;
  <img src="https://img.shields.io/badge/📈%20Crypto%20Analysis-8%20tools-F59E0B?style=flat-square&labelColor=0a0a0a"/>
  &nbsp;
  <img src="https://img.shields.io/badge/🐙%20GitHub%20Ops-8%20tools-8B5CF6?style=flat-square&labelColor=0a0a0a"/>
  &nbsp;
  <img src="https://img.shields.io/badge/🤖%20AI%20Chat-always%20on-10B981?style=flat-square&labelColor=0a0a0a"/>
</p>

<br/>

```
  ██╗   ██╗███████╗ ██████╗      █████╗  ██████╗ ███████╗███╗   ██╗████████╗
  ██║   ██║██╔════╝██╔═══██╗    ██╔══██╗██╔════╝ ██╔════╝████╗  ██║╚══██╔══╝
  ██║   ██║█████╗  ██║   ██║    ███████║██║  ███╗█████╗  ██╔██╗ ██║   ██║   
  ██║   ██║██╔══╝  ██║   ██║    ██╔══██║██║   ██║██╔══╝  ██║╚██╗██║   ██║   
  ╚██████╔╝██║     ╚██████╔╝    ██║  ██║╚██████╔╝███████╗██║ ╚████║   ██║   
   ╚═════╝ ╚═╝      ╚═════╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝   ╚═╝  
                                                      🛸 by Talons Protocol
```

> **Terminal of UFO** is a production-grade, multi-capability AI agent that runs entirely in your terminal.  
> It doesn't just answer questions — it **actively calls live APIs**, processes real data, and reasons over results.  
> Think of it as an AI analyst with 20 specialized tools at its disposal.

<br/>

**[🌐 Website](https://terminal-of-ufo.vercel.app) · [📦 Install](#-installation) · [🛠 Tools](#-tool-reference-20-tools) · [💡 Examples](#-example-sessions) · [⚙️ Config](#%EF%B8%8F-configuration)**

<br/>

</div>

---

## 📖 Table of Contents

- [What Makes This Different](#-what-makes-this-different)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Configuration](#%EF%B8%8F-configuration)
- [Agent Modes](#-agent-modes)
- [Tool Reference (20 Tools)](#-tool-reference-20-tools)
- [Example Sessions](#-example-sessions)
- [Commands Reference](#-commands-reference)
- [Memory System](#-memory-system)
- [Website / Landing Page](#-website--landing-page)
- [Project Structure](#-project-structure)
- [FAQ](#-faq)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🛸 What Makes This Different

Most "AI agents" are just ChatGPT with a search button. **Terminal of UFO is different.**

| Feature | Typical AI Wrapper | Terminal of UFO |
|---|---|---|
| Crypto prices | Gives outdated training data | **Live CoinGecko + Binance API** |
| Technical analysis | Guesses based on patterns | **Computes RSI, MACD, BB, ATR in real time** |
| GitHub info | Hallucinates stats | **Calls GitHub REST API directly** |
| Web search | Optional/broken | **Serper (Google) or DuckDuckGo fallback** |
| Tool chaining | One tool at a time | **Chains multiple tools per query autonomously** |
| Memory | Resets every session | **Persistent .json memory across sessions** |

### How It Actually Works

When you ask *"Is ETH a good buy right now?"*, the agent:

1. 📡 Calls **Binance API** → Gets 100 ETHUSDT 4h candles
2. 📊 **Computes RSI, MACD, Bollinger Bands, ATR, SMA/EMA** from raw data
3. 💰 Calls **CoinGecko** → Gets live price, 24h/7d change, market cap
4. 📰 Calls **NewsAPI** → Gets recent ETH news for sentiment
5. 🧠 **Claude synthesizes** all data into a structured analysis with signals
6. 💾 **Saves to memory** → References this context in future queries

That's 3 API calls, 5 computed indicators, live data — all automated.

---

## 🏗 Architecture

```
terminal-of-ufo/
├── agent/                     ← The AI agent (TypeScript, runs in terminal)
│   ├── src/
│   │   ├── index.ts           ← CLI entry point + readline REPL loop
│   │   ├── agents/
│   │   │   └── ufoAgent.ts    ← Core engine: tool loop, Claude API, history
│   │   ├── tools/
│   │   │   ├── definitions.ts ← All 20 tool schemas for Claude API
│   │   │   ├── webResearch.ts ← Serper/DDG search, page fetch, news, multi-search
│   │   │   ├── cryptoAnalysis.ts ← CoinGecko + Binance + all technical indicators
│   │   │   └── githubAutomation.ts ← GitHub REST API (profile, repos, issues, PRs)
│   │   ├── utils/
│   │   │   ├── display.ts     ← Terminal UI, chalk colors, formatted output
│   │   │   └── memory.ts      ← Persistent cross-session memory manager
│   │   └── types/
│   │       └── index.ts       ← Full TypeScript type definitions
│   ├── .env.example           ← Environment variable template
│   ├── package.json
│   └── tsconfig.json
│
└── website/                   ← Landing site (Next.js 14, deployable to Vercel)
    ├── src/app/
    │   ├── page.tsx           ← Full landing page with demo, install guide, docs
    │   ├── layout.tsx         ← Root layout with metadata
    │   └── globals.css        ← Custom fonts, animations, theme vars
    ├── tailwind.config.js
    ├── next.config.js         ← Static export for Vercel
    └── vercel.json            ← Vercel deployment config
```

### The Tool Loop (How Claude Uses Tools)

```
User Query
    │
    ▼
┌─────────────────────────────────────┐
│  Claude API (with 20 tool schemas)  │
│                                     │
│  Claude reasons: "I need live data" │
│  → Decides which tools to call      │
└──────────────┬──────────────────────┘
               │  stop_reason: "tool_use"
               ▼
┌─────────────────────────────────────┐
│  UFO Agent dispatches tool call(s)  │
│                                     │
│  binance_analysis(ETHUSDT, 4h)     │
│  crypto_price(ethereum)             │
│  search_news(Ethereum 2025)         │
└──────────────┬──────────────────────┘
               │  returns JSON results
               ▼
┌─────────────────────────────────────┐
│  Results fed back to Claude         │
│  Claude continues reasoning...      │
│  May call MORE tools or finalize    │
└──────────────┬──────────────────────┘
               │  stop_reason: "end_turn"
               ▼
        Final Response + Save to Memory
```

Claude controls the loop — it decides when it has enough data to answer. This can involve 1–12 tool calls per query depending on complexity.

---

## 📦 Installation

### Prerequisites

| Requirement | Version | Notes |
|---|---|---|
| Node.js | 18+ | [nodejs.org](https://nodejs.org) |
| npm | 9+ | Comes with Node |
| Anthropic API Key | — | [console.anthropic.com](https://console.anthropic.com) |

### Step-by-Step

**1. Clone the repository**

```bash
git clone https://github.com/talons-protocol/terminal-of-ufo.git
cd terminal-of-ufo/agent
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up environment**

```bash
cp .env.example .env
```

Open `.env` in your editor and add your Anthropic API key:

```bash
ANTHROPIC_API_KEY=sk-ant-api03-...your-key-here...
```

**4. Run the agent**

```bash
npm run dev
```

That's it. You're in. 🛸

---

## ⚡ Quick Start

Once running, you'll see the mode menu:

```
  Modes:

  [1] 🔍 Research  — Web search, news, deep fact-finding
  [2] 📈 Crypto    — Prices, RSI/MACD, order book, signals
  [3] 🤖 Chat      — General AI assistant
  [4] 🐙 GitHub    — Repos, issues, PRs, user analysis
  [5] 🛸 Auto      — Agent picks the right tools automatically

  Prefix shortcuts: @research @crypto @github @chat
  Commands: /status  /memory  /clear  /forget  exit
```

**Your first query:**

```
  [🛸 auto] › What is the Bitcoin price and is it bullish?
```

The agent will automatically call `binance_analysis` + `crypto_price`, compute all technical indicators, and give you a structured analysis with buy/sell signals.

**Switch modes:**

```
  [🛸 auto] › 2          ← Switch to Crypto mode
  [📈 crypto] › 4        ← Switch to GitHub mode
```

**One-off mode prefix:**

```
  [🛸 auto] › @github Show me vercel/next.js stats
  [🛸 auto] › @research Latest news on Ethereum ETF
```

---

## ⚙️ Configuration

All settings live in `agent/.env`. Copy from `.env.example`:

### API Keys

| Variable | Required | Where to Get |
|---|---|---|
| `ANTHROPIC_API_KEY` | ✅ **Yes** | [console.anthropic.com](https://console.anthropic.com/) |
| `GITHUB_TOKEN` | Optional | [github.com/settings/tokens](https://github.com/settings/tokens) — scopes: `repo`, `read:user` |
| `COINGECKO_API_KEY` | Optional | [coingecko.com/en/api](https://www.coingecko.com/en/api) — Demo tier free |
| `NEWS_API_KEY` | Optional | [newsapi.org](https://newsapi.org/) — 100 req/day free |
| `SERPER_API_KEY` | Optional | [serper.dev](https://serper.dev/) — 2500 searches free |

> **Without optional keys:** Agent uses DuckDuckGo for search, public CoinGecko endpoints for crypto. Everything still works, just with lower rate limits.

### Agent Settings

| Variable | Default | Description |
|---|---|---|
| `AGENT_MODEL` | `claude-opus-4-5` | Claude model. Use `claude-haiku-4-5` for 10x cheaper |
| `MAX_TOKENS` | `4096` | Max tokens per response |
| `MAX_ITERATIONS` | `12` | Max tool calls per single query |
| `TEMPERATURE` | `0.7` | 0.0 = deterministic, 1.0 = creative |
| `ENABLE_MEMORY` | `true` | Persist memory to `.ufo_memory.json` |
| `MEMORY_FILE` | `.ufo_memory.json` | Memory storage file path |
| `MAX_MEMORY_ITEMS` | `100` | Max items in memory |
| `VERBOSE_TOOLS` | `true` | Show tool call names in terminal |
| `SHOW_BANNER` | `true` | Show ASCII banner on launch |

### Model Cost Guide

| Model | Speed | Cost | Best For |
|---|---|---|---|
| `claude-opus-4-5` | Slowest | $$$ | Deep research, complex analysis |
| `claude-sonnet-4-5` | Fast | $$ | Balanced — recommended for daily use |
| `claude-haiku-4-5` | Fastest | $ | Quick lookups, high volume |

---

## 🎮 Agent Modes

### 🛸 Auto Mode (Default)

Claude has access to all 20 tools and decides which ones to use based on your query. Best for mixed usage.

```
[🛸 auto] › Compare top 5 DeFi repos on GitHub with current TVL
```
→ Agent runs `github_search` for DeFi repos AND `web_search` for TVL data, synthesizes both.

### 🔍 Research Mode

4 web tools active. Built for deep fact-finding, news gathering, multi-source synthesis.

```
[🔍 research] › What are the latest developments in zero-knowledge proofs?
```
→ `multi_search` with 3 parallel queries → `fetch_page` on best results → structured report.

### 📈 Crypto Mode

8 crypto tools active. Built for market analysis, trading signals, coin deep-dives.

```
[📈 crypto] › Full analysis on Solana — is it a good entry?
```
→ `binance_analysis(SOLUSDT, 4h)` + `crypto_price(solana)` + `coin_details(solana)` → RSI, MACD, Bollinger, ATR, signals, community stats.

### 🐙 GitHub Mode

8 GitHub tools active. Built for developer research, repo analysis, project management.

```
[🐙 github] › Who is the most active contributor to facebook/react?
```
→ `github_repo(facebook/react)` → contributors list with commit counts.

### 🤖 Chat Mode

No tools. Pure Claude AI conversation. Useful for explanations, code review, brainstorming.

```
[🤖 chat] › Explain how MACD divergence works in trading
```

---

## 🔧 Tool Reference (20 Tools)

### 🔍 Web Research (4 tools)

| Tool | Description | Key Parameters |
|---|---|---|
| `web_search` | Search the web via Serper (Google) or DuckDuckGo fallback. Returns titles, URLs, snippets. | `query`, `num_results` (1-10) |
| `fetch_page` | Fetch and extract full text from any URL. Strips ads, navbars, scripts. Returns title, author, date, headings, content. | `url` |
| `search_news` | Search recent news via NewsAPI or web fallback. Configurable time range. | `topic`, `days_back` (default 7) |
| `multi_search` | Run multiple searches in parallel. Best for multi-angle research. | `queries` (array) |

### 📈 Crypto Analysis (8 tools)

| Tool | Data Source | Description |
|---|---|---|
| `crypto_price` | CoinGecko | Live price, 1h/24h/7d/30d change, volume, market cap for any coin(s) |
| `top_coins` | CoinGecko | Top N coins by market cap with prices and changes |
| `trending_coins` | CoinGecko | What's trending right now based on search volume |
| `global_market` | CoinGecko | Total market cap, BTC/ETH dominance, 24h volume, market direction |
| `crypto_history` | CoinGecko | Historical OHLCV, SMA7/14/30, trend over N days |
| `coin_details` | CoinGecko | Deep coin info: description, links, ATH, supply, community stats, sentiment |
| `binance_analysis` | Binance | **Full TA:** RSI14, MACD, SMA20/50, EMA9, Bollinger Bands, ATR, trading signals, trend summary |
| `order_book` | Binance | Live order book: bid/ask walls, spread, buy/sell pressure imbalance |

#### Technical Indicators Explained

`binance_analysis` computes all of these from raw OHLCV candle data:

| Indicator | What it tells you |
|---|---|
| **RSI (14)** | `<30` = oversold (potential buy) · `>70` = overbought (potential sell) · `30-70` = neutral |
| **MACD** | `histogram > 0` = bullish momentum · `histogram < 0` = bearish · crossovers = signal |
| **SMA 20/50** | Price above both = bullish trend · Price below both = bearish trend |
| **EMA 9** | Short-term momentum direction |
| **Bollinger Bands** | Price at lower band = oversold · Price at upper band = overbought · Squeeze = breakout incoming |
| **ATR (14)** | Average True Range — measures volatility. High ATR = high risk/reward |
| **Trend** | `STRONG_UP / UP / NEUTRAL / DOWN / STRONG_DOWN` based on signal consensus |
| **Signals** | Array of individual BUY/SELL/NEUTRAL signals from each indicator with strength |

### 🐙 GitHub Automation (8 tools)

| Tool | Auth Required | Description |
|---|---|---|
| `github_profile` | No | Full user profile: repos, followers, recent activity, top repos, push frequency |
| `github_repos` | No | List repos sorted by updated/stars/created. Shows language, stars, forks, topics |
| `github_repo` | No | **Deep analysis:** stars, forks, contributors + %, languages breakdown %, recent commits, releases |
| `github_issues` | No | List/filter issues by state. Shows labels, comments, author, body preview |
| `github_prs` | No | List pull requests with state, author, merge status, labels, draft flag |
| `github_search` | No | Search repos by keyword + language filter, sorted by stars/forks/updated |
| `github_compare` | No | Compare multiple repos side-by-side (accepts `["owner/repo", ...]` array) |
| `github_create_issue` | ✅ **GITHUB_TOKEN** | Create an issue with title, body, labels |

---

## 💡 Example Sessions

### Example 1 — Crypto Deep Dive

```
[📈 crypto] › Full technical analysis on SOLUSDT 4h chart

  ⚡ binance_analysis (symbol=SOLUSDT, interval=4h, limit=100)
  ✅ binance_analysis — RSI: 62.4 | MACD: +0.18 | Trend: UP

  ⚡ crypto_price (coin_ids=solana)
  ✅ crypto_price — $182.40 | +4.2% 24h | MCap: $86.4B

  ⚡ coin_details (coin_id=solana)
  ✅ coin_details — Rank #5 | ATH: $259.96 (-29.8% from ATH)

──────────────────────────────────────────────────────
🛸 UFO ›

## Solana (SOL) — 4H Technical Analysis

**Current Price:** $182.40 (+4.2% / 24h)
**Market Cap:** $86.4B (#5 overall)
**ATH Distance:** -29.8% from all-time high of $259.96

### Technical Indicators

| Indicator        | Value         | Signal                    |
|------------------|---------------|---------------------------|
| RSI (14)         | 62.4          | 🟢 Bullish, not overbought |
| MACD             | +0.18 hist    | 🟢 Bullish crossover active |
| SMA 20           | $174.20       | 🟢 Price above (+4.7%)    |
| SMA 50           | $161.80       | 🟢 Price above (+12.7%)   |
| Bollinger Upper  | $191.40       | ⚪ Room to upper band     |
| ATR (14)         | 6.84          | ⚠️ Moderate volatility     |

### Signal Summary

✅ BUY signals: 4 (MACD, RSI, SMA20, SMA50)
❌ SELL signals: 0
⚪ NEUTRAL: 1 (Bollinger)

**Overall Trend: 🟢🟢 STRONG_UP**

### Key Levels
- **Resistance:** $191.40 (upper Bollinger), $200 (psychological)
- **Support:** $174.20 (SMA20), $161.80 (SMA50)

### Analysis
SOL is in a clear uptrend with price holding above both major MAs.
RSI at 62 is bullish but not overbought — still has room to run.
MACD histogram positive and expanding...

⚠️ Not financial advice. Always do your own research.
```

### Example 2 — Deep GitHub Research

```
[🐙 github] › Compare these repos: vercel/next.js, nuxt/nuxt, sveltejs/kit

  ⚡ github_compare (repos=["vercel/next.js","nuxt/nuxt","sveltejs/kit"])
  ✅ github_compare — 3 repos fetched

──────────────────────────────────────────────────────
🛸 UFO ›

## Framework Comparison: Next.js vs Nuxt vs SvelteKit

| Metric            | Next.js       | Nuxt 3         | SvelteKit      |
|-------------------|---------------|----------------|----------------|
| ⭐ Stars           | 126,841       | 54,203         | 18,947         |
| 🍴 Forks           | 26,918        | 4,891          | 1,804          |
| 🐛 Open Issues     | 2,847         | 1,204          | 612            |
| 💻 Primary Lang    | TypeScript    | TypeScript     | TypeScript     |
| 📅 Last Push       | 1 day ago     | 2 days ago     | 3 days ago     |
| 📦 License         | MIT           | MIT            | MIT            |

### Language Breakdown
**Next.js:** TypeScript 91.4% · JavaScript 7.2% · CSS 1.4%
**Nuxt:** TypeScript 94.1% · JavaScript 5.4% · Vue 0.5%
**SvelteKit:** TypeScript 67.3% · JavaScript 18.2% · Svelte 14.5%

### Key Takeaways
- **Next.js** dominates in community size — 2.3x more stars than Nuxt
- **All three** are actively maintained with daily commits
- **SvelteKit** has lowest issue count — possibly better maintained per contributor
...
```

### Example 3 — Multi-Source Research

```
[🔍 research] › What are the risks of Ethereum spot ETF approval?

  ⚡ multi_search (queries=["Ethereum ETF risks 2025","ETH ETF approval concerns","crypto ETF regulatory risk"])
  ✅ multi_search — 18 results from 3 parallel searches

  ⚡ fetch_page (url=https://...)
  ✅ fetch_page — Full article extracted (2,847 words)

  ⚡ search_news (topic=Ethereum ETF SEC 2025)
  ✅ search_news — 10 recent articles

──────────────────────────────────────────────────────
🛸 UFO ›

## Risks of Ethereum Spot ETF Approval — Research Report

**Query:** Ethereum spot ETF approval risks
**Sources consulted:** 3 searches, 1 full article, 10 news items

### Key Findings

**1. Staking Classification Risk**
The SEC has signaled concerns about whether ETFs holding staked ETH
would constitute securities. Issuers like BlackRock initially removed
staking from proposals to smooth approval...

**2. Market Structure Risks**
Unlike Bitcoin, ETH has higher volatility (30-day: 42% vs BTC 28%)...

[continues with 5 more detailed findings + sources]
```

---

## 📋 Commands Reference

| Command | Description |
|---|---|
| `1` `2` `3` `4` `5` | Switch mode: Research / Crypto / Chat / GitHub / Auto |
| `@research <query>` | One-off research query from any current mode |
| `@crypto <query>` | One-off crypto query from any current mode |
| `@github <query>` | One-off GitHub query from any current mode |
| `@chat <query>` | One-off chat query (no tools) from any mode |
| `/help` | Show mode menu and command reference |
| `/status` | Show agent config, session stats, memory count |
| `/memory` | Show memory statistics by type |
| `/clear` | Clear current conversation history |
| `/forget` | Wipe all persistent memory from `.ufo_memory.json` |
| `/mode` | Re-show the mode selection menu |
| `exit` / `quit` / `q` | Exit the agent |

### CLI Flags (at launch)

```bash
npm run dev -- --mode crypto      # Start directly in crypto mode
npm run dev -- --mode research    # Start in research mode
npm run dev -- --query "BTC price"  # Run single query and exit (scripting)
npm run dev -- --no-banner        # Skip ASCII art banner
```

---

## 🧠 Memory System

UFO Agent remembers things between sessions.

### How It Works

Every completed query gets summarized and stored in `.ufo_memory.json`. When you send a new query, the agent automatically searches memory for relevant past context and injects it.

```
Query: "How is Bitcoin doing?"
     ↓
Memory search: finds past "Bitcoin technical analysis" entry
     ↓
Context injected: "[RELEVANT MEMORY] 3 days ago: RSI was 58, bullish trend..."
     ↓
Agent can compare: "Since our last analysis, BTC has moved from..."
```

### Memory File Structure

```json
{
  "items": [
    {
      "id": "a3f2c1b4d5e6",
      "timestamp": "2025-01-15T10:30:00Z",
      "type": "crypto",
      "query": "Full technical analysis on SOLUSDT",
      "summary": "SOL at $182, RSI 62 bullish, MACD positive crossover, strong uptrend...",
      "tags": ["crypto", "solana"],
      "toolsUsed": ["binance_analysis", "crypto_price", "coin_details"]
    }
  ],
  "lastUpdated": "2025-01-15T11:45:00Z",
  "totalQueries": 47
}
```

### Memory Commands

```bash
/memory   # See how many items stored, breakdown by type
/clear    # Clear conversation history (keeps memory)
/forget   # Wipe all memory permanently
```

### Disable Memory

```bash
# In .env:
ENABLE_MEMORY=false
```

---

## 🌐 Website / Landing Page

This repo includes a full **Next.js 14 landing site** deployable to Vercel.

### Deploy to Vercel

**Method 1: Vercel CLI**

```bash
cd website
npm install
npx vercel deploy
```

**Method 2: GitHub Import**

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Set **Root Directory** to `website`
5. Framework: **Next.js** (auto-detected)
6. Click Deploy ✓

**Method 3: Vercel Dashboard**

1. Connect your GitHub account on Vercel
2. Import the `terminal-of-ufo` repo
3. In project settings → Root Directory: `website`
4. Deploy

### What the Site Includes

- 🎨 Full dark UI with Orbitron display font + JetBrains Mono
- 🖥 **Live terminal demo** — animated tool call simulation with replay button
- 📦 **4-step install guide** with copy buttons on every code block
- 🔧 **Full configuration reference** — all env vars documented
- 🎮 **Mode showcase** — all 5 modes explained
- 📋 **Commands reference** built into the page
- 📱 Mobile responsive with collapsing layout
- ⚡ Static export (no server needed, loads instantly)

---

## 🗂 Project Structure

```
terminal-of-ufo/
│
├── agent/                         ← Run this in your terminal
│   ├── src/
│   │   ├── index.ts               ← Entry: CLI, readline loop, mode switching
│   │   ├── agents/ufoAgent.ts     ← Core: Claude API, tool dispatch, history
│   │   ├── tools/
│   │   │   ├── definitions.ts     ← 20 tool schemas for Claude API
│   │   │   ├── webResearch.ts     ← web_search, fetch_page, search_news, multi_search
│   │   │   ├── cryptoAnalysis.ts  ← 8 crypto tools + all TA computations
│   │   │   └── githubAutomation.ts← 8 GitHub tools (read + write)
│   │   ├── utils/
│   │   │   ├── display.ts         ← Chalk colors, terminal formatting, tables
│   │   │   └── memory.ts          ← JSON memory: save, search, inject context
│   │   └── types/index.ts         ← TypeScript interfaces for everything
│   ├── .env.example               ← All environment variables documented
│   ├── package.json
│   └── tsconfig.json
│
├── website/                       ← Deploy this to Vercel
│   ├── src/app/
│   │   ├── page.tsx               ← Full landing page (hero, features, demo, install)
│   │   ├── layout.tsx             ← Root layout + SEO metadata
│   │   └── globals.css            ← Custom fonts, CSS vars, animations
│   ├── tailwind.config.js         ← Custom UFO color palette + keyframes
│   ├── next.config.js             ← Static export config
│   ├── vercel.json                ← Vercel deployment settings
│   └── package.json
│
├── package.json                   ← Monorepo root
└── README.md                      ← You are here
```

---

## ❓ FAQ

**Q: Do I need all the API keys?**
Only `ANTHROPIC_API_KEY` is required. Everything else has free fallbacks. DuckDuckGo replaces Serper for search. Public CoinGecko API handles all crypto without a key (with lower rate limits). GitHub public API works without a token for all read operations.

**Q: What does it cost to run?**
Claude Sonnet is roughly $0.003 per 1K input tokens + $0.015 per 1K output. A typical query costs $0.01–$0.05. Running it all day for research/crypto analysis = ~$1–2/day. Use `claude-haiku-4-5` to cut costs by ~10x.

**Q: Can I use it for automated trading?**
This agent is an **analysis tool**, not a trading bot. It gives you signals and data — acting on them is your decision. Never treat any output as financial advice.

**Q: Does it work on Windows?**
Yes, with Node.js 18+. Use **Windows Terminal** or **WSL** for best color rendering. PowerShell and cmd may display colors differently.

**Q: How many tool calls per query?**
Up to `MAX_ITERATIONS` (default 12). Simple queries use 1-2 tools. Deep crypto analysis uses 3-4. Multi-source research can use 6-8. The agent stops when it has sufficient data.

**Q: Is my data private?**
Queries go to Anthropic's API (Claude) and to whichever external APIs the agent calls (Binance, CoinGecko, GitHub, etc.). All of these are public APIs — you're not sending private data to them. Memory is stored locally in `.ufo_memory.json`. Nothing is sent to Talons Protocol.

**Q: Can I add my own tools?**
Yes. Add the tool schema to `src/tools/definitions.ts`, implement the function in the relevant tool file, and add the dispatch case in `src/agents/ufoAgent.ts`. The agent will automatically use your new tool when relevant.

**Q: Can I run it non-interactively?**
Yes, use the `--query` flag:
```bash
npm run dev -- --query "BTC price" --mode crypto
# Prints the answer and exits — good for scripting
```

---

## 🤝 Contributing

PRs welcome. Areas that need work:

- [ ] On-chain data tools (Etherscan, Solscan, Dune Analytics)
- [ ] Twitter/X sentiment analysis
- [ ] Portfolio tracker (track multiple coins)
- [ ] Export research reports to Markdown files
- [ ] Discord/Telegram notification webhooks
- [ ] More TA indicators (Ichimoku, Fibonacci, Volume Profile)
- [ ] LangChain integration option

**How to contribute:**

1. Fork the repo
2. Create a branch: `git checkout -b feature/my-tool`
3. Write your code (TypeScript, strict mode)
4. Test it: `npm run dev`
5. Make sure it builds: `npm run build`
6. Open a PR with a clear description

---

## 📄 License

MIT — see [LICENSE](./LICENSE).

---

<div align="center">

<br/>

**Built with 🛸 by [Talons Protocol](https://github.com/talons-protocol)**

<br/>

<img src="https://img.shields.io/badge/Powered%20by-Anthropic%20Claude-8B5CF6?style=for-the-badge&logo=anthropic&logoColor=white&labelColor=0a0a0a"/>
&nbsp;
<img src="https://img.shields.io/badge/Data-CoinGecko%20·%20Binance%20·%20GitHub-00FFD4?style=for-the-badge&labelColor=0a0a0a"/>

<br/><br/>

*"The truth is out there. So is the live data."* 👽

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer" width="100%"/>

</div>
