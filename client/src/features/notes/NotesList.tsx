import { Link } from 'react-router-dom'
import TextTruncate from 'react-text-truncate'
import useGetNotesQuery from '../../hooks/useGetNotesQuery'
import useDeleteNotesMutation from '../../hooks/useDeleteNotesMutation'
import { Note } from '../../types/note'
import NoteCreate from './NoteCreate'

function Notes(): JSX.Element {
  const { status, data, error, isFetching } = useGetNotesQuery()
  const { mutate: remove } = useDeleteNotesMutation()

  if (status === 'loading') return <>loading...</>

  return (
    <>
      <ul className="grid grid-cols-4 gap-5 p-5">
        {data.map(
          ({ id, displayText }: Note): JSX.Element => (
            <li
              key={id.toString()}
              className="px-6 py-4 border relative border-primary rounded-4xl h-[12rem] overflow-hidden"
            >
              <button
                onClick={() => remove({ id })}
                className="absolute bottom-5 right-5"
              >
                borrar
              </button>
              <Link to={`/${id}`}>
                <TextTruncate line={5} truncateText="…" text={displayText} />
              </Link>
            </li>
          )
        )}
      </ul>
      <NoteCreate />
    </>
  )
}

export default Notes
