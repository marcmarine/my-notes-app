import { useMutation, useQueryClient } from 'react-query'
import { makeRequest } from '../graphql/makeRequest'
import { UPDATE_NOTE } from '../graphql/mutations/updateNote'
import { Note } from '../types/note'

function useUpdateNotesMutation() {
  const queryClient = useQueryClient()

  const updateNote = ({ id, displayText }: { [key: string]: String }) =>
    makeRequest(UPDATE_NOTE, { id, displayText })

  return useMutation(updateNote, {
    onMutate: async ({ id, displayText }) => {
      await queryClient.cancelQueries('note')

      const previousNote = queryClient.getQueryData<Note>('note')
      const newNote = { ...previousNote, displayText }

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
