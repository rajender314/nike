import { useMutation } from '@apollo/client'
import { getUserVariables } from './data/user-variables'
import { GET_TEAMS } from './queries/team'
import { CREATE_TEAM_LOGO } from './queries/team-logo'

//create
export function useCreateTeamLogo() {
  return useMutation(CREATE_TEAM_LOGO, {
    refetchQueries: [{ query: GET_TEAMS, variables: getUserVariables() }],
  })
}

//read

//update

//delete
