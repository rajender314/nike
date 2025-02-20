import { gql } from '@apollo/client'

//create
export const CREATE_TEAM = gql`
  mutation createTeam(
    $_id: ID
    $name: String
    $accessCode: String
    $brand: String
    $sportId: String
  ) {
    createTeam(
      _id: $_id
      name: $name
      accessCode: $accessCode
      brand: $brand
      sportId: $sportId
    ) {
      _id
      name
      accessCode
      brand
      logo {
        _id
        teamId
        name
        status
        logo
        aiLogo
        aiName
      }
      color {
        _id
        teamId
        status
        name
        code
      }
      artWork {
        _id
        teamId
        name
        palmPattern
        bohPattern
        dieCastLeftPattern
        dieCastRightPattern
        status
      }
      status
      message
    }
  }
`

//read
export const GET_TEAMS = gql`
  query teams($sportId: String) {
    teams(limit: 50, page: 1, sort: DESC, search: "", sportId: $sportId) {
      count
      pages
      page
      teams {
        _id
        name
        accessCode
        brand
        logo {
          _id
          teamId
          status
          name
          logo
          aiLogo
          aiName
        }
        color {
          _id
          teamId
          name
          status
          code
          publicName
        }
        artWork {
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
    }
  }
`

//update

//delete
