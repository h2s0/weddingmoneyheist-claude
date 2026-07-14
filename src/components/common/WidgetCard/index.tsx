import type { ReactNode } from 'react'
import clsx from 'clsx'
import { DragHandle } from '../DragHandle'

interface WidgetCardProps {
  title: string
  emoji?: string
  children: ReactNode
  className?: string
}

export function WidgetCard({ title, emoji, children, className }: WidgetCardProps) {
  return (
    <div
      className={clsx(
        'widget-card',
        'group relative flex flex-col h-full overflow-hidden',
        'bg-card border border-[var(--line)] rounded-[var(--radius)]',
        'shadow-sm transition-shadow duration-200',
        className,
      )}
    >
      <header className="flex items-center gap-[10px] px-[22px] pt-[18px] flex-shrink-0">
        {emoji && (
          <span
            className="w-[26px] h-[26px] inline-flex items-center justify-center rounded-[8px] text-sm bg-bg-soft"
            aria-hidden
          >
            {emoji}
          </span>
        )}
        <div className="font-display text-[17px] text-ink flex-1">{title}</div>
        <DragHandle />
      </header>
      <div className="widget-body flex-1 overflow-hidden">{children}</div>
    </div>
  )
}
