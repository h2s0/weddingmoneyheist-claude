import type { TransactionType } from '../../../types'

export const TYPE_LABEL: Record<TransactionType, string> = {
  buy: '매수',
  sell: '매도',
  dividend: '배당',
}

export const TYPE_STYLE: Record<TransactionType, string> = {
  buy: 'text-loss bg-loss-bg',
  sell: 'text-gain bg-gain-bg',
  dividend: 'text-[var(--lav-deep)] bg-[color-mix(in_oklab,var(--lav)_20%,transparent)]',
}
