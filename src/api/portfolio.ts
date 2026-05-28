import { useQuery } from '@tanstack/react-query'
import {
  mockPortfolioSummary,
  mockHoldings,
  mockTransactions,
  mockEquityCurve,
  mockAllocation,
} from '../mocks'
import type {
  PortfolioSummary,
  Holding,
  Transaction,
  EquityCurvePoint,
  AllocationItem,
} from '../types'

const DELAY = 400

function delay<T>(data: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), DELAY))
}

export function usePortfolioSummary() {
  return useQuery<PortfolioSummary>({
    queryKey: ['portfolio', 'summary'],
    queryFn: () => delay(mockPortfolioSummary),
  })
}

export function useHoldings() {
  return useQuery<Holding[]>({
    queryKey: ['portfolio', 'holdings'],
    queryFn: () => delay(mockHoldings),
  })
}

export function useTransactions() {
  return useQuery<Transaction[]>({
    queryKey: ['portfolio', 'transactions'],
    queryFn: () => delay(mockTransactions),
  })
}

export function useEquityCurve() {
  return useQuery<EquityCurvePoint[]>({
    queryKey: ['portfolio', 'equityCurve'],
    queryFn: () => delay(mockEquityCurve),
  })
}

export function useAllocation() {
  return useQuery<AllocationItem[]>({
    queryKey: ['portfolio', 'allocation'],
    queryFn: () => delay(mockAllocation),
  })
}
