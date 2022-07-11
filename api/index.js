const { ApolloServer, gql } = require('apollo-server')
const {
  ApolloServerPluginLandingPageGraphQLPlayground
} = require('apollo-server-core')
const { v4: uuidv4 } = require('uuid')

let notes = [
  {
    id: '1',
    displayText: 'My first awesome note'
  },
  {
    id: '2',
    displayText: 'Cute!'
  }
]

const typeDefs = gql`
  type Note {
    id: String!
    displayText: String
  }

  type Query {
    notes: [Note]
    noteById(id: ID!): Note
  }

  type Mutation {
    createNote(displayText: String): Note
    deleteNote(id: ID!): String
    updateNote(id: ID!, displayText: String): String
  }
`

const resolvers = {
  Query: {
    notes: () => notes,
    noteById: (_, args) => notes.find(note => note.id === args.id)
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
    },
    updateNote: (_, args) => {
      notes = notes.map(note =>
        note.id === args.id ? { ...note, ...args } : note
      )
      return args.displayText
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
