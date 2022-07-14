import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
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
    <div className="fixed w-full p-5 h-screen  bg-transparent bg-opacity-10">
      <div className="border border-primary rounded-4xl px-6 py-4 h-full">
        <textarea
          value={currentText}
          onChange={event => setCurrentText(event.target.value)}
          className="w-full h-[calc(100%-3rem)] flex-1 focus:outline-none bg-transparent"
        />
      </div>
      <Link
        to={`/${id}`}
        className="fixed grid w-16 h-16 bottom-5 left-5 bg-white bg-opacity-10 rounded-full place-content-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </Link>
      <button
        onClick={updateNote}
        className="fixed grid w-16 h-16 bottom-5 right-5 bg-white bg-opacity-10 rounded-full place-content-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </button>
    </div>
  )
}

export default NoteForm
