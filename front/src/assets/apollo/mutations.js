import gql from 'graphql-tag';

export const ADD_POST_MUTATION = gql`
mutation ($post: NewPostInput){
  addPost(post: $post) {
      title
      description
      importance
  }
}
`

export const REMOVE_POST_MUTATION = gql`
mutation ($_id: String){
  removePost(_id: $_id ) {
     _id
     message
  }
}
`

export const UPDATE_POST_MUTATION = gql`
mutation ($post: PostInput){
  updatePost(post: $post) {
    title
    description
    importance
  }
}
`

export const EMAIL_ONE_MUTATION = gql`
mutation ($_id: String){
  emailOne(_id: $_id ) {
     _id
  }
}
`

export const EMAIL_ALL_MUTATION = gql`
mutation {
  emailAll {
     message
  }
}
`

export const RESET_ALL_MUTATION = gql`
mutation {
  resetAll {
     message
  }
}
`
