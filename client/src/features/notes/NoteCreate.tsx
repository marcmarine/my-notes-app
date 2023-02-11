import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useOutletContext } from 'react-router-dom'
import { NotesContextType } from '.'

function NoteCreate(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [content, setContent] = useState<string>('')
  const { create } = useOutletContext() as NotesContextType

  function handleOpen() {
    setIsOpen(!isOpen)
    setContent('')
  }

  function createNote() {
    create(content)
    setContent('')
    setIsOpen(false)
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <div
              key="panel"
              className={`fixed z-20 top-0 left-0 flex items-end justify-end w-screen h-screen ${
                !isOpen && 'pointer-events-none'
              }`}
            >
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: '100%' }}
                exit={{ height: 0 }}
                transition={{ type: 'tween' }}
                className="wrapper p-5 bg-background w-full h-full"
              >
                <textarea
                  id="note"
                  value={content}
                  onChange={event => setContent(event.target.value)}
                  placeholder="Write a note here"
                  className="px-5 py-2 border-2 w-full h-full placeholder:text-white/20 flex-1 focus:outline-none text-white bg-background resize-none"
                  autoComplete="off"
                  autoFocus
                />
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
      <div className="wrapper fixed z-20 left-0 right-0 bottom-0 px-5 pb-5 flex bg-background -space-x-0.5">
        <button onClick={handleOpen} className="btn flex-1">
          {isOpen ? 'cancel' : 'add'}
        </button>
        {isOpen && (
          <button onClick={createNote} className="btn flex-1">
            save
          </button>
        )}
      </div>
    </>
  )
}

export default NoteCreate
