import { useQuery } from 'react-query'
import { makeRequest } from '../graphql/makeRequest'
import { GET_NOTES } from '../graphql/queries/getNotes'

function useNotes() {
  const getNotes = async () => {
    const { notes } = await makeRequest(GET_NOTES)
    return notes
  }

  return useQuery('notes', getNotes)
}

export default useNotes
