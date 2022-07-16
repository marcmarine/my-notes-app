import { Outlet } from 'react-router-dom'
import useGetNotesQuery from '../../hooks/useGetNotesQuery'
import useCreateNoteMutation from '../../hooks/useCreateNoteMutation'
import useDeleteNotesMutation from '../../hooks/useDeleteNotesMutation'
import { useNotifications } from '../../components/Notifications'

import useUpdateNotesMutation from '../../hooks/useUpdateNoteMutation'
export interface Note {
  id: string
  displayText: string
}

export type NotesContextType = {
  data: Note[]
  status: string
  create: (text: string) => void
  remove: (id: string) => void
  update: (id: string, text: string) => void
}

function Notes(): JSX.Element {
  const { status, data } = useGetNotesQuery()
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

  return <Outlet context={{ data, status, create, remove, update }} />
}

export default Notes
