'use client'

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'
import { CheckCircle2 } from 'lucide-react'

interface ToastCtxValue { showToast: (message: string) => void }
const ToastCtx = createContext<ToastCtxValue>({ showToast: () => {} })
export const useToast = () => useContext(ToastCtx)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showToast = useCallback((m: string) => {
    setMessage(m)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setMessage(null), 3000)
  }, [])

  return (
    <ToastCtx.Provider value={{ showToast }}>
      {children}
      {message && (
        <div className="proto-toast"><CheckCircle2 size={14} /> {message}</div>
      )}
    </ToastCtx.Provider>
  )
}
