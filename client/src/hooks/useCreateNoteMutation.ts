import { useMutation, useQueryClient } from 'react-query'
import { makeRequest } from '../graphql/makeRequest'
import { CREATE_NOTE } from '../graphql/mutations/createNote'

function useCreateNoteMutation() {
  const queryClient = useQueryClient()

  const createNote = ({ id, content }: { [key: string]: String }) =>
    makeRequest(CREATE_NOTE, { id, content })

  return useMutation(createNote, {
    onMutate: async newNote => {
      await queryClient.cancelQueries('notes')

      const previousTodos = queryClient.getQueryData('notes')

      queryClient.setQueryData('notes', (old: any) => [...old, newNote])

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

export default useCreateNoteMutation
