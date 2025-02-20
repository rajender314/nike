import { useMutation } from '@apollo/client'
import { getUserVariables } from './data/user-variables'
import { GET_LAZY_PLAYERS } from './queries/player'
import { CREATE_PLAYER_LOGO } from './queries/player-logo'

//create
export function useCreatePlayerLogo() {
  return useMutation(CREATE_PLAYER_LOGO, {
    refetchQueries: [
      { query: GET_LAZY_PLAYERS, variables: getUserVariables() },
    ],
  })
}

//read

//update

//delete
