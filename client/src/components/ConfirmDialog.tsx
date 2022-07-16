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
              className="relative z-20 bg-white text-black rounded-4xl shadow-md"
            >
              <h2 className="p-5 mb-5">Please, confirm this action</h2>
              <div className="flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={cancel}
                  className="w-16 h-16 m-2 grid place-content-center text-center opacity-20 hover:opacity-100 rounded-full transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={callback}
                  className="w-16 h-16 m-2 grid place-content-center text-center bg-red-500 text-white rounded-4xl"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ConfirmDialog
