import React from 'react'
import { Container, Input } from './color-input-components'

type Props = {
  value: string
  onChange: (e: any) => void
  onBlur: (e: any) => void
}

export default function ColorInput({
  value = '#000000',
  onChange,
  onBlur,
}: Props) {
  return (
    <Container style={{ backgroundColor: value }}>
      <Input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={(e) => onBlur(e.target.value)}
      />
    </Container>
  )
}
