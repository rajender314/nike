import styled from 'styled-components'
import {
  screenSize,
  boldFont,
  primaryColor,
  primaryHoverColor,
  primaryActiveColor,
  secondaryColor,
  secondaryHoverColor,
  secondaryActiveColor,
  whiteColor,
  whiteHoverColor,
  whiteActiveColor,
} from 'styles'

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'text' | 'outline'
  size?: 'medium' | 'large'
  width?: string
  background?: string
  rounded?: boolean
  hover?: string
  active?: string
  isDisabled?: boolean
}

export const ButtonContainer = styled.button`
  min-width: 80px;
  padding: 8px 24px;
  border: 0 none;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  ${boldFont}
  @media (${screenSize.tablet}) {
    min-width: 120px;
    padding: 8px 32px;
  }
  ${({ width }: ButtonProps) => {
    if (width) {
      return `width: ${width};`
    }
  }}
  ${({ size }: ButtonProps) => {
    if (size === 'large') {
      return `height: 48px;`
    } else {
      return `height: 40px;`
    }
  }}
  ${({ variant }: ButtonProps) => {
    if (variant === 'primary') {
      return `
            background-color: ${primaryColor};
            color: ${whiteColor};
            &:hover {
                background-color: ${primaryHoverColor};
            }
            &:active {
                background-color: ${primaryActiveColor};
            }
        `
    } else if (variant === 'secondary') {
      return `
              background-color: ${secondaryColor};
              color: ${whiteColor};
              &:hover {
                  background-color: ${secondaryHoverColor};
              }
              &:active {
                  background-color: ${secondaryActiveColor};
              }
          `
    } else if (variant === 'text') {
      return `
            background-color: ${whiteColor};
            color: rgba(36, 41, 50, 0.5);
            &:hover {
                background-color: ${whiteHoverColor};
            }
            &:active {
                background-color: ${whiteActiveColor};
            }
        `
    } else if (variant === 'outline') {
      return `
            background-color: ${whiteColor};
            border: 2px solid #3C3C3C;
            &:hover {
                background-color: ${whiteHoverColor};
            }
            &:active {
                background-color: ${whiteActiveColor};
            }
        `
    }
  }}
  ${({ background }: ButtonProps) => {
    if (background) {
      return `background-color: ${background};`
    }
  }}
  ${({ rounded, size }: ButtonProps) => {
    if (rounded) {
      if (size === 'large') {
        return `border-radius: 24px;`
      } else {
        return `border-radius: 20px;`
      }
    }
  }}
  ${({ hover }: ButtonProps) => {
    if (hover) {
      return `&:hover{
          background-color: ${hover};
        }`
    }
  }}
  ${({ active }: ButtonProps) => {
    if (active) {
      return `&:active{
          background-color: ${active};
        }`
    }
  }}
  ${({ isDisabled }: ButtonProps) => {
    if (isDisabled) {
      return `
        background-color:#ccc;
        cursor: not-allowed;
        pointer-events:none;
      `
    }
  }}
`
