import { useMemo } from 'react'
import { usePortfolioSummary } from '../../../api'
import { HAPPY_MESSAGES, SAD_MESSAGES, type MascotMood } from './constants'

export function useMascotWidget() {
  const { data, isLoading } = usePortfolioSummary()

  const mascot = useMemo(() => {
    const isHappy = !data || data.todayGain >= 0
    const messages = isHappy ? HAPPY_MESSAGES : SAD_MESSAGES

    return {
      mood: (isHappy ? 'happy' : 'sad') as MascotMood,
      message: messages[Math.floor(Math.random() * messages.length)],
    }
  }, [data])

  return { data, isLoading, ...mascot }
}
