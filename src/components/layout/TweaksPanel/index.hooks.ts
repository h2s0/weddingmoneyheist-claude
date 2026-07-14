import { useState } from 'react'
import { useDashboardStore } from '../../../stores'

export function useTweaksPanel() {
  const [open, setOpen] = useState(false)
  const { visible, toggleWidget, resetLayouts } = useDashboardStore()

  const resetAndClose = () => {
    resetLayouts()
    setOpen(false)
  }

  return {
    open,
    visible,
    toggleWidget,
    togglePanel: () => setOpen((current) => !current),
    closePanel: () => setOpen(false),
    resetAndClose,
  }
}
