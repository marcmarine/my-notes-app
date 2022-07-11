import { useParams } from 'react-router-dom'
import useGetNoteByIdQuery from '../../hooks/useGetNoteByIdQuery'

function Note(): JSX.Element {
  const { noteId } = useParams()
  const { data, status } = useGetNoteByIdQuery(noteId)

  if (status === 'loading') return <>loading...</>

  const { id, displayText } = data

  return <>{displayText}</>
}

export default Note
