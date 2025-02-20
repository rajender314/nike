import React from 'react'
import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom'
import {
  Login,
  OrderDetail,
  Orders,
  Players,
  Products,
  SportSelection,
  Teams,
  Users,
} from 'modules/admin'
import { PlayerWelcome, Orders as PlayerOrders } from 'modules/player'
import { Designer } from 'modules/designer'
import { AdminAuthProvider } from 'providers'
import { AdminRoute, PlayerRoute } from 'routes'
import { Layout } from 'components'

const InvalidPageStyles = {
  height: '100%',
  width: 'calc(100 - 72px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const AdminRoutes = [
  {
    path: '',
    component: Orders,
    admin: true,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'sports',
    component: SportSelection,
    admin: true,
  },
  {
    path: 'orders',
    component: Orders,
    admin: true,
  },
  {
    path: 'teams',
    component: Teams,
    admin: true,
  },
  {
    path: 'players',
    component: Players,
    admin: true,
  },
  {
    path: 'styles',
    component: Products,
    admin: true,
  },
  {
    path: 'users',
    component: Users,
    admin: true,
  },
  {
    path: 'create-order',
    component: OrderDetail,
    admin: true,
  },
  {
    path: 'orders/:orderId',
    component: OrderDetail,
    admin: true,
  },
]

const PlayerRoutes = [
  {
    path: '/',
    component: PlayerWelcome,
  },
  {
    path: '/orders',
    component: PlayerOrders,
    player: true,
  },
  {
    path: '/designer/:orderId',
    component: Designer,
    player: true,
  },
]

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Layout />}>
          {PlayerRoutes.map((route, i) =>
            route.player ? (
              <Route
                path={route.path}
                key={i}
                element={
                  <PlayerRoute>
                    <route.component />
                  </PlayerRoute>
                }
              />
            ) : (
              <Route path={route.path} key={i} element={<route.component />} />
            ),
          )}
        </Route>

        <Route
          path="/admin"
          element={
            <AdminAuthProvider>
              <Layout />
            </AdminAuthProvider>
          }>
          {AdminRoutes.map((route, i) =>
            route.admin ? (
              <Route
                path={route.path}
                key={i}
                element={
                  <AdminRoute>
                    <route.component />
                  </AdminRoute>
                }
              />
            ) : (
              <Route path={route.path} key={i} element={<route.component />} />
            ),
          )}
        </Route>

        <Route
          path="*"
          element={<div style={InvalidPageStyles}>Page Not Found</div>}
        />
      </Switch>
    </BrowserRouter>
  )
}
