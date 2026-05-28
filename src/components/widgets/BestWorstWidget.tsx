import { useMemo } from 'react'
import { useHoldings } from '../../api'
import { WidgetCard, WidgetSkeleton, WidgetError } from '../common'
import { formatPct, formatAmount, isGain } from '../../lib'
import clsx from 'clsx'

export function BestWorstWidget() {
  const { data, isLoading, isError } = useHoldings()

  const { best, worst } = useMemo(() => {
    if (!data || data.length === 0) return { best: null, worst: null }
    const sorted = [...data].sort((a, b) => b.todayGainPct - a.todayGainPct)
    return { best: sorted[0], worst: sorted[sorted.length - 1] }
  }, [data])

  return (
    <WidgetCard title="오늘의 효자/효녀" emoji="🏆">
      {isLoading && <WidgetSkeleton />}
      {isError && <WidgetError />}
      {data && !best && (
        <div className="flex items-center justify-center h-full text-ink-faint text-sm">
          보유 종목 없음
        </div>
      )}
      {best && worst && (
        <div className="flex flex-col gap-3 px-[22px] py-4 h-full">
          {[
            { label: '효자 📈', item: best },
            { label: '효녀 📉', item: worst },
          ].map(({ label, item }) => (
            <div
              key={item.id}
              className={clsx(
                'flex items-center justify-between rounded-sm px-3 py-2',
                isGain(item.todayGain) ? 'bg-gain-bg' : 'bg-loss-bg',
              )}
            >
              <div>
                <p className="text-xs text-ink-soft mb-0.5">{label}</p>
                <p className="text-sm font-medium text-ink">{item.name}</p>
              </div>
              <div className="text-right">
                <p
                  className={clsx(
                    'font-num text-sm font-medium',
                    isGain(item.todayGain) ? 'text-gain' : 'text-loss',
                  )}
                >
                  {formatPct(item.todayGainPct)}
                </p>
                <p className="font-num text-xs text-ink-soft">
                  {item.todayGain > 0 ? '+' : ''}{formatAmount(item.todayGain)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </WidgetCard>
  )
}
