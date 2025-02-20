import { gql } from '@apollo/client'

//create
export const CREATE_TEAM_LOGO = gql`
  mutation createTeamLogo(
    $_id: ID
    $teamId: String
    $status: Boolean
    $name: String
    $logo: String
    $aiLogo: String
    $aiName: String
  ) {
    createTeamLogo(
      _id: $_id
      status: $status
      teamId: $teamId
      name: $name
      logo: $logo
      aiLogo: $aiLogo
      aiName: $aiName
    ) {
      _id
      teamId
      status
      name
      logo
      aiLogo
      aiName
    }
  }
`

//read

//update

//delete
