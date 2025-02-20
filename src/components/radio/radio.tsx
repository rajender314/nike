import * as React from 'react'
import { RadioWrapper, Label, Mark, InputComponent } from './radio-components'

type Props = {
  label?: string
  checked?: boolean
  name?: string
  value?: string
  children: any
  onChange?: (e: any) => void
  register?: any
}

export default function Radio({
  name,
  checked,
  children,
  value,
  onChange,
  register,
}: Props) {
  return (
    <RadioWrapper>
      <Label>
        <InputComponent
          name={name}
          type="radio"
          checked={!!checked}
          onChange={onChange}
          value={value}
          ref={register}
        />
        <Mark />
        {children}
      </Label>
    </RadioWrapper>
  )
}
