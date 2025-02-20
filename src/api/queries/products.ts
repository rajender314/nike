import { gql } from '@apollo/client'

//create

//read
export const GET_PRODUCTS = gql`
  query products($sportId: String) {
    products(limit: 50, page: 1, sort: ASC, search: "", sportId: $sportId) {
      count
      pages
      page
      products {
        _id
        name
        type
        franchise
        productProfileLogo
        year
        status
        logo {
          _id
          name
          logo
          ProductId
          status
          size
        }
      }
    }
  }
`

//update
export const UPDATE_PRODUCT = gql`
  mutation createProduct(
    $_id: ID
    $name: String
    $type: String
    $franchise: String
    $year: Int
    $status: Boolean
    $productProfileLogo: String
  ) {
    createProduct(
      _id: $_id
      name: $name
      type: $type
      franchise: $franchise
      year: $year
      status: $status
      productProfileLogo: $productProfileLogo
    ) {
      _id
      name
      type
      franchise
      year
      status
      productProfileLogo
      logo {
        name
        _id
        status
        ProductId
      }
    }
  }
`

//delete
