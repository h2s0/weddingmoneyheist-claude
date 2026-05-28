import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['attribute', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-soft': 'var(--bg-soft)',
        card: 'var(--card)',
        'card-soft': 'var(--card-soft)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        'ink-faint': 'var(--ink-faint)',
        pink: 'var(--pink)',
        'pink-deep': 'var(--pink-deep)',
        mint: 'var(--mint)',
        'mint-deep': 'var(--mint-deep)',
        coral: 'var(--coral)',
        'coral-deep': 'var(--coral-deep)',
        yellow: 'var(--yellow)',
        'yellow-deep': 'var(--yellow-deep)',
        lav: 'var(--lav)',
        'lav-deep': 'var(--lav-deep)',
        sky: 'var(--sky)',
        'sky-deep': 'var(--sky-deep)',
        gain: 'var(--gain)',
        'gain-bg': 'var(--gain-bg)',
        loss: 'var(--loss)',
        'loss-bg': 'var(--loss-bg)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius)',
        lg: 'var(--radius-lg)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lift: 'var(--shadow-lift)',
      },
      borderColor: {
        DEFAULT: 'var(--line)',
        strong: 'var(--line-strong)',
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'sans-serif'],
        display: ['Jua', 'Pretendard', 'sans-serif'],
        gaegu: ['Gaegu', 'cursive'],
      },
    },
  },
  plugins: [],
} satisfies Config
