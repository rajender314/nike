import React from 'react'
import { Container, Label, Input } from './inline-edit-components'

type Props = {
  size?: 'medium' | 'large'
  type?: string
  label?: string
  value?: string
  placeholder?: string
  readonly?: boolean
  onChange?: (e: any) => void
  onBlur?: (e: any) => void
}

export default function InlineEdit({
  size = 'medium',
  type = 'text',
  placeholder,
  label,
  value,
  readonly,
  onChange,
  onBlur,
}: Props) {
  return (
    <Container size={size}>
      {label && <Label>{label}</Label>}
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={readonly ? { pointerEvents: 'none' } : {}}
      />
    </Container>
  )
}
