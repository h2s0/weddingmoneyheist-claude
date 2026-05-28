interface WidgetErrorProps {
  message?: string
}

export function WidgetError({ message = '데이터를 불러올 수 없어요' }: WidgetErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 p-5 text-center">
      <span className="text-2xl">😢</span>
      <p className="text-sm text-ink-soft">{message}</p>
    </div>
  )
}
