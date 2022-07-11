import { gql } from 'graphql-request'

export const GET_NOTES = gql`
  query getNotes {
    notes {
      id
      displayText
    }
  }
`
