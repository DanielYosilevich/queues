import gql from 'graphql-tag';

export const POSTS_QUERY = gql`
query {
  posts {
    _id,
    title,
    description,
    importance,
    createdAt,
    lastTried,
    sentAt,
    triesCount
  }
}
`