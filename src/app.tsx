import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { GlobalFonts, GlobalStyles } from 'components'
import { client } from 'providers'
import { Routes } from 'routes'

function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalFonts />
      <GlobalStyles />
      <Routes />
    </ApolloProvider>
  )
}

export default App
