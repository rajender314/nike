import { useMutation } from '@apollo/client'
import { getUserVariables } from './data/user-variables'
import { GET_TEAMS } from './queries/team'
import { CREATE_TEAM_COLOR } from './queries/team-color'

//create
export function useCreateTeamColor() {
  return useMutation(CREATE_TEAM_COLOR, {
    refetchQueries: [{ query: GET_TEAMS, variables: getUserVariables() }],
  })
}

//read

//update

//delete
