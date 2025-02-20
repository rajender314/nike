import { gql } from '@apollo/client'

//create
export const CREATE_TEAM_ARTWORK = gql`
  mutation createTeamArtWork(
    $_id: ID
    $teamId: String
    $name: String
    $palmPattern: String
    $bohPattern: String
    $dieCastLeftPattern: String
    $dieCastRightPattern: String
    $status: Boolean
  ) {
    createTeamArtWork(
      _id: $_id
      teamId: $teamId
      name: $name
      palmPattern: $palmPattern
      bohPattern: $bohPattern
      dieCastLeftPattern: $dieCastLeftPattern
      dieCastRightPattern: $dieCastRightPattern
      status: $status
    ) {
      _id
      teamId
      name
      palmPattern
      bohPattern
      dieCastLeftPattern
      dieCastRightPattern
      status
    }
  }
`

//read

//update

//delete
