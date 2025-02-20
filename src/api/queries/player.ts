import { gql } from '@apollo/client'

//create
export const CREATE_PLAYER = gql`
  mutation createPlayer(
    $_id: ID
    $name: String
    $accessCode: String
    $description: String
    $teamId: String
    $number: Int
    $brand: String
    $size: String
    $position: String
    $playerProfileLogo: String
    $sportId: String
  ) {
    createPlayer(
      _id: $_id
      name: $name
      description: $description
      teamId: $teamId
      number: $number
      accessCode: $accessCode
      playerProfileLogo: $playerProfileLogo
      brand: $brand
      size: $size
      position: $position
      sportId: $sportId
    ) {
      _id
      name
      description
      playerCode
      status
      message
      accessCode
      playerProfileLogo
      teamId
      brand
      number
      size
      position
      sportId
      logo {
        _id
        name
        playerId
        status
        logo
      }
      artWork {
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
  }
`

//read
export const GET_PLAYERS = gql`
  query players($sportId: String) {
    players(limit: 50, page: 1, sort: DESC, search: "", sportId: $sportId) {
      players {
        _id
        name
        description
        playerProfileLogo
        brand
        position
        accessCode
        number
        size
        playerCode
        team {
          _id
          name
          logo {
            name
            logo
            _id
            status
          }
          color {
            name
            code
            publicName
            _id
            status
          }
        }
        logo {
          _id
          name
          logo
          status
        }
        artWork {
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
    }
  }
`

export const GET_LAZY_PLAYERS = gql`
  query players($sportId: String) {
    players(limit: 50, page: 1, sort: DESC, search: "", sportId: $sportId) {
      count
      pages
      page
      players {
        _id
        name
        description
        playerProfileLogo
        teamId
        accessCode
        position
        playerCode
        brand
        number
        playerCode
        size
        logo {
          _id
          name
          playerId
          status
          logo
          aiLogo
          aiName
        }
        artWork {
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
    }
  }
`

//update

//delete
