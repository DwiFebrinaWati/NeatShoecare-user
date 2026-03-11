'use client'

import { useToast } from './use-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { ToastClose } from '@/components/ui/toast'
import { ShoppingCart } from 'lucide-react'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="bg-white shadow-xl border-l-4 border-green-500 rounded-lg min-w-[300px] flex items-start gap-3 p-4"
          >
            <ShoppingCart className="text-green-600 w-6 h-6 mt-1" />
            <div className="flex-1">
              {t.title && <div className="font-semibold">{t.title}</div>}
              {t.description && <div className="text-sm text-gray-600">{t.description}</div>}
            </div>
            {t.action}
            <ToastClose />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
