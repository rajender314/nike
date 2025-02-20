import React from 'react'
import { User } from 'types'
import { getInitialsFromName } from 'helpers'

import {
  UserListContainer,
  UserListItem,
  Logo,
  UserName,
  PreviewImg,
} from './user-list-components'
type Props = {
  users: User[]
  selectedUser: User
  onSelect: (e: User) => void
}
export default function UserList({ users, selectedUser, onSelect }: Props) {
  return (
    <UserListContainer>
      {users.map((user: User, index: number) => {
        return (
          <UserListItem
            key={index}
            active={selectedUser._id === user._id}
            onClick={() => onSelect(user)}>
            <Logo>
              {getInitialsFromName(user.name)}
              <PreviewImg image={user.userProfileLogo} />
            </Logo>

            <UserName>{user.name}</UserName>
          </UserListItem>
        )
      })}
    </UserListContainer>
  )
}
