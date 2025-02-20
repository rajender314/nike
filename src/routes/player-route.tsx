import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export function PlayerRoute({ children }: any) {
  const playerData = sessionStorage.getItem('playerData')
  const player: any = playerData ? JSON.parse(playerData) : null
  const location = useLocation()

  if (!player) {
    return <Navigate to="/" state={{ from: location }} />
  }

  return children
}
