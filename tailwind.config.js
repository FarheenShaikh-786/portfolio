/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00f5ff',
        secondary: '#7a5cff',
        accent: '#ff4ecd',
        'bg-deep': '#050816',
        'bg-elevated': 'rgba(8, 12, 32, 0.78)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'sans-serif'],
        display: ['Space Grotesk', 'Poppins', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': [
          'clamp(2.75rem, 6vw, 4rem)',
          { lineHeight: '1.05', letterSpacing: '-0.035em', fontWeight: '700' },
        ],
        'display-lg': [
          'clamp(2rem, 4vw, 3rem)',
          { lineHeight: '1.12', letterSpacing: '-0.03em' },
        ],
      },
      boxShadow: {
        glow: '0 0 48px rgba(0,245,255,0.35), 0 0 96px rgba(122,92,255,0.2)',
        'glow-soft': '0 0 32px rgba(122,92,255,0.35), 0 0 64px rgba(255,78,205,0.12)',
        'glow-pink': '0 0 40px rgba(255,78,205,0.35)',
        neon: '0 0 20px rgba(0,245,255,0.5), 0 0 40px rgba(122,92,255,0.3)',
      },
      backgroundImage: {
        'grid-slate':
          'radial-gradient(circle at 1px 1px, rgba(0,245,255,0.08) 1px, transparent 0)',
        'gradient-mesh':
          'linear-gradient(135deg, rgba(0,245,255,0.15) 0%, transparent 45%), linear-gradient(225deg, rgba(122,92,255,0.18) 0%, transparent 50%), linear-gradient(315deg, rgba(255,78,205,0.1) 0%, transparent 40%)',
      },
      keyframes: {
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        ripple: {
          '0%': { transform: 'translate(-50%, -50%) scale(0)', opacity: '0.45' },
          '100%': { transform: 'translate(-50%, -50%) scale(2.4)', opacity: '0' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'spin-slow': 'spin-slow 10s linear infinite',
        ripple: 'ripple 0.65s ease-out forwards',
        'gradient-shift': 'gradient-shift 14s ease infinite',
        float: 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
