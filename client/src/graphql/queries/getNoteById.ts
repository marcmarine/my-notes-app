import { gql } from 'graphql-request'

export const GET_NOTE_BY_ID = gql`
  query getNoteById($id: ID!) {
    noteById(id: $id) {
      id
      content
    }
  }
`
