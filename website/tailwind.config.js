/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ufo: {
          cyan:   '#00FFD4',
          purple: '#8B5CF6',
          amber:  '#F59E0B',
          green:  '#10B981',
          red:    '#EF4444',
          dark:   '#030712',
          darker: '#010409',
          card:   '#0d1117',
          border: '#1a2332',
          muted:  '#6B7280',
        },
      },
      fontFamily: {
        mono:    ['var(--font-mono)', 'JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['var(--font-display)', 'Orbitron', 'sans-serif'],
        body:    ['var(--font-body)', 'DM Sans', 'sans-serif'],
      },
      animation: {
        'glow':        'glow 3s ease-in-out infinite alternate',
        'scan':        'scan 4s linear infinite',
        'float':       'float 6s ease-in-out infinite',
        'pulse-slow':  'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'flicker':     'flicker 5s linear infinite',
        'slide-up':    'slideUp 0.6s ease-out forwards',
        'fade-in':     'fadeIn 0.8s ease-out forwards',
        'typewriter':  'typewriter 3s steps(40) forwards',
        'cursor-blink':'blink 1s step-end infinite',
      },
      keyframes: {
        glow:       { '0%': { boxShadow: '0 0 20px #00FFD440' }, '100%': { boxShadow: '0 0 40px #00FFD480, 0 0 80px #00FFD420' } },
        scan:       { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(100vh)' } },
        float:      { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        flicker:    { '0%,19%,21%,23%,25%,54%,56%,100%': { opacity: '1' }, '20%,24%,55%': { opacity: '0.4' } },
        slideUp:    { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:     { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        typewriter: { 'from': { width: '0' }, 'to': { width: '100%' } },
        blink:      { '0%,100%': { borderColor: 'transparent' }, '50%': { borderColor: '#00FFD4' } },
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.03)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
        'radial-glow': 'radial-gradient(ellipse at center, rgba(0,255,212,0.08) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
};
