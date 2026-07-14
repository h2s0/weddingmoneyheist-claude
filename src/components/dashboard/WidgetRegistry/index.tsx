import type { WidgetId } from '../../../types'
import { WIDGET_REGISTRY } from './constants'

interface WidgetRendererProps {
  id: WidgetId
}

export function WidgetRenderer({ id }: WidgetRendererProps) {
  const Widget = WIDGET_REGISTRY[id]
  if (!Widget) return null

  return <Widget />
}
