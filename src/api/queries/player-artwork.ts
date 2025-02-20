import { gql } from '@apollo/client'

//create
export const CREATE_PLAYER_ARTWORK = gql`
  mutation createPlayerArtWork(
    $_id: ID
    $playerId: String
    $name: String
    $palmPattern: String
    $bohPattern: String
    $dieCastLeftPattern: String
    $dieCastRightPattern: String
    $status: Boolean
  ) {
    createPlayerArtWork(
      _id: $_id
      playerId: $playerId
      name: $name
      palmPattern: $palmPattern
      bohPattern: $bohPattern
      dieCastLeftPattern: $dieCastLeftPattern
      dieCastRightPattern: $dieCastRightPattern
      status: $status
    ) {
      _id
      playerId
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
