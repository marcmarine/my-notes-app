import { request, RequestDocument, Variables } from 'graphql-request'

const makeRequest = (query: RequestDocument, variables?: Variables) =>
  request('http://localhost:4000/', query, variables)

export { makeRequest }
