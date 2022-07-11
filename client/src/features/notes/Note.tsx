import { useParams } from 'react-router-dom'
import useGetNoteByIdQuery from '../../hooks/useGetNoteByIdQuery'
import useDeleteNotesMutation from '../../hooks/useDeleteNotesMutation'

function Note(): JSX.Element {
  const { noteId } = useParams()
  const { data, status } = useGetNoteByIdQuery(noteId)

  const { mutate: remove } = useDeleteNotesMutation()

  if (status === 'loading') return <>loading...</>

  const { id, displayText } = data

  return (
    <>
      {displayText}
      <button onClick={() => remove({ id })}>borrar</button>
    </>
  )
}

export default Note
