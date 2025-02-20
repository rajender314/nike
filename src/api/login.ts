import { useMutation } from '@apollo/client'
import { LOGIN_USER } from './queries/login'

//login
export function useLoginUser() {
  return useMutation(LOGIN_USER)
}
