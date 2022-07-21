import { Link, useOutletContext } from 'react-router-dom'
import TextTruncate from 'react-text-truncate'
import { motion } from 'framer-motion'
import { Note, NotesContextType } from './'
import ConfirmDialog from '../../components/ConfirmDialog'

function NoteItem({ id, displayText }: Note): JSX.Element {
  const { remove } = useOutletContext() as NotesContextType

  function removeNote() {
    remove(id)
  }

  return (
    <li>
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="border relative border-primary rounded-4xl h-[12rem] overflow-hidden"
      >
        <ConfirmDialog>
          {confirm => {
            return (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => confirm(removeNote)}
                className="absolute z-10 bottom-5 right-5 w-8 h-8 grid place-content-center rounded-full hover:bg-white hover:bg-opacity-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </motion.button>
            )
          }}
        </ConfirmDialog>
        <Link
          to={`/${id}`}
          className="block w-full h-full px-6 py-4 opacity-80 hover:opacity-100 transition"
        >
          <TextTruncate line={5} truncateText="…" text={displayText} />
        </Link>
      </motion.div>
    </li>
  )
}

export default NoteItem
