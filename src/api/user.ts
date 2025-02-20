import { gql, useMutation, useQuery } from '@apollo/client'
import { CREATE_USER, GET_USERS } from './queries/user'

//create
export function useCreateUser() {
  return useMutation(CREATE_USER)
}

//read
export function useGetUsers() {
  return useQuery(GET_USERS)
}

//update
export function useUpdateUser() {
  return useMutation(CREATE_USER)
}

//delete
