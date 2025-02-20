import styled from 'styled-components'
import {
  whiteColor,
  medium,
  inputBackgroundHoverColor,
  primaryColor,
} from 'styles'

export const Container = styled.div`
  position: relative;
  margin-bottom: 14px;
  ${({ size }: { size?: 'medium' | 'large' }) => {
    if (size === 'medium') {
      return `
        label {
          font-size: 0.8rem;
        }
        input {
          height: 32px;
          font-size: 1rem;
        }
      `
    } else if (size === 'large') {
      return `
        label {
          font-size: 1rem;
          font-weight: 500;
        }
        input {
          font-size: 1.75rem;
          &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: #b3b3b3;
}
&::-moz-placeholder { /* Firefox 19+ */
  color: #b3b3b3;
}
&:-ms-input-placeholder { /* IE 10+ */
  color: #b3b3b3;
}
&:-moz-placeholder { /* Firefox 18- */
  color: #b3b3b3;
}
        }
      `
    }
  }}
`

export const Input = styled.input`
  width: calc(100% + 20px);
  padding: 1px 8px;
  margin-left: -10px;
  background-color: inherit;
  border: 2px solid transparent;
  border-radius: 4px;
  color: #000000;
  box-shadow: none;
  outline: none;
  font-weight: 500;
  -webkit-appearance: none;
  transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
  &::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: #b3b3b3;
  }
  &::-moz-placeholder {
    /* Firefox 19+ */
    color: #b3b3b3;
  }
  &:-ms-input-placeholder {
    /* IE 10+ */
    color: #b3b3b3;
  }
  &:-moz-placeholder {
    /* Firefox 18- */
    color: #b3b3b3;
  }
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
  ${medium}
  line-height: 1.8;
`
