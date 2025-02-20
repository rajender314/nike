import styled from 'styled-components'
import {
  whiteColor,
  inputBackgroundColor,
  inputBorderColor,
  medium,
  primaryColor,
  inputBackgroundHoverColor,
} from 'styles'

export const InputContainer = styled.div`
  position: relative;
  margin-bottom: 16px;
  svg {
    position: absolute;
    right: 15px;
    top: 45px;
    color: #979cab;
    width: 1.25em !important;
  }
`

export const InputComponent = styled.input`
  width: 100%;
  height: 42px;
  padding: 8px;
  background-color: ${inputBackgroundColor};
  border: 2px solid ${inputBorderColor};
  border-radius: 4px;
  color: #2d3448;
  box-shadow: none;
  outline: none;
  -webkit-appearance: none;
  transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
  &:hover {
    background-color: ${inputBackgroundHoverColor};
  }
  &:active,
  &:focus {
    background-color: ${whiteColor};
    border-color: ${primaryColor};
  }
`

export const Label = styled.label`
  color: #6c7b88;
  font-size: 0.8rem;
  ${medium}
  line-height: 1.8;
`
