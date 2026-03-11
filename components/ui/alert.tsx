import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog'
import { Button } from './button'

const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        destructive:
          'text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        'col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight',
        className,
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        'text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed',
        className,
      )}
      {...props}
    />
  )
}

function ConfirmInfo({ open, message, onConfirm, actionButton }: any) {
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-md bg-white rounded-2xl p-6 text-center">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Informasi</DialogTitle>
        </DialogHeader>

        <div className="mt-2 text-gray-700 whitespace-pre-line">
          {message}
        </div>

        {actionButton && (
          <div className="mt-4">
            {actionButton}
          </div>
        )}

        <Button
          className="mt-6 w-full bg-primary text-white py-3 rounded-xl"
          onClick={onConfirm}
        >
          Saya Mengerti
        </Button>
      </DialogContent>
    </Dialog>
  )
}


function ConfirmPopup({ open, message, onConfirm }: any) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[9999]">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-3">Informasi</h2>

        <p className="text-gray-700 mb-6 whitespace-pre-line">
          {message}
        </p>

        <button
          onClick={onConfirm}
          className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90"
        >
          Saya Mengerti
        </button>
      </div>
    </div>
  );
}

export { Alert, AlertTitle, AlertDescription, ConfirmInfo, ConfirmPopup }