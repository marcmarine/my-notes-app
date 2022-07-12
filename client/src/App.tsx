import { QueryClient, QueryClientProvider } from 'react-query'
import { Routes, Route } from 'react-router-dom'
import Notes from './features/notes'
import NotesList from './features/notes/NotesList'
import Note from './features/notes/Note'
import NoteForm from './features/notes/NoteForm'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Notes />}>
          <Route index element={<NotesList />} />
          <Route path=":noteId" element={<Note />} />
          <Route path=":noteId/edit" element={<NoteForm />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  )
}

export default App
