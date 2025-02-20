import React, { useState, useEffect, useContext } from 'react'
import { UserList, Icon, UserDetail } from 'components'
import { useGetUsers, useUpdateUser } from 'api'
import { User as Tuser } from 'types'
import { UserContext } from 'providers'

import {
  Container,
  ListContainer,
  DetailContainer,
  UserListContainer,
  ListHeader,
  ListTitle,
} from './users-components'
export default function User() {
  const {
    user: { _id: userId },
    setUser,
  } = useContext(UserContext)
  const { loading, data } = useGetUsers()
  const [updateUser] = useUpdateUser()

  const [users, setUsers] = useState<Tuser[]>([])
  const [selectedUser, setSelectedUser] = useState<Tuser>({
    _id: '',
    name: '',
    email: '',
    userProfileLogo: '',
    sportId: 'football',
    sportName: 'NFL PE',
  })

  useEffect(() => {
    if (!loading && data && data.users) {
      setUsers(data.users)
      setSelectedUser(data.users[0])
    }
  }, [loading, data])

  function handleScroll(event: any) {
    var node = event.target
    const bottom = node.scrollHeight - node.scrollTop === node.clientHeight
    if (bottom) {
      console.log('BOTTOM REACHED:', bottom)
    }
  }

  const paneDidMount = (node: any) => {
    if (node) {
      node.addEventListener('scroll', handleScroll)
    }
  }

  function updateSelectedUser(data: any) {
    setSelectedUser(data)
  }

  function updateUserData(params: any) {
    updateUser({ variables: { ...params } })
      .then((res: any) => {
        const {
          data: { createUser },
        } = res
        const { success = false, user = {} } = createUser
        if (success && user && user._id === userId) {
          setUser(user)
        }
      })
      .catch((err: any) => {
        console.log(err)
      })
  }

  if (loading) {
    return <Icon name="nikeLoading" />
  }

  if (!data) {
    return <div>Error loading users...</div>
  }

  return (
    <>
      <Container>
        <ListContainer>
          <ListHeader>
            <ListTitle>Users</ListTitle>
          </ListHeader>
          <UserListContainer ref={paneDidMount}>
            <UserList
              users={users}
              selectedUser={selectedUser}
              onSelect={updateSelectedUser}
            />
          </UserListContainer>
        </ListContainer>
        <DetailContainer>
          {users && selectedUser && selectedUser._id && (
            <UserDetail user={selectedUser} updateUser={updateUserData} />
          )}
        </DetailContainer>
      </Container>
    </>
  )
}
