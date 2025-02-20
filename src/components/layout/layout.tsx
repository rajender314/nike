import React, { useContext } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { UserContext } from 'providers'
import { Header } from 'components'
import { Container, AppContainer } from './layout-components'

export default function Layout() {
  const { pathname } = useLocation()
  const { user } = useContext(UserContext)

  return (
    <Container>
      {pathname.indexOf('/admin') > -1 &&
        pathname.indexOf('/designer') === -1 &&
        user &&
        user.email && <Header />}
      <AppContainer>
        <Outlet />
      </AppContainer>
    </Container>
  )
}
