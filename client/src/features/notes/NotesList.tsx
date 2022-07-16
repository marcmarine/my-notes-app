import { useOutletContext } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { NotesContextType } from '.'
import { Note } from './'
import NoteCreate from './NoteCreate'
import NoteItem from './NoteItem'

function Notes(): JSX.Element {
  const { notes, status } = useOutletContext<NotesContextType>()
  if (status === 'loading') return <>loading...</>

  return (
    <>
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-5 px-5 pt-5 pb-20"
      >
        <AnimatePresence initial={false}>
          {notes.map(
            (props: Note): JSX.Element => (
              <NoteItem key={props.id} {...props} />
            )
          )}
        </AnimatePresence>
      </motion.ul>
      <NoteCreate />
    </>
  )
}

export default Notes
