import { useMutation, useQueryClient } from 'react-query'
import { makeRequest } from '../graphql/makeRequest'
import { UPDATE_NOTE } from '../graphql/mutations/updateNote'
import { Note } from '../features/notes'

function useUpdateNotesMutation() {
  const queryClient = useQueryClient()

  const updateNote = ({ id, content }: { [key: string]: String }) =>
    makeRequest(UPDATE_NOTE, { id, content })

  return useMutation(updateNote, {
    onMutate: async ({ id, content }) => {
      await queryClient.cancelQueries('note')

      const previousNote = queryClient.getQueryData<Note>('note')
      const newNote = { ...previousNote, content }

      const previousNotes = queryClient.getQueryData<Note[]>('notes')
      const newNotes = previousNotes?.map((note: Note) =>
        note.id === id ? { ...note, content } : note
      )

      queryClient.setQueryData('notes', newNotes)

      return newNote
    },

    onError: (err, newTodo, context: any) => {
      queryClient.setQueryData('note', context.previousTodos)
    },

    onSettled: () => {
      queryClient.invalidateQueries('note')
    }
  })
}

export default useUpdateNotesMutation
