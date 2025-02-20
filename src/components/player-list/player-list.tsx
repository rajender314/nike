import React, { useState } from 'react'
import { Player as TPlayer } from 'types'
import {
  PlayerListContainer,
  PlayerListItem,
  Logo,
  PlayerName,
  PreviewImg,
  Nodata,
} from './player-list-components'
type Props = {
  players: TPlayer[]
  selectedPlayer: TPlayer
  onSelect: (e: any) => void
}

export default function PlayerList({
  players,
  selectedPlayer,
  onSelect,
}: Props) {
  const [searchText] = useState('')

  return (
    <PlayerListContainer>
      {players && !players.length && searchText && (
        <Nodata>No Players Found</Nodata>
      )}
      {players && !players.length && !searchText && (
        <Nodata>No Players Yet</Nodata>
      )}

      {players.map((player: any, index: number) => {
        return (
          <PlayerListItem
            key={index}
            active={selectedPlayer._id === player._id}
            onClick={() => onSelect(player)}>
            <Logo>
              <PreviewImg src={player.playerProfileLogo}></PreviewImg>
            </Logo>

            <PlayerName>{player.name}</PlayerName>
          </PlayerListItem>
        )
      })}
    </PlayerListContainer>
  )
}
