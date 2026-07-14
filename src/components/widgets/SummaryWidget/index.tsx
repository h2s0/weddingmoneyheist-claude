import clsx from 'clsx'
import { usePortfolioSummary } from '../../../api'
import { formatAmount, formatKRW, formatPct, isGain } from '../../../lib'
import { WidgetCard, WidgetError, WidgetSkeleton } from '../../common'

export function SummaryWidget() {
  const { data, isLoading, isError } = usePortfolioSummary()

  return (
    <WidgetCard title="아빠 자산" emoji="💰">
      {isLoading && <WidgetSkeleton />}
      {isError && <WidgetError />}
      {data && (
        <div className="flex flex-col gap-4 px-[22px] py-4 h-full">
          <div>
            <p className="text-ink-soft text-xs mb-1">총 자산</p>
            <p className="font-display text-3xl text-ink font-num">
              {formatKRW(data.totalAssets)}
            </p>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <p className="text-ink-soft text-xs mb-0.5">주식</p>
              <p className="font-num text-base text-ink">{formatAmount(data.holdings)}</p>
            </div>
            <div className="flex-1">
              <p className="text-ink-soft text-xs mb-0.5">현금</p>
              <p className="font-num text-base text-ink">{formatAmount(data.cash)}</p>
            </div>
          </div>

          <div className="flex gap-4 mt-auto">
            <div className="flex-1 rounded-sm px-3 py-2" style={{ background: 'var(--gain-bg)' }}>
              <p className="text-xs mb-0.5" style={{ color: 'var(--ink-soft)' }}>총 수익</p>
              <p
                className={clsx(
                  'font-num text-sm font-medium',
                  isGain(data.totalGain) ? 'text-gain' : 'text-loss',
                )}
              >
                {formatPct(data.totalGainPct)} ({formatAmount(data.totalGain)})
              </p>
            </div>
            <div
              className={clsx(
                'flex-1 rounded-sm px-3 py-2',
                isGain(data.todayGain) ? 'bg-gain-bg' : 'bg-loss-bg',
              )}
            >
              <p className="text-xs text-ink-soft mb-0.5">오늘</p>
              <p
                className={clsx(
                  'font-num text-sm font-medium',
                  isGain(data.todayGain) ? 'text-gain' : 'text-loss',
                )}
              >
                {formatPct(data.todayGainPct)} ({formatAmount(data.todayGain)})
              </p>
            </div>
          </div>
        </div>
      )}
    </WidgetCard>
  )
}
