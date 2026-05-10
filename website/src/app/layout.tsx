import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Terminal of UFO — Multi-Capability AI Agent',
  description: 'A production-grade AI agent for your terminal. Web research, real-time crypto analysis with RSI/MACD, GitHub automation, and AI chat — powered by Claude.',
  keywords: ['AI agent', 'terminal', 'crypto analysis', 'github automation', 'web research', 'Claude AI', 'TypeScript'],
  authors: [{ name: 'Talons Protocol' }],
  openGraph: {
    title: 'Terminal of UFO — Multi-Capability AI Agent',
    description: 'Web Research · Crypto Analysis · GitHub Ops · AI Chat — all in one terminal agent',
    type: 'website',
    url: 'https://terminal-of-ufo.vercel.app',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terminal of UFO',
    description: 'Multi-capability AI agent: research, crypto, GitHub, chat',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🛸</text></svg>" />
      </head>
      <body className="bg-ufo-dark text-slate-200 font-body antialiased">
        {children}
      </body>
    </html>
  );
}
