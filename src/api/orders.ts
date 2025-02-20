import { useQuery, useMutation } from '@apollo/client'
import {
  CREATE_ORDER,
  GET_ORDERS,
  GET_ORDER,
  GET_STATUS,
  GET_COUNT,
  GET_ORDER_LOG,
  DUPLICATE_ORDER,
  DELETE_ORDER,
} from './queries/orders'
import { getUserVariables } from './data/user-variables'

//create
export function useCreateOrder() {
  return useMutation(CREATE_ORDER)
}

//read
export function useGetOrders(variables: {
  page?: any
  search?: any
  limit?: any
  filter?: any
  sportId?: any
}) {
  return useQuery(GET_ORDERS, { variables, fetchPolicy: 'network-only' })
}

export function useGetOrder(variables: { orderId: string }) {
  return useQuery(GET_ORDER, { variables, fetchPolicy: 'network-only' })
}

export function useGetOrderStatusList() {
  return useQuery(GET_COUNT, {
    variables: getUserVariables(),
  })
}

export function useGetOrderCount() {
  return useQuery(GET_COUNT, {
    variables: getUserVariables(),
    fetchPolicy: 'cache-and-network',
  })
}

export function useGetOrderLog(variables: { orderId?: any }) {
  return useQuery(GET_ORDER_LOG, { variables, fetchPolicy: 'no-cache' })
}

//update
export function useDuplicateOrder() {
  return useMutation(DUPLICATE_ORDER)
}

//delete
export function useGetDeleteOrder() {
  return useMutation(DELETE_ORDER)
}

const currentYear = new Date().getFullYear()

const dropdowns = {
  productTypes: [{ value: 'Football Gloves', label: 'Football Gloves' }],
  status: [{ value: 'Created', label: 'Created' }],
  gloveSizes: [
    { label: 'S', value: 'S' },
    { label: 'M', value: 'M' },
    { label: 'L', value: 'L' },
    { label: 'XL', value: 'XL' },
    { label: '2XL', value: '2XL' },
    { label: '3XL', value: '3XL' },
    { label: '4XL', value: '4XL' },
    { label: '5XL', value: '5XL' },
  ],
  seasons: [
    { label: 'FA ' + currentYear, value: String(currentYear) },
    { label: 'FA ' + (currentYear + 1), value: String(currentYear + 1) },
    { label: 'FA ' + (currentYear + 2), value: String(currentYear + 2) },
  ],
  owners: [
    { label: 'Andrew Nguyen', value: 'Andrew Nguyen' },
    { label: 'Cody Dill', value: 'Cody Dill' },
    { label: 'Drew Browder', value: 'Drew Browder' },
    { label: 'Other', value: 'Other' },
  ],
  orderStatus: [
    { label: 'Created', value: 'Created' },
    { label: 'Pending Internal Review', value: 'Pending Internal Review' },
    { label: 'Ready for Player', value: 'Ready for Player' },
    { label: 'Sent to Player', value: 'Sent to Player' },
    { label: 'Player Approved', value: 'Player Approved' },
    { label: 'Pending Nike Approval', value: 'Pending Nike Approval' },
    { label: 'Final Approved', value: 'Final Approved' },
    { label: 'SPEC Created', value: 'SPEC Created' },
    { label: 'Archive', value: 'Archive' },
  ],
}

export function getOrdersDropdown() {
  return dropdowns
}

const statusColors = [
  {
    code: 0,
    name: 'Total Designs',
    backgroundColor: '#C6C5C5',
  },
  {
    code: 1,
    name: 'Created',
    backgroundColor: '#C9CCDD',
  },
  {
    code: 2,
    name: 'Pending Internal Review',
    backgroundColor: '#F5C3DE',
  },
  {
    code: 3,
    name: 'Ready for Player',
    backgroundColor: '#FFFBBF',
  },
  {
    code: 4,
    name: 'Sent to Player',
    backgroundColor: '#E0EFCF',
  },
  {
    code: 5,
    name: 'Player Approved',
    backgroundColor: '#BFE5D1',
  },
  {
    code: 6,
    name: 'Pending Nike Approval',
    backgroundColor: '#FAE2CA',
  },
  {
    code: 7,
    name: 'Final Approved',
    backgroundColor: '#BFE8F6',
  },
  {
    code: 8,
    name: 'Spec Created',
    backgroundColor: '#F5C8CA',
  },
  {
    code: 9,
    name: 'Archived',
    backgroundColor: '#F5C8CA',
  },
]

export function getOrderStatusColors() {
  return statusColors
}
