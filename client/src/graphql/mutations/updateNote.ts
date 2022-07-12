import { gql } from 'graphql-request'

export const UPDATE_NOTE = gql`
  mutation updateNote($id: ID!, $displayText: String) {
    updateNote(id: $id, displayText: $displayText)
  }
`
