import useGetNotesQuery from '../../hooks/useGetNotesQuery'
import { Note } from '../../types/note'
import NoteCreate from './NoteCreate'
import NoteItem from './NoteItem'

function Notes(): JSX.Element {
  const { status, data, error, isFetching } = useGetNotesQuery()

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
