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
          <div className="fixed left-0 bottom-20 flex w-full p-5 justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <div className="bg-white py-2 px-5 text-background whitespace-nowrap">
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
