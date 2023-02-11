import { QueryClient, QueryClientProvider } from 'react-query'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Notes from './features/notes'
import NotesList from './features/notes/NotesList'
import Note from './features/notes/Note'
import NoteForm from './features/notes/NoteForm'
import { NotificationsProvider } from './components/Notifications'
import 'typeface-rubik'

const queryClient = new QueryClient()

function App() {
  const location = useLocation()

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence initial={false}>
        <NotificationsProvider>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Notes />}>
              <Route index element={<NotesList />} />
              <Route path=":noteId" element={<Note />} />
              <Route path=":noteId/edit" element={<NoteForm />} />
            </Route>
          </Routes>
        </NotificationsProvider>
      </AnimatePresence>
    </QueryClientProvider>
  )
}

export default App
