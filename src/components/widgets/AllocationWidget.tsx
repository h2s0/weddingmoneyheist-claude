import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useAllocation } from '../../api'
import { WidgetCard, WidgetSkeleton, WidgetError } from '../common'

export function AllocationWidget() {
  const { data, isLoading, isError } = useAllocation()

  return (
    <WidgetCard title="자산 배분" emoji="🥧">
      {isLoading && <WidgetSkeleton />}
      {isError && <WidgetError />}
      {data && data.length === 0 && (
        <div className="flex items-center justify-center h-full text-ink-faint text-sm">
          데이터 없음
        </div>
      )}
      {data && data.length > 0 && (
        <div className="px-2 pb-3 h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="52%"
                outerRadius="72%"
                strokeWidth={0}
                paddingAngle={2}
              >
                {data.map((item) => (
                  <Cell
                    key={item.id}
                    fill={item.color.startsWith('var(') ? `hsl(0 0% 60%)` : item.color}
                    style={{ fill: item.color }}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'var(--card)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 12,
                  color: 'var(--ink)',
                }}
                formatter={(value: number, name: string) => [
                  `${value.toLocaleString('ko-KR')}원`,
                  name,
                ]}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span style={{ color: 'var(--ink-soft)', fontSize: 11 }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </WidgetCard>
  )
}
