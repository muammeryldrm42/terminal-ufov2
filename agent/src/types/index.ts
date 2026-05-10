// ============================================================
// 🛸 Terminal of UFO — Type Definitions
// ============================================================

export interface Tool {
  name: string;
  description: string;
  input_schema: {
    type: "object";
    properties: Record<string, ToolProperty>;
    required: string[];
  };
}

export interface ToolProperty {
  type: string;
  description: string;
  enum?: string[];
  items?: { type: string };
  default?: unknown;
}

export interface ToolResult {
  success: boolean;
  data?: unknown;
  error?: string;
  cached?: boolean;
  latencyMs?: number;
}

export interface AgentConfig {
  model: string;
  maxTokens: number;
  maxIterations: number;
  temperature: number;
  enableMemory: boolean;
  verboseTools: boolean;
  showBanner: boolean;
}

export interface MemoryItem {
  id: string;
  timestamp: string;
  type: "research" | "crypto" | "github" | "chat";
  query: string;
  summary: string;
  tags: string[];
  toolsUsed?: string[];
}

export interface AgentMemory {
  items: MemoryItem[];
  lastUpdated: string;
  totalQueries: number;
}

export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency?: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  circulating_supply: number;
  ath: number;
  ath_change_percentage: number;
}

export interface TechnicalIndicators {
  rsi14: number;
  macd: number;
  macdSignal: number;
  macdHistogram: number;
  sma20: number;
  sma50: number;
  ema9: number;
  bollingerUpper: number;
  bollingerLower: number;
  bollingerMid: number;
  atr14: number;
  trend: "STRONG_UP" | "UP" | "NEUTRAL" | "DOWN" | "STRONG_DOWN";
  signals: TradingSignal[];
}

export interface TradingSignal {
  indicator: string;
  signal: "BUY" | "SELL" | "NEUTRAL";
  strength: "STRONG" | "MODERATE" | "WEAK";
  reason: string;
}

export interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  open_issues_count: number;
  topics: string[];
}

export interface GitHubIssue {
  number: number;
  title: string;
  state: string;
  html_url: string;
  created_at: string;
  user: { login: string };
  labels: Array<{ name: string; color: string }>;
  body: string | null;
}

export interface WebSearchResult {
  title: string;
  url: string;
  snippet: string;
  source?: string;
  publishedAt?: string;
}

export interface AgentMessage {
  role: "user" | "assistant";
  content: string | ContentBlock[];
}

export interface ContentBlock {
  type: "text" | "tool_use" | "tool_result";
  text?: string;
  id?: string;
  name?: string;
  input?: Record<string, unknown>;
  tool_use_id?: string;
  content?: string | ContentBlock[];
}

export type AgentModeType = "chat" | "research" | "crypto" | "github" | "auto";

export interface AgentStats {
  totalQueries: number;
  totalToolCalls: number;
  sessionStart: Date;
  currentMode: AgentModeType;
  memoryItems: number;
}

export interface PlanStep {
  tool: string;
  reason: string;
  dependsOn?: string[];
}
