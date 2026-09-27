/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian:   { DEFAULT: '#0F172A', 800: '#131B2E' },
        navy:       { DEFAULT: '#1E293B', light: '#24304A', deep: '#0F172A' },
        orange:     { DEFAULT: '#FF7A00', light: '#F97316', glow: '#FF9A40' },
        emerald:    { DEFAULT: '#10B981' },
        cyan:       { DEFAULT: '#06B6D4' },
        slate:      { DEFAULT: '#94A3B8', light: '#CBD5E1' },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      borderRadius: {
        xl:  '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'card-glow': 'linear-gradient(135deg, rgba(255,122,0,0.08) 0%, rgba(6,182,212,0.04) 100%)',
      },
      boxShadow: {
        'orange-glow': '0 0 20px rgba(255,122,0,0.35)',
        'cyan-glow':   '0 0 20px rgba(6,182,212,0.25)',
        'card':        '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover':  '0 8px 32px rgba(0,0,0,0.6)',
      },
      animation: {
        'pulse-slow':  'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'float':       'float 3s ease-in-out infinite',
        'slide-up':    'slideUp 0.3s ease-out',
        'fade-in':     'fadeIn 0.4s ease-out',
      },
      keyframes: {
        float:    { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-6px)' } },
        slideUp:  { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:   { from: { opacity: 0 }, to: { opacity: 1 } },
      },
    },
  },
  plugins: [],
}
