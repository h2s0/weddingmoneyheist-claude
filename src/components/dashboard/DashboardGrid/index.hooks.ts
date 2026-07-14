import { useCallback, useEffect, useState } from 'react'
import type { Layout } from 'react-grid-layout'
import { useDashboardStore } from '../../../stores'
import type { WidgetId } from '../../../types'

type DashboardBreakpoint = 'lg' | 'md' | 'sm' | 'xs'

function getBreakpoint(width: number): DashboardBreakpoint {
  if (width >= 1200) return 'lg'
  if (width >= 768) return 'md'
  if (width >= 480) return 'sm'
  return 'xs'
}

export function useDashboardGrid() {
  const { layouts, visible, setLayouts } = useDashboardStore()
  const [currentBreakpoint, setCurrentBreakpoint] = useState<DashboardBreakpoint>(() =>
    typeof window !== 'undefined' ? getBreakpoint(window.innerWidth) : 'lg',
  )

  useEffect(() => {
    const onResize = () => setCurrentBreakpoint(getBreakpoint(window.innerWidth))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleLayoutChange = useCallback(
    (_: Layout[], allLayouts: Record<string, Layout[]>) => {
      if (currentBreakpoint !== 'lg') return

      const nextLayouts = (allLayouts.lg ?? [])
        .filter((layout) => layout.i in visible)
        .map((layout) => ({
          i: layout.i as WidgetId,
          x: layout.x,
          y: layout.y,
          w: layout.w,
          h: layout.h,
          minW: layouts.find((item) => item.i === layout.i)?.minW,
          minH: layouts.find((item) => item.i === layout.i)?.minH,
        }))
      setLayouts(nextLayouts)
    },
    [currentBreakpoint, layouts, setLayouts, visible],
  )

  return {
    currentBreakpoint,
    visible,
    visibleLayouts: layouts.filter((layout) => visible[layout.i]),
    handleLayoutChange,
  }
}
