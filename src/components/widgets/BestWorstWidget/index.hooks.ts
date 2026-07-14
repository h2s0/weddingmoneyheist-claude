import { useMemo } from 'react'
import { useHoldings } from '../../../api'

export function useBestWorstWidget() {
  const query = useHoldings()

  const highlights = useMemo(() => {
    if (!query.data || query.data.length === 0) {
      return { best: null, worst: null }
    }

    const sorted = [...query.data].sort((a, b) => b.todayGainPct - a.todayGainPct)
    return { best: sorted[0], worst: sorted[sorted.length - 1] }
  }, [query.data])

  return { ...query, ...highlights }
}
