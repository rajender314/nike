import { useQuery, useMutation } from '@apollo/client'
import {
  GET_PLAYER_ORDERS,
  GET_TEAM_ORDERS,
  UPDATE_ORDER,
} from './queries/player-orders'

//create

//read
export function useGetPlayerOrders(variables: { playerCode: string }) {
  return useQuery(GET_PLAYER_ORDERS, { variables })
}

export function useGetTeamOrders(variables: { teamId: string }) {
  return useQuery(GET_TEAM_ORDERS, { variables })
}

//update
export function useUpdateOrder(variables?: any, refetchQueries?: any[]) {
  return useMutation(UPDATE_ORDER, {
    variables,
    refetchQueries,
  })
}

//delete
