import styled from 'styled-components'
import {
  whiteColor,
  primaryColor,
  secondaryColor,
  screenSize,
  inputBorderColor,
  inputBackgroundColor,
  inputBackgroundHoverColor,
} from 'styles'

type checkboxProps = {
  size?: 'default' | 'small'
}

export const Container = styled.div`
  position: relative;
  margin-bottom: 20px;
`

export const Label = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
`

export const CheckboxContainer = styled.span`
  display: inline-block;
  position: relative;
  margin-right: 6px;
  ${({ size }: checkboxProps) => {
    if (size === 'small') {
      return `
                width: 16px;
                height: 16px;
            `
    } else {
      return `
                width: 20px;
                height: 20px;
            `
    }
  }}
`

export const HiddenInput = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  &:checked + span {
    ${({ variant }: { variant: 'primary' | 'secondary' }) => {
      if (variant === 'secondary') {
        return `
        background-color: ${secondaryColor};
        border-color: ${secondaryColor};
        `
      } else {
        return `
        background-color: ${primaryColor};
        border-color: ${primaryColor};
        `
      }
    }}

    &:before {
      opacity: 1;
    }
  }
`

export const CheckboxComponent = styled.span`
  display: inline-block;
  width: 100%;
  height: 100%;
  background-color: ${whiteColor};
  border: 2px solid ${inputBorderColor};
  border-radius: 3px;
  margin-right: 6px;
  transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
  &:before {
    position: absolute;
    opacity: 0;
    content: ' ';
    border-left: 2px solid ${whiteColor};
    border-bottom: 2px solid ${whiteColor};
    transform: rotate(-45deg);
    transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
    ${({ size }: checkboxProps) => {
      if (size === 'small') {
        return `
                    width: 6px;
                    height: 3px;
                    top: 4px;
                    left: 4px;
                `
      } else {
        return `
                    width: 10px;
                    height: 5px;
                    top: 5px;
                    left: 4px;
                `
      }
    }}
  }
  @media (${screenSize.tablet}) {
    background-color: ${inputBackgroundColor};
    border-color: ${inputBorderColor};
    &:hover {
      background-color: ${inputBackgroundHoverColor};
    }
  }
`

export const Text = styled.span`
  ${({ size }: checkboxProps) => {
    if (size === 'small') {
      return `font-size: 0.8rem;`
    }
  }}
`
