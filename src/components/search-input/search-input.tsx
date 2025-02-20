import * as React from 'react'
import { InputContainer, InputComponent } from './search-input-components'
import { Icon } from 'components'
type Props = {
  placeholder?: string
  value?: string
  onChange?: (e: any) => void
}

export default function SearchInput({ placeholder, value, onChange }: Props) {
  return (
    <InputContainer>
      <Icon name="search" />
      <InputComponent
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </InputContainer>
  )
}
