export interface PortfolioSummary {
  totalAssets: number
  holdings: number
  cash: number
  totalGain: number
  totalGainPct: number
  todayGain: number
  todayGainPct: number
  updatedAt: string
}

export interface Holding {
  id: string
  ticker: string
  name: string
  quantity: number
  avgCost: number
  currentPrice: number
  value: number
  gain: number
  gainPct: number
  todayGain: number
  todayGainPct: number
  allocationPct: number
  color: string
}

export type TransactionType = 'buy' | 'sell' | 'dividend'

export interface Transaction {
  id: string
  date: string
  ticker: string
  name: string
  type: TransactionType
  quantity: number
  price: number
  amount: number
}

export interface EquityCurvePoint {
  date: string
  value: number
  gainPct: number
}

export interface AllocationItem {
  id: string
  name: string
  value: number
  pct: number
  color: string
}

export type WidgetId =
  | 'summary'
  | 'today'
  | 'bestworst'
  | 'chart'
  | 'allocation'
  | 'holdings'
  | 'transactions'
  | 'mascot'

export interface DashboardWidget {
  id: WidgetId
  visible: boolean
}

export interface DashboardLayout {
  i: WidgetId
  x: number
  y: number
  w: number
  h: number
  minW?: number
  minH?: number
}
