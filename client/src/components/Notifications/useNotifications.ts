import { useContext } from 'react'
import NotificationsContext from './NotificationsContext'
import { NotificationsContextType } from './NotificationsContextType'

function useNotifications() {
  return useContext(NotificationsContext) as NotificationsContextType
}

export default useNotifications
