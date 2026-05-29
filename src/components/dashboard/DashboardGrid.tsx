import { useState, useCallback, useEffect } from 'react'
import { Responsive, WidthProvider, type Layout } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import { useDashboardStore } from '../../stores'
import type { DashboardLayout, WidgetId } from '../../types'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

const BREAKPOINTS = { lg: 1200, md: 768, sm: 480, xs: 0 }
const COLS = { lg: 12, md: 6, sm: 2, xs: 1 }

function getBreakpoint(w: number) {
  if (w >= 1200) return 'lg'
  if (w >= 768) return 'md'
  if (w >= 480) return 'sm'
  return 'xs'
}

// xs 순서 — 모바일은 grid 대신 수직 스택으로 렌더링
const XS_ORDER: WidgetId[] = [
  'summary', 'today', 'bestworst', 'chart', 'allocation', 'holdings', 'transactions', 'mascot',
]

interface DashboardGridProps {
  children: (id: WidgetId) => React.ReactNode
}

export function DashboardGrid({ children }: DashboardGridProps) {
  const { layouts, visible, setLayouts } = useDashboardStore()
  const [currentBreakpoint, setCurrentBreakpoint] = useState(() =>
    typeof window !== 'undefined' ? getBreakpoint(window.innerWidth) : 'lg',
  )

  useEffect(() => {
    const onResize = () => setCurrentBreakpoint(getBreakpoint(window.innerWidth))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

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

  // 태블릿(md/sm): react-grid-layout bypass → flexbox로 직접 배치
  // holdings/transactions 높이 자동 확장, 딸 한마디 맨 아래
  if (currentBreakpoint === 'md' || currentBreakpoint === 'sm') {
    const show = (id: WidgetId) => visible[id]
    const gap = 'gap-[14px]'
    return (
      <div className="tablet-grid flex flex-col gap-[14px]">
        {/* Row 1: summary(넓게) + 오늘 + MVP/꼴찌 */}
        <div className={`flex ${gap}`}>
          {show('summary')   && <div className="flex-[3] min-w-0">{children('summary')}</div>}
          {show('today')     && <div className="flex-1 min-w-0">{children('today')}</div>}
          {show('bestworst') && <div className="flex-1 min-w-0">{children('bestworst')}</div>}
        </div>
        {/* Row 2: 수익률 추이(더 넓게) + 자산 배분 */}
        <div className={`flex ${gap}`}>
          {show('chart')      && <div className="flex-[5] min-w-0">{children('chart')}</div>}
          {show('allocation') && <div className="flex-[3] min-w-0">{children('allocation')}</div>}
        </div>
        {/* 보유 종목 — 내용에 따라 높이 자동 확장 */}
        {show('holdings')     && <div>{children('holdings')}</div>}
        {/* 매매 기록 — 내용에 따라 높이 자동 확장 */}
        {show('transactions') && <div>{children('transactions')}</div>}
        {/* 딸 한마디 — 맨 아래 */}
        {show('mascot')       && <div>{children('mascot')}</div>}
      </div>
    )
  }

  // 모바일(xs): 완전 수직 스택
  if (currentBreakpoint === 'xs') {
    return (
      <div className="mobile-grid flex flex-col gap-[14px]">
        {XS_ORDER.filter((id) => visible[id]).map((id) => (
          <div key={id}>{children(id)}</div>
        ))}
      </div>
    )
  }

  // 데스크탑(lg): react-grid-layout
  return (
    <ResponsiveReactGridLayout
      layouts={{ lg: visibleIds(layouts) }}
      breakpoints={BREAKPOINTS}
      cols={COLS}
      rowHeight={76}
      draggableHandle=".drag-handle"
      isDraggable
      isResizable
      onLayoutChange={handleLayoutChange}
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
