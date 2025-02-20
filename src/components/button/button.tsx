import * as React from 'react'
import { ButtonContainer } from './button-components'

type Props = {
  variant?: 'primary' | 'secondary' | 'text' | 'outline'
  size?: 'medium' | 'large'
  type?: 'button' | 'submit'
  width?: string
  background?: string
  rounded?: boolean
  hover?: string
  active?: string
  isDisabled?: boolean
  onClick?: (e: any) => void
  children: any
}

export default function Button({
  variant = 'primary',
  type = 'button',
  size = 'medium',
  width,
  background,
  rounded = false,
  hover,
  active,
  isDisabled = false,
  onClick,
  children,
}: Props) {
  return (
    <ButtonContainer
      variant={variant}
      rounded={rounded}
      size={size}
      width={width}
      type={type}
      background={background}
      hover={hover}
      active={active}
      isDisabled={isDisabled}
      onClick={onClick}>
      {children}
    </ButtonContainer>
  )
}
