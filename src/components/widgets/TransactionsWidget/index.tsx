import clsx from 'clsx'
import { useTransactions } from '../../../api'
import { formatAmount } from '../../../lib'
import { WidgetCard, WidgetError, WidgetSkeleton } from '../../common'
import { TYPE_LABEL, TYPE_STYLE } from './constants'

export function TransactionsWidget() {
  const { data, isLoading, isError } = useTransactions()

  return (
    <WidgetCard title="매매 기록" emoji="📒">
      {isLoading && <WidgetSkeleton />}
      {isError && <WidgetError />}
      {data && data.length === 0 && (
        <div className="flex items-center justify-center h-full text-ink-faint text-sm">
          거래 내역 없음
        </div>
      )}
      {data && data.length > 0 && (
        <div className="overflow-auto h-full px-[22px] pb-4 flex flex-col gap-2">
          {data.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between py-2.5 border-b border-[var(--line)]"
            >
              <div className="flex items-center gap-2">
                <span
                  className={clsx(
                    'text-xs px-1.5 py-0.5 rounded font-medium flex-shrink-0',
                    TYPE_STYLE[tx.type],
                  )}
                >
                  {TYPE_LABEL[tx.type]}
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">{tx.name}</p>
                  <p className="text-xs text-ink-faint">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-num text-sm text-ink">{formatAmount(tx.amount)}원</p>
                <p className="font-num text-xs text-ink-soft">
                  {tx.quantity}주 × {tx.price.toLocaleString('ko-KR')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </WidgetCard>
  )
}
