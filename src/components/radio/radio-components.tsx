import styled from 'styled-components'
import { primaryColor } from 'styles'

export const InputContainer = styled.div`
  position: relative;
  margin-bottom: 16px;
`
export const RadioWrapper = styled.div`
  display: inline-block;
`
export const Mark = styled.span`
  display: inline-block;
  position: relative;
  border: 2px solid #e3e5e9;
  width: 16px;
  height: 16px;
  left: 0;
  border-radius: 50%;
  margin-right: 5px;
  vertical-align: middle;
  &::after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-radius: 50%;
    background-color: ${primaryColor};
    opacity: 0;
    left: 50%;
    top: 50%;
    position: absolute;
    transition: all 110ms;
  }
`
export const InputComponent = styled.input`
  position: absolute;
  visibility: hidden;
  display: none;
  &:checked + ${Mark} {
    &::after {
      width: 10px;
      height: 10px;
      opacity: 1;
      left: 12%;
      top: 12%;
    }
  }
`

export const Label = styled.label`
  display: flex;
  cursor: pointer;
  padding: 5px 10px 5px 0;
  position: relative;
  align-items: center;
  ${(props: any) =>
    props.disabled &&
    `
        cursor: not-allowed;
        opacity: 0.4;
    `}
`
