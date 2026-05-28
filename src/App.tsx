import { useState } from 'react'

export function App() {
  const [dark, setDark] = useState(false)

  return (
    <div data-theme={dark ? 'dark' : undefined} className="min-h-screen bg-bg text-ink p-8">
      <button
        onClick={() => setDark((d) => !d)}
        className="px-4 py-2 rounded bg-card shadow-sm border text-ink-soft text-sm"
      >
        {dark ? '☀️ 라이트' : '🌙 다크'}
      </button>
      <h1 className="font-display text-3xl mt-6">아방이 — 아빠 포트폴리오</h1>
      <div className="mt-4 flex gap-3">
        <span className="px-3 py-1 rounded-sm bg-gain-bg text-gain text-sm font-num">+1,234,567</span>
        <span className="px-3 py-1 rounded-sm bg-loss-bg text-loss text-sm font-num">-234,567</span>
        <span className="px-3 py-1 rounded-sm bg-card-soft text-ink-soft text-sm">카드</span>
      </div>
    </div>
  )
}
