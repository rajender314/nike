import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { isValidHexColor } from 'helpers'
import { InlineEdit, ColorInput } from 'components'
import {
  Container,
  ColorSection,
  NameSection,
  ColorCode,
  IconContainer,
} from './color-card-components'

type Props = {
  name: string
  code: string
  publicName: string
  onChange: (e: any) => void
  onDelete: (e: any) => void
}

export default function ColorCard({
  name = '',
  publicName = '',
  code = '#000000',
  onChange,
  onDelete,
}: Props) {
  const [colorName, setColorName] = useState(name)
  const [colorCode, setColorCode] = useState(code)
  const [displayName, setDisplayName] = useState(publicName)

  function checkColorCode(e: any) {
    if (isValidHexColor(e.target.value)) {
      setColorCode(e.target.value)
    }
  }

  function updateColor() {
    onChange({ name: colorName, code: colorCode, publicName: displayName })
  }

  return (
    <Container>
      <ColorSection>
        <ColorInput
          value={colorCode}
          onChange={setColorCode}
          onBlur={updateColor}
        />
        <ColorCode>
          <InlineEdit
            label="HEX Code"
            placeholder="#000000"
            value={colorCode}
            onChange={checkColorCode}
            onBlur={updateColor}
          />
        </ColorCode>
      </ColorSection>

      <NameSection>
        <InlineEdit
          label="Nike Code"
          placeholder="Enter Nike Code"
          value={colorName}
          onChange={(e) => setColorName(e.target.value)}
          onBlur={updateColor}
        />

        <InlineEdit
          label="Public Name"
          placeholder="Enter Public Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          onBlur={updateColor}
        />
      </NameSection>

      <IconContainer onClick={onDelete}>
        <FontAwesomeIcon icon={faTrash} />
      </IconContainer>
    </Container>
  )
}
