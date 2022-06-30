import useSWR from 'swr'
import { makeRequest } from '../utils/makeRequest'

function useNotes() {
  const { data, error } = useSWR(
    `{
      notes {
        id
        displayText
      }
    }`,
    makeRequest
  )

  return {
    data: data?.notes,
    isLoading: !error && !data,
    isError: error
  }
}

export default useNotes
