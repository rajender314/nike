import { gql, useQuery, useMutation } from '@apollo/client'
import { getUserVariables } from './data/user-variables'
import { PLAYER_GLOVE_SIZES, FOOTBALL_POSITIONS } from './data/player'
import { CREATE_PLAYER, GET_PLAYERS, GET_LAZY_PLAYERS } from './queries/player'

//create
export function useCreatePlayer() {
  return useMutation(CREATE_PLAYER, {
    fetchPolicy: 'network-only',
    refetchQueries: [
      { query: GET_LAZY_PLAYERS, variables: getUserVariables() },
    ],
  })
}

//read
export function useGetPlayers() {
  return useQuery(GET_PLAYERS, {
    variables: getUserVariables(),
    fetchPolicy: 'cache-and-network',
  })
}

export function useLazyGetPlayers() {
  return useQuery(GET_LAZY_PLAYERS, {
    variables: getUserVariables(),
    fetchPolicy: 'cache-and-network',
  })
}

//update
export function useUpdatePlayer() {
  return useMutation(CREATE_PLAYER, {
    fetchPolicy: 'network-only',
  })
}

//delete

const GET_TEAMS_FOR_PLAYERS = gql`
  query teams($sportId: String) {
    teams(page: 1, sort: ASC, search: "", sportId: $sportId) {
      count
      pages
      page
      teams {
        value: _id
        label: name
      }
    }
  }
`
export function useGetTeamsPlayer(variables: { sportId?: any }) {
  return useQuery(GET_TEAMS_FOR_PLAYERS, { variables })
}

export function useGetSizes() {
  return PLAYER_GLOVE_SIZES
}

export function useGetPositions() {
  return FOOTBALL_POSITIONS
}

const PLAYER_LOGIN = gql`
  mutation accessCodeLogin($accessCode: String) {
    accessCodeLogin(accessCode: $accessCode) {
      status
      message
      isPlayer
      isTeam
      data {
        _id
        name
        accessCode
        playerCode
        sportId
        brand
      }
    }
  }
`
export function usePlayerLogin() {
  return useMutation(PLAYER_LOGIN)
}
