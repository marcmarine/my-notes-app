import { gql } from 'graphql-request'

export const DELETE_NOTE = gql`
  mutation deleteNote($id: ID) {
    deleteNote(id: $id)
  }
`
