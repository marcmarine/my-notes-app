import { Outlet, useParams } from 'react-router-dom'
import useGetNotesQuery from '../../hooks/useGetNotesQuery'
import useCreateNoteMutation from '../../hooks/useCreateNoteMutation'
import useDeleteNotesMutation from '../../hooks/useDeleteNotesMutation'
import useGetNoteByIdQuery from '../../hooks/useGetNoteByIdQuery'
import { useNotifications } from '../../components/Notifications'

import useUpdateNotesMutation from '../../hooks/useUpdateNoteMutation'
export interface Note {
  id: string
  displayText: string
}

export type NotesContextType = {
  note: Note
  notes: Note[]
  status: string
  create: (text: string) => void
  remove: (id: string) => void
  update: (id: string, text: string) => void
}

function Notes(): JSX.Element {
  const { noteId } = useParams()
  const { status: statusNotes, data: notes } = useGetNotesQuery()
  const { data: note, status: statusNote } = useGetNoteByIdQuery(noteId || '')
  const { mutate: createMutation } = useCreateNoteMutation()
  const { mutate: removeMutation } = useDeleteNotesMutation()
  const { mutate: updateMutation } = useUpdateNotesMutation()
  const { notify } = useNotifications()

  function create(displayText: string) {
    createMutation(
      { displayText },
      {
        onSuccess: () => notify('created!'),
        onError: () => notify('Ups, something went wrong!')
      }
    )
  }

  function remove(id: string) {
    removeMutation(
      { id },
      {
        onSuccess: () => notify('removed!'),
        onError: () => notify('Ups, something went wrong!')
      }
    )
  }

  function update(id: string, displayText: string) {
    updateMutation({ id, displayText })
  }

  return (
    <Outlet
      context={{
        notes,
        note,
        status: statusNotes || statusNote,
        create,
        remove,
        update
      }}
    />
  )
}

export default Notes
