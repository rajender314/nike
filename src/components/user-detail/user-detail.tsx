import React, { useState, useEffect } from 'react'
import { InlineEdit, ImageUploader } from 'components'
import {
  Container,
  DetailHeader,
  ContentSection,
  PlayerInfo,
  InputBox,
} from './user-detail-components'

type Props = {
  user: any
  updateUser: (e: any) => void
}

export default function UserDetail({ user, updateUser }: Props) {
  const { _id, name, email, userProfileLogo } = user
  const [userName, setUserName] = useState(name)
  const [userImage, setUserImage] = useState(userProfileLogo)
  const [userId, setUserId] = useState(_id)
  const [userEmail, setUserEmail] = useState(email)
  useEffect(() => {
    setUserName(name)
    setUserId(_id)
    setUserEmail(email)
    setUserImage(userProfileLogo)
    // eslint-disable-next-line
  }, [user])

  function uploadProfile(e: any) {
    if (e) {
      const data = { _id: _id, userProfileLogo: e }
      updateUser(data)
    }
  }

  function updateEmail(e: any) {
    const email = e.target.value
    if (email) {
      const data = { _id: _id, email: email }
      setUserEmail(email)
      updateUser(data)
    }
  }

  function updateUserName(e: any) {
    const userName = e.target.value
    if (userName) {
      const data = { _id: _id, name: userName }
      setUserName(userName)
      updateUser(data)
    }
  }

  return (
    <Container>
      <DetailHeader>
        {userId && (
          <ImageUploader
            key={userId}
            url={userImage}
            location="profile"
            onUpload={uploadProfile}
          />
        )}
      </DetailHeader>
      <ContentSection>
        <PlayerInfo>
          <InputBox>
            <InlineEdit
              label="Name"
              value={userName}
              placeholder="Enter User Name"
              onChange={(e) => setUserName(e.target.value)}
              onBlur={updateUserName}
            />
            <InlineEdit
              label="Email"
              value={userEmail || ''}
              placeholder="Enter Email"
              onChange={(e) => setUserEmail(e.target.value)}
              onBlur={updateEmail}
            />
          </InputBox>
        </PlayerInfo>
      </ContentSection>
    </Container>
  )
}
