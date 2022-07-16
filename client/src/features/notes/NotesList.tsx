import { useOutletContext } from 'react-router-dom'
import { NotesContextType } from '.'
import { Note } from './'
import NoteCreate from './NoteCreate'
import NoteItem from './NoteItem'

function Notes(): JSX.Element {
  const { data, status } = useOutletContext() as NotesContextType
  if (status === 'loading') return <>loading...</>

  return (
    <>
      <ul className="grid grid-cols-4 gap-5 p-5">
        {data.map(
          (props: Note): JSX.Element => (
            <NoteItem key={props.id} {...props} />
          )
        )}
      </ul>
      <NoteCreate />
    </>
  )
}

export default Notes
