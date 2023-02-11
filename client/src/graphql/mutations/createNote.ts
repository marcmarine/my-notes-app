import { gql } from 'graphql-request'

export const CREATE_NOTE = gql`
  mutation createNote($content: String!, $id: ID) {
    createNote(content: $content, id: $id) {
      id
      content
    }
  }
`
