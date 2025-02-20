import React from 'react'
import { Container, Label, Input } from './inline-edit-text-components'

type Props = {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (e: any) => void
  onBlur?: (e: any) => void
  disabled?: boolean
}

export default function InlineEditText({
  label,
  value,
  placeholder,
  onChange,
  onBlur,
  disabled,
}: Props) {
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <Input
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      />
    </Container>
  )
}
