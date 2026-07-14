import type { ReactNode } from 'react'
import 'react-grid-layout/css/styles.css'
import type { WidgetId } from '../../../types'
import {
  BREAKPOINTS,
  COLUMNS,
  MOBILE_WIDGET_ORDER,
  ResponsiveReactGridLayout,
} from './constants'
import { useDashboardGrid } from './index.hooks'

interface DashboardGridProps {
  children: (id: WidgetId) => ReactNode
}

export function DashboardGrid({ children }: DashboardGridProps) {
  const { currentBreakpoint, visible, visibleLayouts, handleLayoutChange } = useDashboardGrid()

  if (currentBreakpoint === 'md' || currentBreakpoint === 'sm') {
    const show = (id: WidgetId) => visible[id]

    return (
      <div className="tablet-grid flex flex-col gap-[14px]">
        <div className="flex gap-[14px]">
          {show('summary') && <div className="flex-[3] min-w-0">{children('summary')}</div>}
          {show('today') && <div className="flex-1 min-w-0">{children('today')}</div>}
          {show('bestworst') && <div className="flex-1 min-w-0">{children('bestworst')}</div>}
        </div>
        <div className="flex gap-[14px]">
          {show('chart') && <div className="flex-[5] min-w-0">{children('chart')}</div>}
          {show('allocation') && <div className="flex-[3] min-w-0">{children('allocation')}</div>}
        </div>
        {show('holdings') && <div>{children('holdings')}</div>}
        {show('transactions') && <div>{children('transactions')}</div>}
        {show('mascot') && <div>{children('mascot')}</div>}
      </div>
    )
  }

  if (currentBreakpoint === 'xs') {
    return (
      <div className="mobile-grid flex flex-col gap-[14px]">
        {MOBILE_WIDGET_ORDER.filter((id) => visible[id]).map((id) => (
          <div key={id}>{children(id)}</div>
        ))}
      </div>
    )
  }

  return (
    <ResponsiveReactGridLayout
      layouts={{ lg: visibleLayouts }}
      breakpoints={BREAKPOINTS}
      cols={COLUMNS}
      rowHeight={76}
      draggableHandle=".drag-handle"
      isDraggable
      isResizable
      onLayoutChange={handleLayoutChange}
      margin={[14, 14]}
      containerPadding={[0, 0]}
      resizeHandles={['se']}
    >
      {visibleLayouts.map((layout) => (
        <div key={layout.i}>{children(layout.i)}</div>
      ))}
    </ResponsiveReactGridLayout>
  )
}
