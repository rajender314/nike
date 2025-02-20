import { useMutation } from '@apollo/client'
import { getUserVariables } from './data/user-variables'
import { GET_LAZY_PLAYERS } from './queries/player'
import { CREATE_PLAYER_ARTWORK } from './queries/player-artwork'

//create
export function useCreatePlayerArtwork() {
  return useMutation(CREATE_PLAYER_ARTWORK, {
    refetchQueries: [
      { query: GET_LAZY_PLAYERS, variables: getUserVariables() },
    ],
  })
}

//read

//update

//delete
