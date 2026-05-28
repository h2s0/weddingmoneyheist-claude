import { useEffect, useRef, useState } from 'react'
import { useDashboardStore } from './stores'
import { DashboardGrid, WidgetRenderer } from './components/dashboard'
import { TweaksPanel } from './components/layout'
import type { WidgetId } from './types'

export function App() {
  const { theme, toggleTheme } = useDashboardStore()
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
      <header className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-[var(--line)] sticky top-0 bg-bg z-30 backdrop-blur-sm">
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

      <main
        className="p-[10px] sm:p-[18px] overflow-x-auto"
        ref={containerRef}
      >
        <div className="min-w-[600px]">
          <DashboardGrid width={gridWidth}>
            {(id: WidgetId) => <WidgetRenderer id={id} />}
          </DashboardGrid>
        </div>
      </main>
    </div>
  )
}
