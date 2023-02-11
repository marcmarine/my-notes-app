import { useOutletContext } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { NotesContextType } from '.'
import { Note } from './'
import NoteCreate from './NoteCreate'
import NoteItem from './NoteItem'

function Notes(): JSX.Element {
  const { notes, status } = useOutletContext<NotesContextType>()
  if (status === 'loading') return <>loading...</>

  return (
    <>
      <ul className="wrapper flex flex-col px-5 pt-5 pb-32 -space-y-0.5">
        <AnimatePresence initial={false}>
          {notes.map(
            (props: Note): JSX.Element => (
              <NoteItem key={props.id} {...props} />
            )
          )}
        </AnimatePresence>
      </ul>
      <NoteCreate />
    </>
  )
}

export default Notes
