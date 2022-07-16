import { createContext } from 'react'
import { NotificationsContextType } from './NotificationsContextType'

const NotificationsContext = createContext<NotificationsContextType | null>(
  null
)

export default NotificationsContext
