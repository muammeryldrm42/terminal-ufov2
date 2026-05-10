'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Search, TrendingUp, Github, MessageSquare, Zap, Terminal,
  ChevronRight, Copy, Check, ExternalLink, Star, GitFork,
  Shield, Cpu, Globe, BarChart3, Code2, ArrowRight,
  Package, Settings, Play, BookOpen
} from 'lucide-react';

// ── Data ──────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: Search,
    color: '#00FFD4',
    label: 'Web Research',
    tag: '4 tools',
    desc: 'Real-time web search via Serper/Google or DuckDuckGo fallback. Full page content extraction, news search with NewsAPI, parallel multi-search for deep dives.',
    tools: ['web_search', 'fetch_page', 'search_news', 'multi_search'],
  },
  {
    icon: TrendingUp,
    color: '#F59E0B',
    label: 'Crypto Analysis',
    tag: '8 tools',
    desc: 'Live prices from CoinGecko. Full technical analysis from Binance: RSI, MACD, Bollinger Bands, ATR, SMA/EMA. Order book imbalance, trending coins, global market.',
    tools: ['binance_analysis', 'crypto_price', 'order_book', 'trending_coins', 'coin_details', 'crypto_history', 'top_coins', 'global_market'],
  },
  {
    icon: Github,
    color: '#8B5CF6',
    label: 'GitHub Automation',
    tag: '8 tools',
    desc: 'Deep repo analysis with language %, contributor stats, recent commits, releases. Profile analysis, issue management, PR tracking, repo comparison, and repo search.',
    tools: ['github_repo', 'github_profile', 'github_issues', 'github_prs', 'github_search', 'github_compare', 'github_repos', 'github_create_issue'],
  },
  {
    icon: MessageSquare,
    color: '#10B981',
    label: 'AI Chat',
    tag: 'Always on',
    desc: 'Full conversational AI powered by Claude. Persistent session history, technical explanations, code review, brainstorming. Seamlessly blends with tool calls.',
    tools: ['claude-3-5', 'context memory', 'multi-turn', 'chain-of-thought'],
  },
];

const INSTALL_STEPS = [
  {
    step: '01',
    title: 'Clone the Repository',
    desc: 'Get the code from GitHub and navigate into the project',
    code: `git clone https://github.com/talons-protocol/terminal-of-ufo
cd terminal-of-ufo/agent`,
  },
  {
    step: '02',
    title: 'Install Dependencies',
    desc: 'Install all required Node.js packages',
    code: `npm install`,
  },
  {
    step: '03',
    title: 'Configure Environment',
    desc: 'Copy the example config and add your Anthropic API key',
    code: `cp .env.example .env
# Edit .env and set ANTHROPIC_API_KEY=sk-ant-...`,
  },
  {
    step: '04',
    title: 'Launch the Agent',
    desc: 'Start in auto mode — the agent picks tools automatically',
    code: `npm run dev
# or launch directly in a specific mode:
npm run crypto   # Crypto analyst mode
npm run research # Web researcher mode
npm run github   # GitHub ops mode`,
  },
];

const MODES = [
  { num: '1', icon: '🔍', name: 'Research', color: '#00FFD4', desc: 'Web search, news, deep fact-finding with multi-source synthesis' },
  { num: '2', icon: '📈', name: 'Crypto',   color: '#F59E0B', desc: 'Prices, RSI/MACD, order book, multi-indicator trading signals' },
  { num: '3', icon: '🤖', name: 'Chat',     color: '#10B981', desc: 'General AI assistant with full session context' },
  { num: '4', icon: '🐙', name: 'GitHub',   color: '#8B5CF6', desc: 'Repos, issues, PRs, user analysis, repo comparison' },
  { num: '5', icon: '🛸', name: 'Auto',     color: '#E879F9', desc: 'Agent picks the right tools automatically for any query' },
];

const DEMO_LINES = [
  { delay: 0,    type: 'prompt', text: '🛸 Auto › ' },
  { delay: 0,    type: 'input',  text: 'Is Bitcoin bullish right now? Give me a full technical analysis.' },
  { delay: 400,  type: 'tool',   text: '⚡ binance_analysis (symbol=BTCUSDT, interval=4h)' },
  { delay: 900,  type: 'ok',     text: '✅ binance_analysis — RSI: 58.3 | MACD: +0.0042 | Trend: UP' },
  { delay: 1100, type: 'tool',   text: '⚡ crypto_price (coin_ids=bitcoin)' },
  { delay: 1600, type: 'ok',     text: '✅ crypto_price — $97,241 | +2.4% 24h | MCap: $1.92T' },
  { delay: 1800, type: 'tool',   text: '⚡ search_news (topic=Bitcoin market analysis 2025)' },
  { delay: 2400, type: 'ok',     text: '✅ search_news — 8 articles found' },
  { delay: 2800, type: 'sep',    text: '──────────────────────────────────────────────────────' },
  { delay: 3000, type: 'header', text: '🛸 UFO ›' },
  { delay: 3200, type: 'resp',   text: '## Bitcoin Technical Analysis — 4H Chart' },
  { delay: 3400, type: 'resp',   text: '' },
  { delay: 3600, type: 'resp',   text: '**Current Price:** $97,241 (+2.4% / 24h)' },
  { delay: 3800, type: 'resp',   text: '' },
  { delay: 4000, type: 'resp',   text: '| Indicator      | Value    | Signal          |' },
  { delay: 4100, type: 'resp',   text: '|----------------|----------|-----------------|' },
  { delay: 4200, type: 'resp',   text: '| RSI (14)       | 58.3     | 🟢 Neutral/Bullish |' },
  { delay: 4300, type: 'resp',   text: '| MACD           | +0.0042  | 🟢 Bullish crossover |' },
  { delay: 4400, type: 'resp',   text: '| SMA 20         | $94,820  | 🟢 Price above  |' },
  { delay: 4500, type: 'resp',   text: '| SMA 50         | $89,440  | 🟢 Price above  |' },
  { delay: 4600, type: 'resp',   text: '| Bollinger      | Not extended | ⚪ Mid range |' },
  { delay: 4800, type: 'resp',   text: '' },
  { delay: 5000, type: 'resp',   text: '**Overall: 🟢 BULLISH** — 4/5 indicators positive.' },
  { delay: 5200, type: 'resp',   text: 'Key resistance: $98,500. Support: $94,800.' },
  { delay: 5600, type: 'warn',   text: '⚠️  Not financial advice. Always DYOR.' },
];

const STATS = [
  { value: '20', label: 'Real-time Tools', icon: Zap },
  { value: '4', label: 'Agent Modes', icon: Cpu },
  { value: '100%', label: 'TypeScript', icon: Code2 },
  { value: '0', label: 'BS, Just Data', icon: Shield },
];

// ── Components ────────────────────────────────────────────────────────────────

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-ufo-darker/90 backdrop-blur-xl border-b border-ufo-border' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl animate-float">🛸</span>
          <span className="font-display text-sm font-bold text-ufo-cyan tracking-widest uppercase">Terminal of UFO</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'Install', 'Modes', 'Demo'].map(s => (
            <a key={s} href={`#${s.toLowerCase()}`}
              className="text-sm text-slate-400 hover:text-ufo-cyan transition-colors font-body">
              {s}
            </a>
          ))}
        </div>
        <a href="https://github.com/talons-protocol/terminal-of-ufo"
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-ufo-border bg-ufo-card hover:border-ufo-cyan/50 transition-all text-sm text-slate-300 hover:text-white">
          <Github size={15} />
          <span className="font-mono">GitHub</span>
        </a>
      </div>
    </nav>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy}
      className="absolute top-3 right-3 p-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all">
      {copied ? <Check size={14} className="text-ufo-cyan" /> : <Copy size={14} />}
    </button>
  );
}

function CodeBlock({ code, lang = 'bash' }: { code: string; lang?: string }) {
  return (
    <div className="relative group">
      <div className="flex items-center gap-2 px-4 py-2 bg-black/40 border-b border-ufo-border rounded-t-lg">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-amber-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <span className="text-xs text-slate-500 font-mono ml-2">{lang}</span>
      </div>
      <pre className="bg-black/60 rounded-b-lg p-4 overflow-x-auto text-sm font-mono text-ufo-cyan/90 leading-relaxed">
        <code>{code}</code>
      </pre>
      <CopyButton text={code} />
    </div>
  );
}

function TerminalDemo() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  const runDemo = () => {
    if (isRunning) return;
    setIsRunning(true);
    setVisibleLines([]);
    timerRefs.current.forEach(clearTimeout);
    timerRefs.current = [];

    DEMO_LINES.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
        if (i === DEMO_LINES.length - 1) setIsRunning(false);
      }, DEMO_LINES[i].delay + 200);
      timerRefs.current.push(t);
    });
  };

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isRunning && visibleLines.length === 0) runDemo();
    }, { threshold: 0.3 });
    const el = document.getElementById('terminal-demo');
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const getLineColor = (type: string) => {
    switch(type) {
      case 'prompt': return 'text-purple-400 font-bold';
      case 'input':  return 'text-white';
      case 'tool':   return 'text-amber-400';
      case 'ok':     return 'text-emerald-400';
      case 'sep':    return 'text-slate-600';
      case 'header': return 'text-ufo-cyan font-bold mt-2';
      case 'resp':   return 'text-slate-200';
      case 'warn':   return 'text-amber-400/80 italic';
      default:       return 'text-slate-300';
    }
  };

  return (
    <div id="terminal-demo" className="relative">
      {/* Terminal window */}
      <div className="rounded-xl border border-ufo-border overflow-hidden shadow-2xl shadow-ufo-cyan/5">
        <div className="flex items-center justify-between px-4 py-3 bg-black/60 border-b border-ufo-border">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-slate-500 font-mono">terminal — ufo-agent</span>
          <button onClick={runDemo}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono bg-ufo-cyan/10 text-ufo-cyan border border-ufo-cyan/30 hover:bg-ufo-cyan/20 transition-all disabled:opacity-40">
            <Play size={10} />
            {isRunning ? 'running...' : 'replay'}
          </button>
        </div>
        <div className="bg-[#090d13] p-5 min-h-[380px] font-mono text-sm leading-relaxed overflow-auto scanlines">
          {visibleLines.length === 0 && (
            <div className="flex items-center gap-2 text-slate-600">
              <Terminal size={14} />
              <span>Scroll into view to run demo...</span>
            </div>
          )}
          {visibleLines.map(i => {
            const line = DEMO_LINES[i];
            return (
              <div key={i} className={`${getLineColor(line.type)} ${i === visibleLines[visibleLines.length - 1] && isRunning ? 'cursor' : ''}`}
                style={{ animation: 'fadeIn 0.2s ease-out' }}>
                {line.type === 'prompt'
                  ? <><span className="text-purple-400 font-bold">{line.text}</span></>
                  : line.text}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen bg-ufo-dark">
      <NavBar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-100" />
        {/* Radial glow */}
        <div className="absolute inset-0 bg-radial-glow" />
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ufo-cyan/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-ufo-purple/5 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay:'2s'}} />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ufo-cyan/20 bg-ufo-cyan/5 text-ufo-cyan text-sm font-mono mb-8">
            <span className="w-2 h-2 rounded-full bg-ufo-cyan animate-pulse" />
            v2.0 — 20 tools · Claude-powered · Open Source
          </div>

          {/* Title */}
          <h1 className="font-display text-6xl md:text-8xl font-black mb-6 leading-none tracking-tight">
            <span className="gradient-text-cyan">TERMINAL</span>
            <br />
            <span className="text-slate-500 text-4xl md:text-5xl font-bold tracking-widest">OF</span>
            <br />
            <span className="gradient-text">UFO</span>
            <span className="text-ufo-amber text-5xl md:text-7xl ml-4 animate-float inline-block">🛸</span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-4 font-body leading-relaxed">
            A production-grade AI agent for your terminal.
            Not a chatbot — a real agent that <span className="text-ufo-cyan">uses live tools</span> to give you actual data.
          </p>
          <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto mb-12 font-mono">
            Web Research &nbsp;·&nbsp; Crypto Analysis &nbsp;·&nbsp; GitHub Ops &nbsp;·&nbsp; AI Chat
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="#install"
              className="flex items-center gap-3 px-8 py-4 rounded-xl bg-ufo-cyan text-ufo-dark font-display font-bold text-sm tracking-wider uppercase hover:bg-ufo-cyan/90 transition-all glow-cyan hover:scale-105">
              <Terminal size={18} />
              Get Started
              <ArrowRight size={16} />
            </a>
            <a href="https://github.com/talons-protocol/terminal-of-ufo"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 rounded-xl border border-ufo-border bg-ufo-card hover:border-ufo-purple/50 text-slate-300 hover:text-white font-display font-bold text-sm tracking-wider uppercase transition-all hover:scale-105">
              <Github size={18} />
              View on GitHub
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {STATS.map(({ value, label, icon: Icon }) => (
              <div key={label} className="glass-card rounded-xl p-4 text-center hover:border-ufo-cyan/30 transition-all">
                <Icon className="mx-auto mb-2 text-ufo-cyan" size={20} />
                <div className="font-display font-black text-2xl text-white mb-1">{value}</div>
                <div className="text-xs text-slate-500 font-mono">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600">
          <span className="text-xs font-mono tracking-widest uppercase">scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-ufo-cyan/40 to-transparent" />
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="font-mono text-ufo-cyan text-sm tracking-widest uppercase">Capabilities</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mt-3 mb-4">
              Real tools. <span className="gradient-text">Real data.</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Unlike wrappers that just chat, UFO Agent actively calls APIs, scrapes data, and reasons over live results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {FEATURES.map(({ icon: Icon, color, label, tag, desc, tools }) => (
              <div key={label}
                className="glass-card rounded-2xl p-8 hover:border-white/10 transition-all group relative overflow-hidden">
                {/* Background accent */}
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: color + '10', transform: 'translate(50%, -50%)' }} />

                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border"
                    style={{ backgroundColor: color + '15', borderColor: color + '30' }}>
                    <Icon size={22} style={{ color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display font-bold text-white text-lg">{label}</h3>
                      <span className="px-2 py-0.5 rounded-full text-xs font-mono border"
                        style={{ color, borderColor: color + '40', backgroundColor: color + '10' }}>
                        {tag}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-5">{desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {tools.map(t => (
                        <span key={t} className="px-2.5 py-1 rounded-lg bg-white/5 text-xs font-mono text-slate-400 border border-white/5 hover:border-white/20 transition-colors">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEMO ── */}
      <section id="demo" className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ufo-cyan/2 to-transparent" />
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-16">
            <span className="font-mono text-ufo-amber text-sm tracking-widest uppercase">Live Demo</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mt-3 mb-4">
              Watch it <span className="text-ufo-amber">think</span>
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto">
              Real tool calls, live data, genuine analysis — not cached responses.
            </p>
          </div>
          <TerminalDemo />
        </div>
      </section>

      {/* ── INSTALL ── */}
      <section id="install" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <span className="font-mono text-ufo-purple text-sm tracking-widest uppercase">Setup</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mt-3 mb-4">
              Up in <span className="gradient-text">4 steps</span>
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto">
              Only one API key required to get started. Everything else is optional.
            </p>
          </div>

          <div className="space-y-6">
            {INSTALL_STEPS.map(({ step, title, desc, code }) => (
              <div key={step} className="flex gap-6 group">
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-ufo-card border border-ufo-border flex items-center justify-center font-display font-black text-sm text-ufo-cyan group-hover:border-ufo-cyan/40 transition-colors">
                    {step}
                  </div>
                  <div className="w-px flex-1 bg-ufo-border mt-2 min-h-4" />
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="font-display font-bold text-white text-lg mb-1">{title}</h3>
                  <p className="text-slate-500 text-sm mb-4">{desc}</p>
                  <CodeBlock code={code} />
                </div>
              </div>
            ))}
          </div>

          {/* API key note */}
          <div className="mt-8 p-6 rounded-xl border border-ufo-amber/20 bg-ufo-amber/5">
            <div className="flex gap-3">
              <Shield className="flex-shrink-0 text-ufo-amber mt-0.5" size={18} />
              <div>
                <p className="text-sm font-semibold text-ufo-amber mb-1">Only ANTHROPIC_API_KEY is required</p>
                <p className="text-sm text-slate-400">
                  The agent works immediately with just your Anthropic key. Add GITHUB_TOKEN for write ops, COINGECKO_API_KEY for higher rate limits, and SERPER_API_KEY / NEWS_API_KEY for enhanced research.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MODES ── */}
      <section id="modes" className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ufo-purple/3 to-transparent" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <span className="font-mono text-ufo-green text-sm tracking-widest uppercase">Agent Modes</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mt-3 mb-4">
              Switch with a <span className="text-ufo-green">keypress</span>
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto">
              Type 1–5 to change mode instantly, or use @prefix for one-off queries.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4 mb-12">
            {MODES.map(({ num, icon, name, color, desc }) => (
              <div key={name} className="glass-card rounded-xl p-5 text-center hover:scale-105 transition-all group cursor-default">
                <div className="font-mono text-xs mb-3 text-slate-600">[{num}]</div>
                <div className="text-3xl mb-3 group-hover:animate-float">{icon}</div>
                <div className="font-display font-bold text-sm mb-2" style={{ color }}>{name}</div>
                <div className="text-xs text-slate-500 leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>

          {/* Mode prefix demo */}
          <div className="glass-card rounded-2xl p-8">
            <h3 className="font-display font-bold text-white mb-6 flex items-center gap-2">
              <Terminal size={18} className="text-ufo-cyan" />
              Mode shortcuts — use @ prefix from any mode
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { prefix: '@research', query: 'What happened in AI this week?', desc: 'Forces research mode for this query' },
                { prefix: '@crypto',   query: 'Analyze SOLUSDT 4h chart',       desc: 'Full technical analysis' },
                { prefix: '@github',   query: 'Compare vercel/next.js vs nuxt/nuxt', desc: 'Side-by-side repo comparison' },
                { prefix: '@chat',     query: 'Explain MACD in simple terms',   desc: 'Pure conversation, no tools' },
              ].map(({ prefix, query, desc }) => (
                <div key={prefix} className="bg-black/40 rounded-xl p-4 font-mono text-sm border border-white/5">
                  <div className="text-purple-400 mb-1">›</div>
                  <div>
                    <span className="text-ufo-cyan">{prefix}</span>
                    <span className="text-white"> {query}</span>
                  </div>
                  <div className="text-slate-600 text-xs mt-2">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ENV CONFIG ── */}
      <section id="config" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-ufo-cyan text-sm tracking-widest uppercase">Configuration</span>
            <h2 className="font-display text-4xl font-black text-white mt-3 mb-4">
              Everything in <span className="text-ufo-cyan">.env</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-display font-bold text-white text-lg mb-4 flex items-center gap-2">
                <Settings size={16} className="text-ufo-amber" />
                API Keys
              </h3>
              <div className="space-y-3">
                {[
                  { key: 'ANTHROPIC_API_KEY', req: true,  desc: 'Required. Get at console.anthropic.com', link: 'https://console.anthropic.com' },
                  { key: 'GITHUB_TOKEN',       req: false, desc: 'For issue creation + private repos', link: 'https://github.com/settings/tokens' },
                  { key: 'COINGECKO_API_KEY',  req: false, desc: 'Higher rate limits on crypto data', link: 'https://coingecko.com/en/api' },
                  { key: 'NEWS_API_KEY',        req: false, desc: 'Enhanced news search', link: 'https://newsapi.org' },
                  { key: 'SERPER_API_KEY',      req: false, desc: 'Google Search results', link: 'https://serper.dev' },
                ].map(({ key, req, desc, link }) => (
                  <div key={key} className="flex items-start gap-3 p-4 rounded-lg bg-ufo-card border border-ufo-border">
                    <span className={`flex-shrink-0 px-2 py-0.5 rounded text-xs font-mono mt-0.5 ${req ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-ufo-border text-slate-500'}`}>
                      {req ? 'required' : 'optional'}
                    </span>
                    <div>
                      <div className="font-mono text-ufo-cyan text-sm">{key}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{desc}</div>
                      <a href={link} target="_blank" rel="noopener noreferrer"
                        className="text-xs text-ufo-purple hover:text-ufo-cyan flex items-center gap-1 mt-1 transition-colors">
                        Get key <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display font-bold text-white text-lg mb-4 flex items-center gap-2">
                <Cpu size={16} className="text-ufo-purple" />
                Agent Settings
              </h3>
              <div className="space-y-3">
                {[
                  { key: 'AGENT_MODEL',      default: 'claude-opus-4-5', desc: 'Claude model. Use claude-haiku-4-5 for 10x cheaper' },
                  { key: 'MAX_TOKENS',       default: '4096',     desc: 'Max tokens per response' },
                  { key: 'MAX_ITERATIONS',   default: '12',       desc: 'Max tool calls per query' },
                  { key: 'TEMPERATURE',      default: '0.7',      desc: '0.0 = deterministic, 1.0 = creative' },
                  { key: 'ENABLE_MEMORY',    default: 'true',     desc: 'Persist memory across sessions' },
                  { key: 'MAX_MEMORY_ITEMS', default: '100',      desc: 'Max items stored in .ufo_memory.json' },
                  { key: 'VERBOSE_TOOLS',    default: 'true',     desc: 'Show tool calls in terminal output' },
                ].map(({ key, default: def, desc }) => (
                  <div key={key} className="flex items-center gap-3 p-4 rounded-lg bg-ufo-card border border-ufo-border">
                    <div className="flex-1">
                      <div className="font-mono text-ufo-purple text-sm">{key}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{desc}</div>
                    </div>
                    <span className="flex-shrink-0 font-mono text-xs text-slate-400 bg-white/5 px-2 py-1 rounded">{def}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ufo-cyan/5 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="text-6xl mb-6 animate-float">🛸</div>
          <h2 className="font-display text-4xl md:text-6xl font-black mb-6">
            <span className="gradient-text">The terminal</span>
            <br />
            <span className="text-white">that knows everything.</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            Start asking questions that need real answers. Live crypto data, current GitHub stats, breaking news — all from your terminal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#install"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-ufo-cyan text-ufo-dark font-display font-black text-sm tracking-wider uppercase hover:bg-ufo-cyan/90 transition-all glow-cyan hover:scale-105">
              <Package size={18} />
              Install Now
            </a>
            <a href="https://github.com/talons-protocol/terminal-of-ufo"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-ufo-border bg-ufo-card hover:border-ufo-purple/50 text-slate-300 hover:text-white font-display font-bold text-sm tracking-wider uppercase transition-all hover:scale-105">
              <Star size={18} />
              Star on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-ufo-border py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🛸</span>
            <div>
              <div className="font-display font-bold text-white text-sm tracking-widest">TERMINAL OF UFO</div>
              <div className="text-xs text-slate-500 font-mono">by Talons Protocol · MIT License</div>
            </div>
          </div>
          <div className="flex items-center gap-8">
            {[
              { label: 'GitHub', href: 'https://github.com/talons-protocol/terminal-of-ufo', icon: Github },
              { label: 'Docs', href: '#install', icon: BookOpen },
            ].map(({ label, href, icon: Icon }) => (
              <a key={label} href={href}
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-ufo-cyan transition-colors">
                <Icon size={15} />
                {label}
              </a>
            ))}
          </div>
          <div className="text-xs text-slate-600 font-mono text-center">
            Powered by <span className="text-ufo-purple">Anthropic Claude</span> · Built for builders
          </div>
        </div>
      </footer>
    </div>
  );
}
