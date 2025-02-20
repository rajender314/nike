import React, { useEffect, useState, useContext } from 'react'
import { useGetSports, useUpdateUser } from 'api'
import { UserContext } from 'providers'
import { Icon } from 'components'
import {
  Container,
  ListHeader,
  ListTitle,
  ListContainer,
  ListItem,
  SelectionCard,
  SportLabel,
  SportIcon,
} from './sports-component'

export default function Sports() {
  const { loading, data } = useGetSports()
  const [updateUser] = useUpdateUser()
  const { user, setUser } = useContext(UserContext)

  const [sportsList, setSportsList] = useState<any[]>([])

  const { _id: userId } = user

  useEffect(() => {
    if (!loading && data.sports) {
      setSportsList(data.sports)
    }
  }, [loading, data])

  function selectSport(sport: any) {
    setUser({ ...user, sportId: sport.sportId, sportName: sport.sportName })
    updateUser({ variables: { _id: userId, sportId: sport.sportId } })
  }

  if (loading) {
    return <Icon name="nikeLoading" />
  }

  return (
    <Container>
      <ListHeader>
        <ListTitle>Sports</ListTitle>
      </ListHeader>
      <ListContainer>
        {sportsList.map((sport: any) => {
          return (
            <ListItem key={sport.sportId}>
              <SelectionCard
                active={sport.sportId === user.sportId}
                onClick={() => selectSport(sport)}>
                <SportIcon>
                  <Icon name={sport.sportId} />
                </SportIcon>
                <SportLabel>{sport.sportName}</SportLabel>
              </SelectionCard>
            </ListItem>
          )
        })}
      </ListContainer>
    </Container>
  )
}
