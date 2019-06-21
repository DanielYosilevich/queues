import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = createHttpLink({
    uri: 'http://localhost:3004/graphql',
    // uri: '/graphql'
})

const defaultOptions = {
    watchQuery: {
        //  fetchPolicy: 'cache-and-network',
        errorPolicy: 'all'
    },
    query: {
        // fetchPolicy: 'network-only',
        errorPolicy: 'all'
    },
    mutate: {
        errorPolicy: 'all'
    }
}

export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    defaultOptions
})

