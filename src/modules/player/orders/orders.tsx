import React from 'react'
import { PlayerOrders, TeamOrders } from 'modules/player'

export default function Orders() {
  const playerData = sessionStorage.getItem('playerData')
  const loginData: any = playerData ? JSON.parse(playerData) : {}

  return <>{loginData.isTeam ? <TeamOrders /> : <PlayerOrders />}</>
}
