import { ApolloClient, InMemoryCache } from '@apollo/client'
export const baseURL = process.env.REACT_APP_HTTP_BASEURL

export const client = new ApolloClient({
  uri: `${baseURL}graphql`,
  cache: new InMemoryCache(),
  credentials: 'same-origin',
})
