import React from 'react'
import SelectComponent from 'react-select'
import { SelectContainer, Label } from './select-components'

type Props = {
  label?: string
  options: any[]
  value?: any
  placeholder?: string
  name?: string
  isDisabled?: boolean
  onChange?: (e: any) => void
  register?: any
}

export default function Select(props: Props) {
  return (
    <SelectContainer>
      {props.label && (
        <Label isDisabled={props.isDisabled}>{props.label}</Label>
      )}
      <SelectComponent
        className="nike-select"
        classNamePrefix="nike"
        {...props}
      />
    </SelectContainer>
  )
}
