export function WidgetSkeleton() {
  return (
    <div className="flex flex-col gap-3 p-5 h-full animate-pulse">
      <div className="h-4 bg-bg-soft rounded-sm w-2/3" />
      <div className="h-8 bg-bg-soft rounded-sm w-1/2" />
      <div className="h-4 bg-bg-soft rounded-sm w-3/4" />
      <div className="flex-1 bg-bg-soft rounded-sm" />
    </div>
  )
}
