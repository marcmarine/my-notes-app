import { useMutation, useQueryClient } from 'react-query'
import { makeRequest } from '../graphql/makeRequest'
import { DELETE_NOTE } from '../graphql/mutations/removeNote'
import { Note } from '../types/note'

function useDeleteNotesMutation() {
  const queryClient = useQueryClient()

  const deleteNote = ({ id }: { [key: string]: string }) =>
    makeRequest(DELETE_NOTE, { id })

  return useMutation(deleteNote, {
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries('notes')

      const previousTodos = queryClient.getQueryData('notes')

      queryClient.setQueryData('notes', (old: any): Note[] =>
        old.filter((note: Note) => note.id !== id)
      )

      return { previousTodos }
    },

    onError: (err, newTodo, context: any) => {
      queryClient.setQueryData('notes', context.previousTodos)
    },

    onSettled: () => {
      queryClient.invalidateQueries('notes')
    }
  })
}

export default useDeleteNotesMutation
