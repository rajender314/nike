import React, { RefObject } from 'react'
import {
  Container,
  Label,
  CheckboxContainer,
  CheckboxComponent,
  HiddenInput,
  Text,
} from './checkbox-components'

type Props = {
  variant?: 'primary' | 'secondary'
  size?: 'default' | 'small'
  label?: string
  value?: string
  checked?: boolean
  onChange: (e: any) => void
  ref?: RefObject<HTMLInputElement>
  name?: string
}

export default function Checkbox({
  variant = 'primary',
  size = 'default',
  label,
  value,
  checked,
  onChange,
  ref,
  name,
}: Props) {
  return (
    <Container>
      <Label>
        <CheckboxContainer size={size}>
          <HiddenInput
            variant={variant}
            name={name}
            ref={ref}
            type="checkbox"
            value={value}
            checked={checked}
            onChange={onChange}
          />
          <CheckboxComponent size={size} />
        </CheckboxContainer>
        <Text size={size}>{label}</Text>
      </Label>
    </Container>
  )
}
