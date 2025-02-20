import { gql } from '@apollo/client'

export const GET_SPORTS = gql`
  {
    sports {
      _id
      sportId
      sportName
    }
  }
`
