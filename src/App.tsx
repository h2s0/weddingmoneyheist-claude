import { useEffect, useRef, useState } from 'react'
import { useDashboardStore } from './stores'
import { DashboardGrid, WidgetRenderer } from './components/dashboard'
import type { WidgetId } from './types'

export function App() {
  const { theme, toggleTheme, resetLayouts } = useDashboardStore()
  const containerRef = useRef<HTMLDivElement>(null)
  const [gridWidth, setGridWidth] = useState(1200)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setGridWidth(entry.contentRect.width)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-bg text-ink transition-colors duration-300">
      <header className="flex items-center justify-between px-6 py-4 border-b border-[var(--line)]">
        <h1 className="font-display text-xl text-ink">아방이 — 아빠 포트폴리오</h1>
        <div className="flex gap-2">
          <button
            onClick={resetLayouts}
            className="px-3 py-1.5 rounded-sm bg-card border text-ink-soft text-sm hover:text-ink transition-colors"
          >
            초기화
          </button>
          <button
            onClick={toggleTheme}
            className="px-3 py-1.5 rounded-sm bg-card border text-ink-soft text-sm hover:text-ink transition-colors"
            aria-label="테마 전환"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main className="p-[18px]" ref={containerRef}>
        <DashboardGrid width={gridWidth}>
          {(id: WidgetId) => <WidgetRenderer id={id} />}
        </DashboardGrid>
      </main>
    </div>
  )
}
