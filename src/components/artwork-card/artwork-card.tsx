import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { ImageUploader, InlineEdit } from 'components'
import {
  ArtworkContainer,
  ArtworkSection,
  Artwork,
  ArtworkUploadContainer,
  ArtworkLabel,
  IconContainer,
} from './artwork-card.components'

type Props = {
  name: string
  palmPattern: string
  bohPattern: string
  dieCastLeftPattern: string
  dieCastRightPattern: string
  onUpdate: (e: any) => void
  onDelete: (e: any) => void
}

export default function ArtworkCard({
  name,
  palmPattern,
  bohPattern,
  dieCastLeftPattern,
  dieCastRightPattern,
  onUpdate,
  onDelete,
}: Props) {
  const [value, setValue] = useState(name)

  return (
    <ArtworkContainer>
      <InlineEdit
        label="Artwork Name"
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
        onBlur={(e: any) => onUpdate({ name: value })}
      />
      <ArtworkSection>
        <Artwork>
          <ArtworkLabel>Palm Pattern</ArtworkLabel>
          <ArtworkUploadContainer>
            <ImageUploader
              url={palmPattern}
              location={'palm'}
              onUpload={(url) => onUpdate({ palmPattern: url })}
            />
          </ArtworkUploadContainer>
        </Artwork>
        <Artwork>
          <ArtworkLabel>BOH Wrap</ArtworkLabel>
          <ArtworkUploadContainer>
            <ImageUploader
              url={bohPattern}
              location={'boh'}
              onUpload={(url) => onUpdate({ bohPattern: url })}
            />
          </ArtworkUploadContainer>
        </Artwork>
        <Artwork>
          <ArtworkLabel>Die Cast R</ArtworkLabel>
          <ArtworkUploadContainer>
            <ImageUploader
              url={dieCastRightPattern}
              location={'diecast'}
              onUpload={(url) => onUpdate({ dieCastRightPattern: url })}
            />
          </ArtworkUploadContainer>
        </Artwork>
        <Artwork>
          <ArtworkLabel>Die Cast L</ArtworkLabel>
          <ArtworkUploadContainer>
            <ImageUploader
              url={dieCastLeftPattern}
              location={'diecast'}
              onUpload={(url) => onUpdate({ dieCastLeftPattern: url })}
            />
          </ArtworkUploadContainer>
        </Artwork>
      </ArtworkSection>
      <IconContainer onClick={onDelete}>
        <FontAwesomeIcon icon={faTrash} />
      </IconContainer>
    </ArtworkContainer>
  )
}
