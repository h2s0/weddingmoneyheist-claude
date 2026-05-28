import type {
  PortfolioSummary,
  Holding,
  Transaction,
  EquityCurvePoint,
  AllocationItem,
} from '../types'

export const mockPortfolioSummary: PortfolioSummary = {
  totalAssets: 52_840_000,
  holdings: 48_640_000,
  cash: 4_200_000,
  totalGain: 7_840_000,
  totalGainPct: 17.41,
  todayGain: 324_000,
  todayGainPct: 0.62,
  updatedAt: '2026-05-28T15:30:00+09:00',
}

export const mockHoldings: Holding[] = [
  {
    id: 'h1',
    ticker: '005930',
    name: '삼성전자',
    quantity: 200,
    avgCost: 68_500,
    currentPrice: 74_200,
    value: 14_840_000,
    gain: 1_140_000,
    gainPct: 8.32,
    todayGain: 200_000,
    todayGainPct: 1.37,
    allocationPct: 30.52,
    color: 'var(--sky-deep)',
  },
  {
    id: 'h2',
    ticker: '000660',
    name: 'SK하이닉스',
    quantity: 50,
    avgCost: 178_000,
    currentPrice: 198_500,
    value: 9_925_000,
    gain: 1_025_000,
    gainPct: 11.52,
    todayGain: 125_000,
    todayGainPct: 1.27,
    allocationPct: 20.41,
    color: 'var(--lav-deep)',
  },
  {
    id: 'h3',
    ticker: '035720',
    name: '카카오',
    quantity: 150,
    avgCost: 58_000,
    currentPrice: 47_350,
    value: 7_102_500,
    gain: -1_597_500,
    gainPct: -18.36,
    todayGain: -75_000,
    todayGainPct: -1.05,
    allocationPct: 14.61,
    color: 'var(--yellow-deep)',
  },
  {
    id: 'h4',
    ticker: '051910',
    name: 'LG화학',
    quantity: 20,
    avgCost: 412_000,
    currentPrice: 445_500,
    value: 8_910_000,
    gain: 670_000,
    gainPct: 8.13,
    todayGain: 40_000,
    todayGainPct: 0.45,
    allocationPct: 18.33,
    color: 'var(--mint-deep)',
  },
  {
    id: 'h5',
    ticker: '035420',
    name: 'NAVER',
    quantity: 30,
    avgCost: 215_000,
    currentPrice: 262_000,
    value: 7_860_000,
    gain: 1_410_000,
    gainPct: 21.86,
    todayGain: 34_000,
    todayGainPct: 0.43,
    allocationPct: 16.17,
    color: 'var(--pink-deep)',
  },
]

export const mockTransactions: Transaction[] = [
  {
    id: 't1',
    date: '2026-05-27',
    ticker: '005930',
    name: '삼성전자',
    type: 'buy',
    quantity: 10,
    price: 73_800,
    amount: 738_000,
  },
  {
    id: 't2',
    date: '2026-05-26',
    ticker: '035420',
    name: 'NAVER',
    type: 'sell',
    quantity: 5,
    price: 264_000,
    amount: 1_320_000,
  },
  {
    id: 't3',
    date: '2026-05-23',
    ticker: '051910',
    name: 'LG화학',
    type: 'dividend',
    quantity: 20,
    price: 1_500,
    amount: 30_000,
  },
  {
    id: 't4',
    date: '2026-05-21',
    ticker: '000660',
    name: 'SK하이닉스',
    type: 'buy',
    quantity: 10,
    price: 195_000,
    amount: 1_950_000,
  },
  {
    id: 't5',
    date: '2026-05-19',
    ticker: '035720',
    name: '카카오',
    type: 'buy',
    quantity: 30,
    price: 48_200,
    amount: 1_446_000,
  },
  {
    id: 't6',
    date: '2026-05-15',
    ticker: '005930',
    name: '삼성전자',
    type: 'sell',
    quantity: 20,
    price: 75_100,
    amount: 1_502_000,
  },
]

export const mockEquityCurve: EquityCurvePoint[] = (() => {
  const base = 45_000_000
  const points: EquityCurvePoint[] = []
  const days = 90
  let value = base

  for (let i = days; i >= 0; i--) {
    const date = new Date('2026-05-28')
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().slice(0, 10)
    const change = (Math.random() - 0.46) * 400_000
    value = Math.max(38_000_000, value + change)
    points.push({
      date: dateStr,
      value: Math.round(value),
      gainPct: ((value - base) / base) * 100,
    })
  }
  return points
})()

export const mockAllocation: AllocationItem[] = [
  ...mockHoldings.map((h) => ({
    id: h.id,
    name: h.name,
    value: h.value,
    pct: h.allocationPct,
    color: h.color,
  })),
  {
    id: 'cash',
    name: '현금',
    value: mockPortfolioSummary.cash,
    pct:
      (mockPortfolioSummary.cash / mockPortfolioSummary.totalAssets) * 100,
    color: 'var(--ink-faint)',
  },
]
