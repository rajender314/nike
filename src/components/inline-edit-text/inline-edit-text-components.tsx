import styled from 'styled-components'
import {
  whiteColor,
  medium,
  inputBorderColor,
  inputBackgroundHoverColor,
  primaryColor,
} from 'styles'

export const Container = styled.div`
  position: relative;
  margin-bottom: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const Input = styled.textarea`
  width: calc(100%);
  min-height: 80px;
  max-width: 535px;
  padding: 4px 8px;
  background-color: inherit;
  border: 2px solid ${inputBorderColor};
  border-radius: 4px;
  color: #000000;
  font-size: 1rem;
  box-shadow: none;
  outline: none;
  -webkit-appearance: none;
  resize: none;
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
