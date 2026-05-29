import { useState, useCallback } from 'react'
import { Responsive, WidthProvider, type Layout } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import { useDashboardStore } from '../../stores'
import type { DashboardLayout, WidgetId } from '../../types'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

const BREAKPOINTS = { lg: 1200, md: 768, sm: 480, xs: 0 }
const COLS = { lg: 12, md: 6, sm: 2, xs: 1 }

const MD_LAYOUTS: DashboardLayout[] = [
  { i: 'summary',      x: 0, y: 0,  w: 6, h: 3 },
  { i: 'today',        x: 0, y: 3,  w: 3, h: 3 },
  { i: 'bestworst',    x: 3, y: 3,  w: 3, h: 3 },
  { i: 'chart',        x: 0, y: 6,  w: 6, h: 3 },
  { i: 'allocation',   x: 0, y: 9,  w: 3, h: 3 },
  { i: 'mascot',       x: 3, y: 9,  w: 3, h: 3 },
  { i: 'holdings',     x: 0, y: 12, w: 6, h: 3 },
  { i: 'transactions', x: 0, y: 15, w: 6, h: 3 },
]

const SM_LAYOUTS: DashboardLayout[] = [
  { i: 'summary',      x: 0, y: 0,  w: 2, h: 4 },
  { i: 'today',        x: 0, y: 4,  w: 1, h: 3 },
  { i: 'bestworst',    x: 1, y: 4,  w: 1, h: 3 },
  { i: 'chart',        x: 0, y: 7,  w: 2, h: 4 },
  { i: 'allocation',   x: 0, y: 11, w: 1, h: 4 },
  { i: 'mascot',       x: 1, y: 11, w: 1, h: 4 },
  { i: 'holdings',     x: 0, y: 15, w: 2, h: 4 },
  { i: 'transactions', x: 0, y: 19, w: 2, h: 4 },
]

// xs 순서 — 모바일은 grid 대신 수직 스택으로 렌더링
const XS_ORDER: WidgetId[] = [
  'summary', 'today', 'bestworst', 'chart', 'allocation', 'mascot', 'holdings', 'transactions',
]

interface DashboardGridProps {
  children: (id: WidgetId) => React.ReactNode
}

export function DashboardGrid({ children }: DashboardGridProps) {
  const { layouts, visible, setLayouts } = useDashboardStore()
  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg')

  const visibleIds = (list: DashboardLayout[]) =>
    list.filter((l) => visible[l.i])

  const handleLayoutChange = useCallback(
    (_: Layout[], all: Record<string, Layout[]>) => {
      if (currentBreakpoint !== 'lg') return
      const next = (all['lg'] ?? []).map((l) => ({
        i: l.i as WidgetId,
        x: l.x,
        y: l.y,
        w: l.w,
        h: l.h,
        minW: layouts.find((o) => o.i === l.i)?.minW,
        minH: layouts.find((o) => o.i === l.i)?.minH,
      }))
      setLayouts(next)
    },
    [currentBreakpoint, layouts, setLayouts],
  )

  const isDraggable = currentBreakpoint === 'lg'

  // 모바일(xs): grid 없이 수직 스택 — 위젯이 내용 높이에 맞게 자동 확장
  if (currentBreakpoint === 'xs') {
    return (
      <div className="mobile-grid flex flex-col gap-[14px]">
        {XS_ORDER.filter((id) => visible[id]).map((id) => (
          <div key={id}>{children(id)}</div>
        ))}
      </div>
    )
  }

  const allLayouts = {
    lg: visibleIds(layouts),
    md: visibleIds(MD_LAYOUTS),
    sm: visibleIds(SM_LAYOUTS),
  }

  return (
    <ResponsiveReactGridLayout
      layouts={allLayouts}
      breakpoints={BREAKPOINTS}
      cols={COLS}
      rowHeight={76}
      draggableHandle=".drag-handle"
      isDraggable={isDraggable}
      isResizable={isDraggable}
      onLayoutChange={handleLayoutChange}
      onBreakpointChange={(bp) => setCurrentBreakpoint(bp)}
      margin={[14, 14]}
      containerPadding={[0, 0]}
      resizeHandles={['se']}
    >
      {visibleIds(layouts).map((l) => (
        <div key={l.i}>{children(l.i)}</div>
      ))}
    </ResponsiveReactGridLayout>
  )
}
