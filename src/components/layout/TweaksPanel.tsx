import { useState } from 'react'
import { useDashboardStore } from '../../stores'
import type { WidgetId } from '../../types'
import clsx from 'clsx'

const WIDGET_LABELS: Record<WidgetId, string> = {
  summary:      '💰 아빠 자산',
  today:        '✨ 오늘',
  bestworst:    '🏆 효자/효녀',
  chart:        '📈 수익률 추이',
  allocation:   '🥧 자산 배분',
  holdings:     '🛒 보유 종목',
  transactions: '📒 매매 기록',
  mascot:       '💌 딸 한마디',
}

const WIDGET_IDS = Object.keys(WIDGET_LABELS) as WidgetId[]

export function TweaksPanel() {
  const [open, setOpen] = useState(false)
  const { visible, toggleWidget, resetLayouts } = useDashboardStore()

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="px-3 py-1.5 rounded-sm bg-card border border-[var(--line)] text-ink-soft text-sm hover:text-ink transition-colors"
        aria-expanded={open}
        aria-label="위젯 설정"
      >
        ⚙️ 위젯
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div
            className="absolute right-0 top-full mt-2 z-20 bg-card border border-[var(--line)] rounded-[var(--radius-sm)] shadow-md p-4 w-52"
          >
            <p className="text-xs text-ink-faint mb-3 font-medium">위젯 표시 설정</p>
            <div className="flex flex-col gap-2">
              {WIDGET_IDS.map((id) => (
                <label
                  key={id}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <div
                    className={clsx(
                      'w-4 h-4 rounded flex-shrink-0 border transition-colors',
                      visible[id]
                        ? 'bg-pink-deep border-pink-deep'
                        : 'bg-transparent border-[var(--line-strong)]',
                    )}
                    onClick={() => toggleWidget(id)}
                    role="checkbox"
                    aria-checked={visible[id]}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && toggleWidget(id)}
                  >
                    {visible[id] && (
                      <svg viewBox="0 0 16 16" fill="none" className="w-full h-full p-0.5">
                        <path d="M3 8l3.5 3.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-ink group-hover:text-ink transition-colors">
                    {WIDGET_LABELS[id]}
                  </span>
                </label>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-[var(--line)]">
              <button
                onClick={() => { resetLayouts(); setOpen(false) }}
                className="w-full text-xs text-ink-soft hover:text-ink transition-colors text-left"
              >
                레이아웃 초기화
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
