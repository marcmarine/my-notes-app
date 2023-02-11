import { gql } from 'graphql-request'

export const UPDATE_NOTE = gql`
  mutation updateNote($id: ID!, $content: String) {
    updateNote(id: $id, content: $content)
  }
`
