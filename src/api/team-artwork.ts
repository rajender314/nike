import { useMutation } from '@apollo/client'
import { getUserVariables } from './data/user-variables'
import { GET_TEAMS } from './queries/team'
import { CREATE_TEAM_ARTWORK } from './queries/team-artwork'

//create
export function useCreateTeamArtwork() {
  return useMutation(CREATE_TEAM_ARTWORK, {
    refetchQueries: [{ query: GET_TEAMS, variables: getUserVariables() }],
  })
}

//read

//update

//delete
