import clsx from 'clsx'
import { useHoldings } from '../../../api'
import { formatAmount, formatPct, formatPrice, isGain } from '../../../lib'
import { WidgetCard, WidgetError, WidgetSkeleton } from '../../common'

export function HoldingsWidget() {
  const { data, isLoading, isError } = useHoldings()

  return (
    <WidgetCard title="보유 종목" emoji="🛒">
      {isLoading && <WidgetSkeleton />}
      {isError && <WidgetError />}
      {data && data.length === 0 && (
        <div className="flex items-center justify-center h-full text-ink-faint text-sm">
          보유 종목 없음
        </div>
      )}
      {data && data.length > 0 && (
        <div className="overflow-auto h-full px-[22px] pb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-ink-faint text-xs border-b border-[var(--line)]">
                <th className="text-left py-2 font-normal">종목</th>
                <th className="text-right py-2 font-normal font-num">현재가</th>
                <th className="text-right py-2 font-normal font-num">평가금액</th>
                <th className="text-right py-2 font-normal font-num">수익률</th>
                <th className="text-right py-2 font-normal font-num">비중</th>
              </tr>
            </thead>
            <tbody>
              {data.map((holding) => (
                <tr
                  key={holding.id}
                  className="border-b border-[var(--line)] hover:bg-bg-soft transition-colors"
                >
                  <td className="py-2.5">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: holding.color }}
                      />
                      <div>
                        <p className="font-medium text-ink">{holding.name}</p>
                        <p className="text-xs text-ink-faint">{holding.ticker}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-right py-2.5 font-num text-ink">
                    {formatPrice(holding.currentPrice)}
                  </td>
                  <td className="text-right py-2.5 font-num text-ink">
                    {formatAmount(holding.value)}
                  </td>
                  <td className="text-right py-2.5">
                    <span
                      className={clsx(
                        'font-num text-xs px-1.5 py-0.5 rounded',
                        isGain(holding.gainPct) ? 'text-gain bg-gain-bg' : 'text-loss bg-loss-bg',
                      )}
                    >
                      {formatPct(holding.gainPct)}
                    </span>
                  </td>
                  <td className="text-right py-2.5 font-num text-ink-soft text-xs">
                    {holding.allocationPct.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </WidgetCard>
  )
}
