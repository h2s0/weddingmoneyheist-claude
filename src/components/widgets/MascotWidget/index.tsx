import { WidgetCard, WidgetSkeleton } from '../../common'
import { PigMascot } from './PigMascot'
import { useMascotWidget } from './index.hooks'

export function MascotWidget() {
  const { data, isLoading, mood, message } = useMascotWidget()

  return (
    <WidgetCard title="딸 한마디" emoji="💌">
      {isLoading && <WidgetSkeleton />}
      {data !== undefined && (
        <div className="flex items-center gap-4 px-[22px] py-4 h-full">
          <div className="flex-shrink-0">
            <PigMascot mood={mood} />
          </div>
          <div
            className="relative flex-1 bg-bg-soft rounded-[var(--radius-sm)] px-4 py-3 text-sm text-ink"
            style={{ fontFamily: "'Gaegu', cursive", fontSize: '15px', lineHeight: 1.6 }}
          >
            <div
              className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 w-0 h-0"
              style={{
                borderTop: '8px solid transparent',
                borderBottom: '8px solid transparent',
                borderRight: '10px solid var(--bg-soft)',
              }}
            />
            {message}
          </div>
        </div>
      )}
    </WidgetCard>
  )
}
