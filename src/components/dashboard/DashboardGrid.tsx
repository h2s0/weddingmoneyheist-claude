import { useCallback } from 'react'
import ReactGridLayout, { type Layout } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import { useDashboardStore } from '../../stores'
import type { DashboardLayout, WidgetId } from '../../types'

interface DashboardGridProps {
  children: (id: WidgetId) => React.ReactNode
  width: number
}

export function DashboardGrid({ children, width }: DashboardGridProps) {
  const { layouts, visible, setLayouts } = useDashboardStore()

  const visibleLayouts = layouts.filter((l) => visible[l.i])

  const handleLayoutChange = useCallback(
    (next: Layout[]) => {
      const updated: DashboardLayout[] = next.map((l) => ({
        i: l.i as WidgetId,
        x: l.x,
        y: l.y,
        w: l.w,
        h: l.h,
        minW: layouts.find((o) => o.i === l.i)?.minW,
        minH: layouts.find((o) => o.i === l.i)?.minH,
      }))
      setLayouts(updated)
    },
    [layouts, setLayouts],
  )

  return (
    <ReactGridLayout
      layout={visibleLayouts}
      cols={12}
      rowHeight={88}
      width={width}
      draggableHandle=".drag-handle"
      onLayoutChange={handleLayoutChange}
      margin={[18, 18]}
      containerPadding={[0, 0]}
      resizeHandles={['se']}
    >
      {visibleLayouts.map((l) => (
        <div key={l.i}>{children(l.i)}</div>
      ))}
    </ReactGridLayout>
  )
}
