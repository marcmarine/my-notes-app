const { ApolloServer, gql } = require('apollo-server')
const {
  ApolloServerPluginLandingPageGraphQLPlayground
} = require('apollo-server-core')

const notes = [
  {
    id: '1',
    displayText: 'My first awesome note',
    author: 'Marc'
  },
  {
    id: '2',
    displayText: 'Cute!',
    author: 'Marc'
  }
]

const typeDefs = gql`
  type Note {
    id: String!
    displayText: String
    author: String
  }

  type Query {
    notes: [Note]
  }
`

const resolvers = {
  Query: {
    notes: () => notes
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
