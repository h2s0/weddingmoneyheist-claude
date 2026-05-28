import type { WidgetId } from '../../types'
import {
  SummaryWidget,
  TodayWidget,
  BestWorstWidget,
  EquityChartWidget,
  AllocationWidget,
  HoldingsWidget,
  TransactionsWidget,
  MascotWidget,
} from '../widgets'

const REGISTRY: Record<WidgetId, () => React.ReactNode> = {
  summary:      () => <SummaryWidget />,
  today:        () => <TodayWidget />,
  bestworst:    () => <BestWorstWidget />,
  chart:        () => <EquityChartWidget />,
  allocation:   () => <AllocationWidget />,
  holdings:     () => <HoldingsWidget />,
  transactions: () => <TransactionsWidget />,
  mascot:       () => <MascotWidget />,
}

interface WidgetRendererProps {
  id: WidgetId
}

export function WidgetRenderer({ id }: WidgetRendererProps) {
  const render = REGISTRY[id]
  return <>{render()}</>
}
