import { Link, useParams } from 'react-router-dom'
import useGetNoteByIdQuery from '../../hooks/useGetNoteByIdQuery'

function Note(): JSX.Element {
  const { noteId } = useParams()
  const { data, status, isFetching } = useGetNoteByIdQuery(noteId)

  const { id, displayText } = data ?? {}
  const paragraphs = displayText?.split('\n').filter((e: string) => e)

  return (
    <>
      <div className="fixed w-full p-5 h-screen  bg-transparent bg-opacity-10">
        <div className="border border-primary rounded-4xl px-6 py-4 h-full">
          <div className="h-[calc(100%-3rem)] overflow-auto">
            {paragraphs?.map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
      <Link
        to="/"
        className="fixed grid w-16 h-16 bottom-5 left-5 bg-white bg-opacity-10 rounded-full place-content-center"
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
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </Link>
      <Link
        to={`/${id}/edit`}
        className="fixed grid w-16 h-16 bottom-5 right-5 bg-white bg-opacity-10 rounded-full place-content-center"
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
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </Link>
    </>
  )
}

export default Note
