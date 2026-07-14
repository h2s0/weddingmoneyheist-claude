import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatAmount, formatDate } from '../../../lib'
import { WidgetCard, WidgetError, WidgetSkeleton } from '../../common'
import { useEquityChartWidget } from './index.hooks'

export function EquityChartWidget() {
  const { data, isLoading, isError, color } = useEquityChartWidget()

  return (
    <WidgetCard title="수익률 추이" emoji="📈">
      {isLoading && <WidgetSkeleton />}
      {isError && <WidgetError />}
      {data && data.length === 0 && (
        <div className="flex items-center justify-center h-full text-ink-faint text-sm">
          데이터 없음
        </div>
      )}
      {data && data.length > 0 && (
        <div className="widget-chart-area px-2 pb-3 h-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="equity-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                tick={{ fontSize: 11, fill: 'var(--ink-faint)' }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip
                contentStyle={{
                  background: 'var(--card)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 12,
                  color: 'var(--ink)',
                }}
                formatter={(value: number) => [formatAmount(value) + '원', '자산']}
                labelFormatter={String}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                fill="url(#equity-fill)"
                dot={false}
                activeDot={{ r: 4, fill: color }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </WidgetCard>
  )
}
