import { Link, useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import { NotesContextType } from '.'

function Note(): JSX.Element {
  const { note } = useOutletContext<NotesContextType>()

  const { id, displayText } = note ?? {}
  const paragraphs = displayText?.split('\n').filter((e: string) => e)
  const shouldShowText = Boolean(note)

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: 'tween' }}
        className="fixed top-0 left-0 w-full p-5 h-screen  bg-transparent bg-opacity-10"
      >
        <div className="border border-primary rounded-4xl px-6 py-4 h-full">
          <div className="h-[calc(100%-3rem)] overflow-auto">
            {shouldShowText &&
              paragraphs?.map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
          </div>
        </div>
      </motion.div>
      <Link to="/">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: 'tween' }}
          className="fixed grid w-16 h-16 m-2 bottom-5 left-5 bg-white bg-opacity-10 rounded-full place-content-center"
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
        </motion.div>
      </Link>
      <Link to={`/${id}/edit`}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: 'tween' }}
          className="fixed grid w-16 h-16 m-2 bottom-5 right-5 bg-white bg-opacity-10 rounded-full place-content-center"
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
        </motion.div>
      </Link>
    </>
  )
}

export default Note
