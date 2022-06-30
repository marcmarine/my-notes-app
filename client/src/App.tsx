import useNotes from './hooks/useNotes'

type Note = {
  id: String
  displayText: String
}

function App() {
  const { data, isLoading } = useNotes()

  if (isLoading) return <>loading...</>

  return (
    <ul>
      {data.map(
        ({ id, displayText }: Note): JSX.Element => (
          <li key={id}>{displayText}</li>
        )
      )}
    </ul>
  )
}

export default App
