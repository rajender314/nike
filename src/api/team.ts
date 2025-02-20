import { gql, useQuery, useMutation } from '@apollo/client'
import { getUserVariables } from './data/user-variables'
import { CREATE_TEAM, GET_TEAMS } from './queries/team'

//create
export function useCreateTeam() {
  return useMutation(CREATE_TEAM, {
    fetchPolicy: 'network-only',
    refetchQueries: [{ query: GET_TEAMS, variables: getUserVariables() }],
  })
}

//read
export function useGetTeams() {
  return useQuery(GET_TEAMS, {
    fetchPolicy: 'cache-and-network',
    variables: getUserVariables(),
  })
}

//update
export function useUpdateTeam() {
  return useMutation(CREATE_TEAM, {
    fetchPolicy: 'network-only',
  })
}

//delete

const UPDATE_TEAM_NAME = gql`
  mutation createTeam($_id: ID, $name: String) {
    createTeam(_id: $_id, name: $name) {
      _id
      name
    }
  }
`

export function useUpdateTeamName() {
  return useMutation(UPDATE_TEAM_NAME)
}
