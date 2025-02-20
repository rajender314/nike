import { useQuery } from '@apollo/client'
import { GET_SPORTS } from './queries/sport'

export function useGetSports() {
  return useQuery(GET_SPORTS)
}
