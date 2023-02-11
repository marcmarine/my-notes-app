import { Link, useOutletContext } from 'react-router-dom'
import TextTruncate from 'react-text-truncate'
import { motion } from 'framer-motion'
import { Note, NotesContextType } from './'

function NoteItem({ id, content }: Note): JSX.Element {
  return (
    <li>
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="border-2 relative border-white overflow-hidden"
      >
        <Link
          to={`/${id}`}
          className="block w-full h-full px-5 py-2 opacity-80 hover:opacity-100 transition"
        >
          <TextTruncate line={5} truncateText="…" text={content} />
        </Link>
      </motion.div>
    </li>
  )
}

export default NoteItem
