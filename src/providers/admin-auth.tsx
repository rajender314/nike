import React, { useState, createContext } from 'react'
import { User } from 'types'

const initialUser = JSON.parse(localStorage.getItem('user') || 'null')

type UserContextType = {
  user: User
  setUser: (user: User) => void
  unsetUser: () => void
}

type Props = {
  children: any
}

export const UserContext = createContext<UserContextType>({
  user: initialUser,
  setUser: (user: User) => {},
  unsetUser: () => {},
})

export function AdminAuthProvider({ children }: Props) {
  const emptyUser = {
    _id: '',
    name: '',
    email: '',
    userProfileLogo: '',
    sportId: '',
    sportName: '',
  }
  const [currentUser, setCurrentUser] = useState<User>(initialUser || emptyUser)
  const value = {
    user: currentUser,
    setUser,
    unsetUser,
  }

  function setUser(user: User) {
    if (!user.sportId) {
      user.sportId = 'football'
    }
    localStorage.setItem('user', JSON.stringify(user))
    setCurrentUser(user)
  }

  function unsetUser() {
    localStorage.removeItem('user')
    setCurrentUser({ ...emptyUser })
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
