import clsx from 'clsx'
import { WIDGET_IDS, WIDGET_LABELS } from './constants'
import { useTweaksPanel } from './index.hooks'

export function TweaksPanel() {
  const {
    open,
    visible,
    toggleWidget,
    togglePanel,
    closePanel,
    resetAndClose,
  } = useTweaksPanel()

  return (
    <div className="relative">
      <button
        onClick={togglePanel}
        className="px-3 py-1.5 rounded-sm bg-card border border-[var(--line)] text-ink-soft text-sm hover:text-ink transition-colors"
        aria-expanded={open}
        aria-label="위젯 설정"
      >
        ⚙️ 위젯
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={closePanel} aria-hidden />
          <div className="absolute right-0 top-full mt-2 z-20 bg-card border border-[var(--line)] rounded-[var(--radius-sm)] shadow-md p-4 w-52">
            <p className="text-xs text-ink-faint mb-3 font-medium">위젯 표시 설정</p>
            <div className="flex flex-col gap-2">
              {WIDGET_IDS.map((id) => (
                <label key={id} className="flex items-center gap-2 cursor-pointer group">
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
                    onKeyDown={(event) => event.key === 'Enter' && toggleWidget(id)}
                  >
                    {visible[id] && (
                      <svg viewBox="0 0 16 16" fill="none" className="w-full h-full p-0.5">
                        <path
                          d="M3 8l3.5 3.5L13 4.5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
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
                onClick={resetAndClose}
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
