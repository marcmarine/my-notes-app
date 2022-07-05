import { gql } from 'graphql-request'

export const CREATE_NOTE = gql`
  mutation createNote($displayText: String, $author: String) {
    createNote(displayText: $displayText, author: $author) {
      author
      displayText
    }
  }
`
