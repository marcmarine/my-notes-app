import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useGetNoteByIdQuery from '../../hooks/useGetNoteByIdQuery'
import useUpdateNotesMutation from '../../hooks/useUpdateNoteMutation'

function NoteForm(): JSX.Element {
  const { noteId } = useParams()
  const { data, status } = useGetNoteByIdQuery(noteId)
  const navigate = useNavigate()

  const { mutate: update } = useUpdateNotesMutation()

  if (status === 'loading') return <>loading...</>

  const { id, displayText } = data
  const [currentText, setCurrentText] = useState(displayText)

  function updateNote() {
    update({ id, displayText: currentText })
    navigate(`/${id}`)
  }

  return (
    <>
      <input
        type="text"
        value={currentText}
        onChange={event => setCurrentText(event.target.value)}
      />
      <button onClick={updateNote}>save</button>
    </>
  )
}

export default NoteForm
