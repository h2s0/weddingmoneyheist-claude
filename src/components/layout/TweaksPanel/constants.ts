import type { WidgetId } from '../../../types'

export const WIDGET_LABELS: Record<WidgetId, string> = {
  summary: '💰 아빠 자산',
  today: '✨ 오늘',
  bestworst: '🏆 효자/효녀',
  chart: '📈 수익률 추이',
  allocation: '🥧 자산 배분',
  holdings: '🛒 보유 종목',
  transactions: '📒 매매 기록',
  mascot: '💌 딸 한마디',
}

export const WIDGET_IDS = Object.keys(WIDGET_LABELS) as WidgetId[]
