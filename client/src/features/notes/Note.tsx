import { Link, useOutletContext } from 'react-router-dom'
import { NotesContextType } from '.'

function Note(): JSX.Element {
  const { note } = useOutletContext<NotesContextType>()

  const { id, displayText } = note ?? {}
  const paragraphs = displayText?.split('\n').filter((e: string) => e)
  const shouldShowText = Boolean(note)

  return (
    <>
      <div className="fixed top-0 left-0 w-full p-5 h-screen  bg-transparent bg-opacity-10">
        <div className="px-5 py-2 border-2 border-transparent h-full wrapper">
          <div className="h-full pb-20 overflow-auto space-y-6">
            {shouldShowText &&
              paragraphs?.map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
          </div>
        </div>
      </div>
      <div className="wrapper fixed left-0 bottom-0 right-0 px-5 pb-5 bg-background flex -space-x-0.5">
        <Link to="/" className="btn flex-1">
          <div className="text-center">back</div>
        </Link>
        <Link to={`/${id}/edit`} className="btn flex-1">
          <div className="text-center">edit</div>
        </Link>
      </div>
    </>
  )
}

export default Note
