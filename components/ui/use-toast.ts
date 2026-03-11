'use client'

import * as React from 'react'
import type { ReactNode } from 'react'

export type ToastOptions = {
  title?: ReactNode
  description?: ReactNode
  duration?: number
  action?: ReactNode
}

export type ToastItem = ToastOptions & {
  id: string
  open: boolean
}

let listeners: ((toasts: ToastItem[]) => void)[] = []
let memoryToasts: ToastItem[] = []

function dispatch() {
  listeners.forEach((listener) => listener(memoryToasts))
}

let count = 0
function genId() {
  count += 1
  return count.toString()
}

export function toast({ title, description, duration = 3000, action }: ToastOptions) {
  const id = genId()
  const newToast: ToastItem = { id, title, description, duration, open: true, action }

  memoryToasts = [newToast, ...memoryToasts]
  dispatch()

  setTimeout(() => {
    memoryToasts = memoryToasts.filter((t) => t.id !== id)
    dispatch()
  }, duration)

  return id
}

export function useToast() {
  const [toasts, setToasts] = React.useState<ToastItem[]>(memoryToasts)

  React.useEffect(() => {
    listeners.push(setToasts)
    return () => {
      listeners = listeners.filter((fn) => fn !== setToasts)
    }
  }, [])

  return { toasts }
}
