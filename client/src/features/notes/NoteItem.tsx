import { Link } from 'react-router-dom'
import TextTruncate from 'react-text-truncate'
import useDeleteNotesMutation from '../../hooks/useDeleteNotesMutation'
import { Note } from '../../types/note'
import ConfirmDialog from '../../components/ConfirmDialog'

function NoteItem({ id, displayText }: Note): JSX.Element {
  const { mutate: remove } = useDeleteNotesMutation()

  return (
    <li
      key={id.toString()}
      className="px-6 py-4 border relative border-primary rounded-4xl h-[12rem] overflow-hidden"
    >
      <ConfirmDialog>
        {confirm => {
          return (
            <button
              onClick={() => confirm(() => remove({ id }))}
              className="absolute bottom-5 right-5 w-8 h-8 grid place-content-center rounded-full hover:bg-white hover:bg-opacity-10"
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
            </button>
          )
        }}
      </ConfirmDialog>
      <Link to={`/${id}`}>
        <TextTruncate line={5} truncateText="…" text={displayText} />
      </Link>
    </li>
  )
}

export default NoteItem
