import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useOutletContext } from 'react-router-dom'
import { NotesContextType } from '.'

function NoteCreate(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [displayText, setDisplayText] = useState<string>('')
  const { create } = useOutletContext() as NotesContextType

  function handleOpen() {
    setIsOpen(!isOpen)
    setDisplayText('')
  }

  function createNote() {
    create(displayText)
    setDisplayText('')
    setIsOpen(false)
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <div
              key="panel"
              className={`fixed z-20 top-0 left-0 flex items-end justify-end w-screen h-screen p-5 ${
                !isOpen && 'pointer-events-none'
              }`}
            >
              <motion.div
                initial={{ width: '7%', height: '13%' }}
                animate={{ width: '100%', height: '100%' }}
                exit={{ width: '7%', height: '13%', opacity: 0 }}
                transition={{ type: 'tween' }}
                className="bg-white w-full h-full rounded-4xl px-6 py-4 shadow-md"
              >
                <textarea
                  id="note"
                  value={displayText}
                  onChange={event => setDisplayText(event.target.value)}
                  placeholder="Write a note here"
                  className="w-full h-[calc(100%-3rem)] flex-1 focus:outline-none text-black resize-none"
                  autoComplete="off"
                  autoFocus
                />
              </motion.div>
            </div>
            <motion.button
              whileHover={{ scale: 0.9, transition: { delay: 0 } }}
              whileTap={{ scale: 0.6, transition: { delay: 0 } }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: [1.8, 0], opacity: 0 }}
              transition={{ delay: 0.2 }}
              onClick={createNote}
              className="fixed z-20 grid w-16 h-16 m-2 bottom-5 right-5 bg-primary rounded-full place-content-center"
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
            </motion.button>
          </>
        )}
      </AnimatePresence>
      <motion.button
        whileTap={{ scale: 0.8 }}
        whileHover={{ scale: 1.1 }}
        initial={{ scale: 0, left: 'calc(100vw - 6.2rem)' }}
        animate={{
          rotate: isOpen ? '-45deg' : 0,
          left: isOpen ? '1.7%' : 'calc(100vw - 6.2rem)',
          scale: 1
        }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.1 }}
        onClick={handleOpen}
        className={`fixed z-20 w-16 h-16 m-2 bottom-5 rounded-full text-background grid place-content-center transform ${
          isOpen
            ? 'bg-transparent shadow-none opacity-20 hover:opacity-100'
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
      </motion.button>
    </>
  )
}

export default NoteCreate
