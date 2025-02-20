import { gql } from '@apollo/client'

//create
export const CREATE_USER = gql`
  mutation createUser(
    $_id: ID
    $name: String
    $email: String
    $status: Boolean
    $userProfileLogo: String
    $sportId: String
  ) {
    createUser(
      _id: $_id
      name: $name
      email: $email
      status: $status
      userProfileLogo: $userProfileLogo
      sportId: $sportId
    ) {
      success
      message
      user {
        _id
        name
        email
        status
        userProfileLogo
        sportId
      }
    }
  }
`

//read
export const GET_USERS = gql`
  query users {
    users {
      _id
      name
      email
      status
      userProfileLogo
    }
  }
`

//update

//delete
