import { useState } from 'react'
import useCreateNoteMutation from '../hooks/useCreateNoteMutation'
import useDeleteNotesMutation from '../hooks/useDeleteNotesMutation'
import useGetNotesQuery from '../hooks/useGetNotesQuery'
import { Note } from '../types/note'

function Notes(): JSX.Element {
  const [displayText, setDisplayText] = useState('')
  const { status, data, error, isFetching } = useGetNotesQuery()
  const { mutate: remove } = useDeleteNotesMutation()
  const { mutate: create } = useCreateNoteMutation()

  if (status === 'loading') return <>loading...</>

  return (
    <>
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
      <ul>
        {data.map(
          ({ id, displayText }: Note): JSX.Element => (
            <li key={id.toString()}>
              <span>{displayText}</span>
              <button onClick={() => remove({ id })}>borrar</button>
            </li>
          )
        )}
      </ul>
    </>
  )
}

export default Notes
