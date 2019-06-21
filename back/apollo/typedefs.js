const typeDefs = `
scalar Date

input NewPostInput {
  title: String
  description: String
  importance: Int
}
input PostInput {
  _id: String
  title: String
  description: String
  importance: Int
}

type Post {
  _id: String
  title: String
  description: String
  importance: Int
  createdAt: Date
  lastTried: String
  sentAt: String
  triesCount: Int
}
type DeletePayload {
  _id: String
  message: String
}

type Message {
  message: String
}

# this schema allows the following query:
type Query {
  post(_id: String): Post
  posts: [Post]
}
 
# this schema allows the following mutation:
type Mutation {
  addPost(post: NewPostInput): Post
  removePost(_id: String): DeletePayload
  updatePost(post: PostInput): Post
  emailOne(_id: String): Post
  emailAll: Message
  resetAll: Message
}
 
# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: Query
  mutation: Mutation
}
`;

module.exports = {
  typeDefs
}
