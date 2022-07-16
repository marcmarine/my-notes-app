import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { NotesContextType } from '.'

function NoteCreate(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [displayText, setDisplayText] = useState<string>('')
  const { create } = useOutletContext() as NotesContextType

  function handleOpen() {
    setIsOpen(!isOpen)
  }

  function createNote() {
    create(displayText)
    setDisplayText('')
    setIsOpen(false)
  }

  return (
    <>
      {isOpen && (
        <>
          <div className="fixed top-0 left-0 w-full h-full flex p-5 overflow-hidden shadow-md">
            <div className="bg-white w-full h-full rounded-4xl px-6 py-4 shadow-md">
              <textarea
                id="note"
                value={displayText}
                onChange={event => setDisplayText(event.target.value)}
                placeholder="Write a note here"
                className="w-full h-[calc(100%-3rem)] flex-1 focus:outline-none text-black"
                autoComplete="off"
                autoFocus
              />
            </div>
          </div>
          <button
            onClick={createNote}
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
        </>
      )}
      <button
        onClick={handleOpen}
        className={`fixed w-16 h-16 m-2 bottom-5 right-5 rounded-full text-background grid place-content-center transform ${
          isOpen
            ? 'left-5 right-auto rotate-45 bg-transparent shadow-none opacity-20 hover:bg-red-500 hover:text-white hover:opacity-100'
            : 'bg-primary text-background shadow-md'
        } transition-all`}
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
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </>
  )
}

export default NoteCreate
