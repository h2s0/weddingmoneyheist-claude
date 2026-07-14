import type { ComponentType } from 'react'
import type { WidgetId } from '../../../types'
import {
  AllocationWidget,
  BestWorstWidget,
  EquityChartWidget,
  HoldingsWidget,
  MascotWidget,
  SummaryWidget,
  TodayWidget,
  TransactionsWidget,
} from '../../widgets'

export const WIDGET_REGISTRY: Record<WidgetId, ComponentType> = {
  summary: SummaryWidget,
  today: TodayWidget,
  bestworst: BestWorstWidget,
  chart: EquityChartWidget,
  allocation: AllocationWidget,
  holdings: HoldingsWidget,
  transactions: TransactionsWidget,
  mascot: MascotWidget,
}
