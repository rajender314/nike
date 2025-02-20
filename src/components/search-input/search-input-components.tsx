import styled from 'styled-components'
import {
  inputBackgroundColor,
  inputBorderColor,
  inputBackgroundHoverColor,
} from 'styles'

export const InputContainer = styled.div`
  position: relative;
  margin-bottom: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${inputBackgroundColor};
  border: 2px solid ${inputBorderColor};
  height: 42px;
  padding: 0 8px;
  border-radius: 4px;
  -webkit-appearance: none;
  transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
  &:hover {
    background-color: ${inputBackgroundHoverColor};
  }
`
export const InputComponent = styled.input`
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: 0px solid transparent;
  border-radius: 4px;
  color: #2d3448;
  font-size: 16px;
  box-shadow: none;
  outline: none;
`
