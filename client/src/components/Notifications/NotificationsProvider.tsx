import { ReactNode, useState } from 'react'
import NotificationsContext from './NotificationsContext'

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
      {isVisible && (
        <div className="fixed left-1/2 bottom-5 transform -translate-x-1/2">
          <div className="rounded-4xl bg-white px-10 py-5 text-black m-2 shadow-md whitespace-nowrap">
            {notification}
          </div>
        </div>
      )}
    </NotificationsContext.Provider>
  )
}

export default NotificationsProvider
