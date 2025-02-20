import { gql, useQuery, useMutation } from '@apollo/client'
import { PRODUCT_TYPES, FRANCHISE, YEARS } from './data/products'
import { GET_PRODUCTS, UPDATE_PRODUCT } from './queries/products'

//create

//read
export function useGetProducts(variables: { sportId: string }) {
  return useQuery(GET_PRODUCTS, {
    variables,
  })
}

export function getProductsDropdown() {
  return {
    productTypes: PRODUCT_TYPES,
    franchises: FRANCHISE,
    years: YEARS,
  }
}

//update
export function useUpdateProduct() {
  return useMutation(UPDATE_PRODUCT)
}

//delete
