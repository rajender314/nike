import { gql } from '@apollo/client'

//login
export const LOGIN_USER = gql`
  mutation login($email: String, $password: String) {
    login(email: $email, password: $password) {
      status
      message
      data {
        _id
        email
        name
        userProfileLogo
        status
        sportId
        sportName
      }
    }
  }
`
