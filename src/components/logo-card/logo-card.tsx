import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { ImageUploader, InlineEdit } from 'components'
import {
  Container,
  InfoContainer,
  IconContainer,
  ImageName,
} from './logo-card-components'

type Props = {
  location?: 'team' | 'player'
  label?: string
  url: string
  name: string
  allowAi?: Boolean
  aiName?: String
  updateLogo: (e: any, name?: String) => void
  updateName: (e: any) => void
  onDelete: (e: any) => void
}

export default function LogoCard({
  location = 'team',
  label = 'Logo Name',
  url,
  name,
  allowAi,
  aiName,
  updateLogo,
  updateName,
  onDelete,
}: Props) {
  const [value, setValue] = useState(name)

  return (
    <Container>
      <ImageUploader
        url={url}
        location={location}
        onUpload={updateLogo}
        allowAi={allowAi}
      />
      <InfoContainer>
        <InlineEdit
          value={value}
          onChange={(e: any) => setValue(e.target.value)}
          onBlur={(e: any) => updateName(value)}
          label={label}
          placeholder="Enter Logo Name"
        />
        {aiName && <ImageName className="image-name">{aiName}</ImageName>}
      </InfoContainer>
      <IconContainer onClick={onDelete}>
        <FontAwesomeIcon icon={faTrash} />
      </IconContainer>
    </Container>
  )
}
