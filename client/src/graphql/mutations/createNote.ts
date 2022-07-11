import { gql } from 'graphql-request'

export const CREATE_NOTE = gql`
  mutation createNote($displayText: String) {
    createNote(displayText: $displayText) {
      displayText
    }
  }
`
