import { Responsive, WidthProvider } from 'react-grid-layout'
import type { WidgetId } from '../../../types'

export const ResponsiveReactGridLayout = WidthProvider(Responsive)

export const BREAKPOINTS = { lg: 1200, md: 768, sm: 480, xs: 0 }
export const COLUMNS = { lg: 12, md: 6, sm: 2, xs: 1 }

export const MOBILE_WIDGET_ORDER: WidgetId[] = [
  'summary',
  'today',
  'bestworst',
  'chart',
  'allocation',
  'holdings',
  'transactions',
  'mascot',
]
