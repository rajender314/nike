import { gql } from '@apollo/client'

//create

//read
export const GET_PLAYER_ORDERS = gql`
  query playerOrders($playerCode: String) {
    playerOrders(playerCode: $playerCode) {
      name
      number
      playerCode
      accessCode
      teamName
      size
      position
      playerProfileLogo
      orders {
        orderId
        orderCode
        orderColorNumber
        teamName
        productProfileLogo
        thumbnailLogo
        updatedAt
        status
        orderStatus
        trackStatus
      }
    }
  }
`

export const GET_TEAM_ORDERS = gql`
  query teamOrders($teamId: String) {
    teamOrders(teamId: $teamId) {
      _id
      name
      accessCode
      orders {
        orderId
        orderCode
        orderColorNumber
        teamName
        productProfileLogo
        thumbnailLogo
        updatedAt
        status
        orderStatus
        trackStatus
      }
    }
  }
`

//update
export const UPDATE_ORDER = gql`
  mutation createOrder(
    $_id: ID
    $playerId: String
    $teamId: String
    $orderStatus: String
    $trackStatus: String
    $thumbnailLogo: String
    $productItems: [productOptions]
    $customMessage: JSON
    $dieCast: JSON
    $notes: String
  ) {
    createOrder(
      _id: $_id
      playerId: $playerId
      teamId: $teamId
      orderStatus: $orderStatus
      trackStatus: $trackStatus
      thumbnailLogo: $thumbnailLogo
      productItems: $productItems
      customMessage: $customMessage
      dieCast: $dieCast
      notes: $notes
    ) {
      _id
    }
  }
`

//delete
