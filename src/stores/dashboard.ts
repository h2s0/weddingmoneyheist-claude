import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DashboardLayout, WidgetId } from '../types'

const DEFAULT_LAYOUTS: DashboardLayout[] = [
  { i: 'summary',      x: 0, y: 0,  w: 6, h: 3, minW: 4, minH: 2 },
  { i: 'today',        x: 6, y: 0,  w: 3, h: 2, minW: 2, minH: 2 },
  { i: 'bestworst',    x: 9, y: 0,  w: 3, h: 3, minW: 2, minH: 2 },
  { i: 'chart',        x: 0, y: 3,  w: 6, h: 3, minW: 4, minH: 2 },
  { i: 'allocation',   x: 6, y: 2,  w: 6, h: 3, minW: 4, minH: 2 },
  { i: 'holdings',     x: 0, y: 6,  w: 7, h: 4, minW: 4, minH: 3 },
  { i: 'transactions', x: 7, y: 6,  w: 5, h: 4, minW: 3, minH: 3 },
  { i: 'mascot',       x: 0, y: 10, w: 6, h: 2, minW: 3, minH: 2 },
]

const DEFAULT_VISIBLE: Record<WidgetId, boolean> = {
  summary: true,
  today: true,
  bestworst: true,
  chart: true,
  allocation: true,
  holdings: true,
  transactions: true,
  mascot: true,
}

interface DashboardStore {
  layouts: DashboardLayout[]
  visible: Record<WidgetId, boolean>
  theme: 'light' | 'dark'
  setLayouts: (layouts: DashboardLayout[]) => void
  toggleWidget: (id: WidgetId) => void
  toggleTheme: () => void
  resetLayouts: () => void
}

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set) => ({
      layouts: DEFAULT_LAYOUTS,
      visible: DEFAULT_VISIBLE,
      theme: 'light',
      setLayouts: (layouts) => set({ layouts }),
      toggleWidget: (id) =>
        set((s) => ({
          visible: { ...s.visible, [id]: !s.visible[id] },
        })),
      toggleTheme: () =>
        set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
      resetLayouts: () =>
        set({ layouts: DEFAULT_LAYOUTS, visible: DEFAULT_VISIBLE }),
    }),
    { name: 'abangi.dashboard.v1' },
  ),
)
