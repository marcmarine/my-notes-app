import { useState, useEffect } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { NotesContextType } from '.'
import ConfirmDialog from '../../components/ConfirmDialog'

function NoteForm(): JSX.Element {
  const { update, note, remove } = useOutletContext<NotesContextType>()
  const [currentText, setCurrentText] = useState('')

  const { id, content } = note ?? {}

  useEffect(() => {
    setCurrentText(content)
  }, [content])

  function updateNote() {
    update(id, currentText)
  }

  function removeNote() {
    remove(id)
  }

  return (
    <div className="fixed w-full p-5 h-screen bg-transparent bg-opacity-10">
      <div className="wrapper border-2 border-transparent px-5 py-2 h-full bg-background text-white">
        <textarea
          value={currentText}
          onChange={event => setCurrentText(event.target.value)}
          className="w-full h-[calc(100%-6rem)] flex-1 focus:outline-none bg-transparent"
          autoFocus
        />
      </div>
      <div className="wrapper fixed left-0 bottom-0 flex-wrap right-0 px-5 pb-5 flex -space-y-0.5 bg-background">
        <ConfirmDialog>
          {confirm => {
            return (
              <button
                onClick={() => confirm(removeNote)}
                className="flex-0 basis-full btn"
              >
                delete
              </button>
            )
          }}
        </ConfirmDialog>
        <Link to={`/${id}`} className="flex-1 btn">
          back
        </Link>
        <button onClick={updateNote} className="flex-1 btn -ml-0.5">
          save
        </button>
      </div>
    </div>
  )
}

export default NoteForm
