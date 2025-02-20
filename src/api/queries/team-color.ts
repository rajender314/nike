import { gql } from '@apollo/client'

//create
export const CREATE_TEAM_COLOR = gql`
  mutation createTeamColor(
    $_id: ID
    $teamId: String!
    $name: String!
    $status: Boolean
    $code: String!
    $publicName: String
  ) {
    createTeamColor(
      _id: $_id
      status: $status
      teamId: $teamId
      name: $name
      code: $code
      publicName: $publicName
    ) {
      _id
      teamId
      name
      status
      code
      publicName
    }
  }
`

//read

//update

//delete
