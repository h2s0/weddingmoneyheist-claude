import { useEffect } from 'react'
import { useDashboardStore } from './stores'
import { DashboardGrid, WidgetRenderer } from './components/dashboard'
import { TweaksPanel } from './components/layout'
import type { WidgetId } from './types'

export function App() {
  const { theme, toggleTheme } = useDashboardStore()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className="min-h-screen bg-bg text-ink transition-colors duration-300">
      <header className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-[var(--line)] sticky top-0 bg-bg z-30">
        <h1 className="font-display text-lg sm:text-xl text-ink truncate">
          아방이 — 아빠 포트폴리오
        </h1>
        <div className="flex gap-2 flex-shrink-0">
          <TweaksPanel />
          <button
            onClick={toggleTheme}
            className="px-3 py-1.5 rounded-sm bg-card border border-[var(--line)] text-ink-soft text-sm hover:text-ink transition-colors"
            aria-label="테마 전환"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main className="p-[14px] sm:p-[18px]">
        <DashboardGrid>
          {(id: WidgetId) => <WidgetRenderer id={id} />}
        </DashboardGrid>
      </main>
    </div>
  )
}
