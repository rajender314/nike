import { gql } from '@apollo/client'

//create
export const CREATE_PLAYER_LOGO = gql`
  mutation createPlayerLogo(
    $_id: ID
    $playerId: String
    $name: String
    $status: Boolean
    $logo: String
    $aiLogo: String
    $aiName: String
  ) {
    createPlayerLogo(
      _id: $_id
      playerId: $playerId
      status: $status
      name: $name
      logo: $logo
      aiLogo: $aiLogo
      aiName: $aiName
    ) {
      _id
      playerId
      name
      status
      logo
      aiLogo
      aiName
    }
  }
`

//read

//update

//delete
