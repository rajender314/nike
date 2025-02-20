import { gql } from '@apollo/client'

//create
export const CREATE_ORDER = gql`
  mutation createOrder(
    $_id: ID
    $orderStatus: String
    $trackStatus: String
    $statusId: Int
    $playerId: String
    $teamId: String
    $teamName: String
    $productType: String
    $productId: String
    $season: String
    $owner: String
    $groupName: String
    $thumbnailLogo: String
    $fileName: String
    $styleName: String
    $gloveSize: String
    $singleColor: Boolean
    $productItems: [productOptions]
    $customMessage: JSON
    $userId: String
    $dieCast: JSON
    $notes: String
    $sportId: String
  ) {
    createOrder(
      _id: $_id
      orderStatus: $orderStatus
      trackStatus: $trackStatus
      statusId: $statusId
      playerId: $playerId
      teamId: $teamId
      teamName: $teamName
      productType: $productType
      productId: $productId
      thumbnailLogo: $thumbnailLogo
      season: $season
      owner: $owner
      groupName: $groupName
      fileName: $fileName
      styleName: $styleName
      gloveSize: $gloveSize
      singleColor: $singleColor
      productItems: $productItems
      customMessage: $customMessage
      userId: $userId
      dieCast: $dieCast
      notes: $notes
      sportId: $sportId
    ) {
      _id
      playerId
      teamId
      teamName
      productType
      productId
      gloveSize
      updatedAt
      thumbnailLogo
      dieCast
      sportId
      productItems {
        orderId
        itemId
        item
        pdfItem
        value
        options
        optionalColors
        primaryColors
        secondaryColors
        tertiaryColors
        pattern
        material
        brand
        logos
        customPattern
        materialOptions
        children
        supplier
        component
        notes
        color
      }
    }
  }
`

//read
export const GET_ORDERS = gql`
  query orders(
    $page: Int
    $search: String
    $limit: Int
    $filter: JSON
    $sportId: String
  ) {
    orders(
      limit: $limit
      page: $page
      search: $search
      sort: DESC
      filter: $filter
      sportId: $sportId
    ) {
      count
      pages
      page
      page
      pages
      count
      orders {
        _id
        playerId
        teamId
        productId
        orderId
        updatedAt
        product {
          _id
          name
          productProfileLogo
        }
        player {
          _id
          name
          playerProfileLogo
        }
        productType
        teamName
        gloveSize
        season
        fileName
        styleName
        orderStatus
        trackStatus
        statusId
        status
        productItems {
          _id
          orderId
          itemId
          itemType
          item
          pdfItem
          options
          optionalColors
          primaryColors
          secondaryColors
          tertiaryColors
          pattern
          material
          materialOptions
          children
          supplier
          component
          notes
          color
          status
        }
      }
    }
  }
`

export const GET_ORDER = gql`
  query order($orderId: String) {
    order(orderId: $orderId) {
      _id
      orderId
      orderCode
      orderColorNumber
      playerId
      sportId
      teamId
      teamName
      gloveSize
      productId
      productType
      orderStatus
      trackStatus
      statusId
      season
      owner
      groupName
      fileName
      styleName
      updatedAt
      product {
        _id
        name
      }
      player {
        _id
        name
        playerCode
      }
      playerLogo {
        _id
        name
        teamId
        aiName
        aiLogo
        logo
        status
      }
      playerArtWork {
        _id
        playerId
        name
        status
        palmPattern
        bohPattern
        dieCastLeftPattern
        dieCastRightPattern
      }
      teamColor {
        _id
        name
        code
        status
      }
      teamLogo {
        _id
        name
        teamId
        aiName
        aiLogo
        logo
        status
      }
      productItems {
        _id
        orderId
        itemId
        itemType
        item
        playerItem
        pdfItem
        value
        options
        optionalColors
        primaryColors
        secondaryColors
        tertiaryColors
        pattern
        material
        brand
        logos
        customPattern
        materialOptions
        children
        supplier
        component
        notes
        color
        status
      }
      customMessage
      dieCast
      notes
    }
  }
`

export const GET_STATUS = gql`
  query orderStatus($sportId: String) {
    orderStatus(sportId: $sportId) {
      OrderStatusList {
        _id
        code
        name
      }
    }
  }
`

export const GET_COUNT = gql`
  query orderStatus($sportId: String) {
    orderStatus(sportId: $sportId) {
      totalOrders
      totalStatus
      OrderStatusList {
        _id
        code
        name
        orderCount
        color
        backgroundColor
        status
      }
    }
  }
`

export const GET_ORDER_LOG = gql`
  query orderLog($orderId: String) {
    orderLog(orderId: $orderId) {
      activityLog {
        _id
        userId
        orderId
        logId
        logType
        logOrderStatus
        userName
        userProfileLogo
        logActivity
        status
        updatedAt
      }
    }
  }
`

//update
export const DUPLICATE_ORDER = gql`
  mutation orderDuplicate($_id: ID) {
    orderDuplicate(_id: $_id) {
      orderId
    }
  }
`

//delete
export const DELETE_ORDER = gql`
  mutation deleteOrder($_id: ID, $orderId: String) {
    deleteOrder(_id: $_id, orderId: $orderId) {
      message
      success
    }
  }
`
