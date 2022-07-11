import { Link } from 'react-router-dom'
import { useState } from 'react'
import useCreateNoteMutation from '../../hooks/useCreateNoteMutation'
import useGetNotesQuery from '../../hooks/useGetNotesQuery'

import useDeleteNotesMutation from '../../hooks/useDeleteNotesMutation'
import { Note } from '../../types/note'

function Notes(): JSX.Element {
  const [displayText, setDisplayText] = useState('')
  const { status, data, error, isFetching } = useGetNotesQuery()
  const { mutate: create } = useCreateNoteMutation()
  const { mutate: remove } = useDeleteNotesMutation()

  if (status === 'loading') return <>loading...</>

  return (
    <>
      <ul>
        {data.map(
          ({ id, displayText }: Note): JSX.Element => (
            <li key={id.toString()}>
              <Link to={`/${id}`}>
                <span>{displayText}</span>
              </Link>
              <button onClick={() => remove({ id })}>borrar</button>
            </li>
          )
        )}
      </ul>
      <form
        onSubmit={event => {
          event.preventDefault()
          create({ displayText })
          setDisplayText('')
        }}
      >
        <input
          id="note"
          type="text"
          value={displayText}
          onChange={event => setDisplayText(event.target.value)}
        />
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default Notes
