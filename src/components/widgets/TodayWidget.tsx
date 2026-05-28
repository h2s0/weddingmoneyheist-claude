import { usePortfolioSummary } from '../../api'
import { WidgetCard, WidgetSkeleton, WidgetError } from '../common'
import { formatAmount, formatPct, isGain } from '../../lib'
import clsx from 'clsx'

export function TodayWidget() {
  const { data, isLoading, isError } = usePortfolioSummary()

  return (
    <WidgetCard title="오늘" emoji="✨">
      {isLoading && <WidgetSkeleton />}
      {isError && <WidgetError />}
      {data && (
        <div className="flex flex-col items-center justify-center h-full px-4 pb-4 gap-2">
          <p
            className={clsx(
              'font-display text-4xl',
              isGain(data.todayGain) ? 'text-gain' : 'text-loss',
            )}
          >
            {formatPct(data.todayGainPct)}
          </p>
          <p
            className={clsx(
              'font-num text-base',
              isGain(data.todayGain) ? 'text-gain' : 'text-loss',
            )}
          >
            {data.todayGain > 0 ? '+' : ''}{formatAmount(data.todayGain)}원
          </p>
        </div>
      )}
    </WidgetCard>
  )
}
