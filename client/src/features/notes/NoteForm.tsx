import { useState, useEffect } from 'react'
import { useNavigate, Link, useOutletContext } from 'react-router-dom'
import { NotesContextType } from '.'

function NoteForm(): JSX.Element {
  const navigate = useNavigate()
  const { update, note } = useOutletContext<NotesContextType>()
  const [currentText, setCurrentText] = useState('')

  const { id, displayText } = note ?? {}

  useEffect(() => {
    setCurrentText(displayText)
  }, [displayText])

  function updateNote() {
    update(id, currentText)
    navigate(`/${id}`)
  }

  return (
    <div className="fixed w-full p-5 h-screen bg-transparent bg-opacity-10">
      <div className="border rounded-4xl px-6 py-4 h-full bg-white text-black">
        <textarea
          value={currentText}
          onChange={event => setCurrentText(event.target.value)}
          className="w-full h-[calc(100%-4rem)] flex-1 focus:outline-none bg-transparent"
          autoFocus
        />
      </div>
      <Link
        to={`/${id}`}
        className="fixed z-10 grid w-16 h-16 m-2 bottom-5 left-5 text-background rounded-full place-content-center"
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
        className="fixed grid w-16 h-16 m-2 bottom-5 right-5 bg-primary rounded-full place-content-center"
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
