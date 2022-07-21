import { gql } from 'graphql-request'

export const CREATE_NOTE = gql`
  mutation createNote($displayText: String!, $id: ID) {
    createNote(displayText: $displayText, id: $id) {
      id
      displayText
    }
  }
`
