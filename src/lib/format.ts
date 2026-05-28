export function formatKRW(value: number): string {
  return value.toLocaleString('ko-KR') + '원'
}

export function formatAmount(value: number): string {
  const abs = Math.abs(value)
  if (abs >= 100_000_000) {
    return (value / 100_000_000).toFixed(1) + '억'
  }
  if (abs >= 10_000) {
    return (value / 10_000).toFixed(0) + '만'
  }
  return value.toLocaleString('ko-KR')
}

export function formatPct(value: number, digits = 2): string {
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(digits)}%`
}

export function formatPrice(value: number): string {
  return value.toLocaleString('ko-KR')
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

export function isGain(value: number): boolean {
  return value > 0
}
