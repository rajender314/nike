import React from 'react'
import { Team as TTeam } from 'types'
import {
  TeamListContainer,
  TeamListItem,
  Logo,
  TeamName,
} from './team-list-components'

type Props = {
  teams: TTeam[]
  selectedTeam: TTeam
  onSelect: (e: any) => void
}

export default function TeamList({ teams, selectedTeam, onSelect }: Props) {
  return (
    <TeamListContainer>
      {teams.length === 0 && <div>No Teams Found</div>}
      {teams.length > 0 &&
        teams.map((team: any, index: number) => {
          return (
            <TeamListItem
              key={index}
              active={selectedTeam._id === team._id}
              onClick={() => onSelect(team)}>
              <Logo>
                {team.logo.length > 0 && (
                  <img src={team.logo[0].logo} alt="Team Logo" />
                )}
              </Logo>
              <TeamName>{team.name}</TeamName>
            </TeamListItem>
          )
        })}
    </TeamListContainer>
  )
}
