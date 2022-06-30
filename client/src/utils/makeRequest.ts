import { request, RequestDocument } from 'graphql-request'

const makeRequest = (query: RequestDocument) =>
  request('http://localhost:4000/', query)

export { makeRequest }
