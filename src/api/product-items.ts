import { useLazyQuery } from '@apollo/client'
import { GET_PRODUC_ITEMS } from './queries/product-items'

export function useGetProductItems() {
  return useLazyQuery(GET_PRODUC_ITEMS)
}
