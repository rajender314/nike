import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { UserContext } from 'providers'

export function AdminRoute({ children }: any) {
  const {
    user: { email },
  } = useContext(UserContext)
  const location = useLocation()

  if (!email) {
    return <Navigate to="/admin/login" state={{ from: location }} />
  }

  return children
}
