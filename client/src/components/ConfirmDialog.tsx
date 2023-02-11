import { ReactNode, useState, MouseEventHandler } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type ConfirmDialogType = {
  children: (confirm: (callback: () => void) => void) => ReactNode
}

function ConfirmDialog({ children }: ConfirmDialogType) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [callback, setCallback] = useState<
    MouseEventHandler<HTMLButtonElement> | undefined
  >(undefined)

  function confirm(callback: () => void) {
    setCallback(() => callback)
    setIsOpen(true)
  }

  function cancel() {
    setIsOpen(false)
    setCallback(undefined)
  }

  return (
    <>
      {children(confirm)}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed grid left-0 w-screen h-screen top-0 z-40 place-content-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute z-10 w-screen h-screen bg-background bg-opacity-50 pointer-events-none"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ type: 'tween' }}
              className="relative z-20 bg-white text-background w-56"
            >
              <div className="flex justify-between -space-x-0.5">
                <button onClick={cancel} className="btn flex-1">
                  cancel
                </button>
                <button onClick={callback} className="btn flex-1">
                  delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ConfirmDialog
