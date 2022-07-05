const { ApolloServer, gql } = require('apollo-server')
const {
  ApolloServerPluginLandingPageGraphQLPlayground
} = require('apollo-server-core')
const { v4: uuidv4 } = require('uuid')

let notes = [
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

  type Mutation {
    createNote(displayText: String, author: String): Note
    deleteNote(id: ID): String
  }
`

const resolvers = {
  Query: {
    notes: () => notes
  },
  Mutation: {
    createNote: (_, args) => {
      const id = uuidv4()
      notes.push({ id, ...args })
      return args
    },
    deleteNote: (_, args) => {
      notes = notes.filter(note => note.id !== args.id)
      return args.id
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
