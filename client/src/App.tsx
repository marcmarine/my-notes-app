import { QueryClient, QueryClientProvider } from 'react-query'
import Notes from './components/Notes'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Notes />
    </QueryClientProvider>
  )
}

export default App
