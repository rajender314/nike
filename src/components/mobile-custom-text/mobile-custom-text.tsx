import React from 'react'
import { Portal, Input } from 'components'

import { Container, HelpText } from './mobile-custom-text-components'

type Props = {
  value: string
  onChange: (e: any) => void
  onClose: () => void
}

export default function MobileCustomText({ value, onChange, onClose }: Props) {
  function onKeyUp(e: any) {
    if (e.key === 'Enter') {
      onClose()
    }
  }

  return (
    <Portal>
      <Container>
        <Input
          type="text"
          placeholder="Enter Custom Text"
          value={value}
          maxLength={22}
          onChange={onChange}
          onKeyUp={onKeyUp}
          autoFocus
        />
        <HelpText>Enter custom text less than 22 characters</HelpText>
      </Container>
    </Portal>
  )
}
