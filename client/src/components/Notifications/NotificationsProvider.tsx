import { ReactNode, useState } from 'react'
import NotificationsContext from './NotificationsContext'
import { motion, AnimatePresence } from 'framer-motion'

function NotificationsProvider({
  children
}: {
  children: ReactNode
}): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [notification, setNotification] = useState<string | null>(null)

  function notify(string: string): void {
    setIsVisible(true)
    setNotification(string)
    setTimeout(function () {
      setIsVisible(false)
    }, 2000)
  }

  return (
    <NotificationsContext.Provider value={{ notify }}>
      {children}
      <AnimatePresence>
        {isVisible && (
          <div className="fixed left-0 bottom-0 flex w-full p-5 justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <div className="rounded-4xl bg-white px-10 py-5 text-black m-2 shadow-md whitespace-nowrap">
                {notification}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </NotificationsContext.Provider>
  )
}

export default NotificationsProvider
