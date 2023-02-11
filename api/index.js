const { ApolloServer, gql } = require('apollo-server')
const {
  ApolloServerPluginLandingPageGraphQLPlayground
} = require('apollo-server-core')
const { v4: uuidv4 } = require('uuid')

let notes = [
  {
    id: '1',
    content: 'My first awesome note'
  },
  {
    id: '2',
    content: 'Cute!'
  }
]

const typeDefs = gql`
  type Note {
    id: String!
    content: String
  }

  type Query {
    notes: [Note]
    noteById(id: ID!): Note
  }

  type Mutation {
    createNote(id: ID, content: String!): Note
    deleteNote(id: ID!): String
    updateNote(id: ID!, content: String): String
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
      return args.content
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
