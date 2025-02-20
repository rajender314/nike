import React, { forwardRef, InputHTMLAttributes } from 'react'
import { InputContainer, Label, InputComponent } from './input-components'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Input = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const inputProps = { type: 'text', maxLength: 256, ...props }
  const { label, className, ...rest } = inputProps

  return (
    <InputContainer className={className}>
      {label && <Label>{label}</Label>}
      <InputComponent ref={ref} {...rest} />
    </InputContainer>
  )
})

export default Input
