const { ApolloServer, gql } = require('apollo-server')
const {
  ApolloServerPluginLandingPageGraphQLPlayground
} = require('apollo-server-core')
const { v4: uuidv4 } = require('uuid')

let notes = [
  {
    id: uuidv4(),
    displayText: 'My first awesome note',
    author: 'Marc'
  },
  {
    id: uuidv4(),
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

  type Mutation {
    addNote(displayText: String, author: String): Note
  }
`

const resolvers = {
  Query: {
    notes: () => notes
  },
  Mutation: {
    addNote: (_, args) => {
      const id = uuidv4()
      notes.push({ id, ...args })
      return args
    }
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
