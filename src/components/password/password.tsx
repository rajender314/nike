import React, { useState, forwardRef, InputHTMLAttributes } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { InputContainer, Label, InputComponent } from './password-components'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Password = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const { label, ...rest } = props
  const [showpassword, setShowPassword] = useState(false)

  function toggleShowPassword() {
    setShowPassword(!showpassword)
  }

  return (
    <InputContainer>
      {label && <Label>{label}</Label>}
      <InputComponent
        type={showpassword ? 'text' : 'password'}
        ref={ref}
        {...rest}
      />
      <FontAwesomeIcon
        icon={showpassword ? faEyeSlash : faEye}
        onClick={toggleShowPassword}
      />
    </InputContainer>
  )
})

export default Password
