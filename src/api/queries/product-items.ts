import { gql } from '@apollo/client'

//create

//read
export const GET_PRODUC_ITEMS = gql`
  query productItems($productName: String) {
    productsItems(productName: $productName) {
      productName
      products {
        _id
        itemId
        item
        playerItem
        pdfItem
        itemType
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
        component
        supplier
        notes
        color
        status
      }
    }
  }
`

//update

//delete
