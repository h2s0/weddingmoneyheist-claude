import { useMemo } from 'react'
import { useEquityCurve } from '../../../api'

export function useEquityChartWidget() {
  const query = useEquityCurve()

  const color = useMemo(() => {
    if (!query.data || query.data.length < 2) return 'var(--mint-deep)'
    return query.data[query.data.length - 1].gainPct >= 0
      ? 'var(--mint-deep)'
      : 'var(--coral-deep)'
  }, [query.data])

  return { ...query, color }
}
