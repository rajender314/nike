import styled from 'styled-components'
import {
  whiteColor,
  inputBackgroundColor,
  inputBorderColor,
  primaryColor,
  inputBackgroundHoverColor,
  medium,
} from 'styles'

export const SelectContainer = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 16px;

  .nike-select {
    &.nike--is-disabled {
      pointer-events: auto;
      cursor: not-allowed;
    }
    .nike__control {
      height: 42px;
      border: 2px solid ${inputBorderColor};
      background-color: ${inputBackgroundColor};
      box-shadow: none;
      transition: background-color 0.2s ease-in-out,
        border-color 0.2s ease-in-out;
      &:hover {
        background-color: ${inputBackgroundHoverColor};
      }
      &:active {
        background-color: ${whiteColor};
      }
      &.nike__control--is-focused {
        border-color: ${primaryColor};
        background-color: ${whiteColor};
      }
      &.nike__control--is-disabled {
        background-color: ${inputBackgroundHoverColor};
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
    .nike__indicator-separator {
      display: none;
    }
    .nike__clear-indicator {
      display: none;
    }
  }
`
export const Label = styled.label`
  color: #6c7b88;
  font-size: 0.8rem;
  ${medium}
  line-height: 1.8;
  ${({ isDisabled }: { isDisabled?: boolean }) => {
    if (isDisabled) {
      return `opacity: 0.6;`
    }
  }}
`
