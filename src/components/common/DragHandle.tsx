import clsx from 'clsx'

interface DragHandleProps {
  className?: string
}

export function DragHandle({ className }: DragHandleProps) {
  return (
    <div
      className={clsx(
        'drag-handle w-[26px] h-[26px] inline-flex items-center justify-center',
        'rounded-[8px] text-ink-faint cursor-grab opacity-0 transition-all duration-150',
        'hover:bg-bg-soft hover:text-ink-soft group-hover:opacity-100',
        className,
      )}
      aria-label="위젯 이동"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
        <circle cx="4" cy="3" r="1.2" />
        <circle cx="4" cy="7" r="1.2" />
        <circle cx="4" cy="11" r="1.2" />
        <circle cx="10" cy="3" r="1.2" />
        <circle cx="10" cy="7" r="1.2" />
        <circle cx="10" cy="11" r="1.2" />
      </svg>
    </div>
  )
}
