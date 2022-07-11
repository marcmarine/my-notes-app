import { useQuery } from 'react-query'
import { GET_NOTE_BY_ID } from '../graphql/queries/getNoteById'
import { makeRequest } from '../graphql/makeRequest'

function useGetNoteByIdQuery(noteId: String | undefined) {
  const getNoteById = async () => {
    const { noteById } = await makeRequest(GET_NOTE_BY_ID, { id: noteId })
    return noteById
  }

  return useQuery('note', getNoteById)
}

export default useGetNoteByIdQuery
