import { semibold } from 'styles'
import styled, { keyframes } from 'styled-components'

const AnimateTooltip = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`

export const ToolTipContainer = styled.div`
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.25);
  z-index: 1;
`
export const ToolTipArrow = styled.div`
  position: absolute;
  width: 24px;
  height: 10px;
  top: -10px;
  &::before,
  &::after {
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    content: '';
    margin: auto;
    border-style: solid;
    border-width: 0 12px 10px 12px;
  }
  &::before {
    border-color: transparent transparent rgba(0, 0, 0, 0.15) transparent;
    top: -1px;
  }
  &::after {
    border-color: transparent transparent white transparent;
  }
`

export const ListHeader = styled.div`
  padding: 16px;
  color: #7a8894;
  ${semibold}
`

export const ItemList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  padding: 0 8px;
  margin: 0 -8px 20px -8px;
`

export const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 25%;
  padding: 8px;
  text-align: center;
  .inline-edit {
    margin-top: 4px;
    margin-bottom: 0;
    input {
      height: 24px;
      border-width: 1px;
    }
  }
`

export const ColorBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  cursor: pointer;
`

export const Label = styled.div`
  width: 100%;
  margin-top: 6px;
  color: #7a8894;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const ToolTipBody = styled.div`
  width: 360px;
  min-height: 140px;
  ${ItemList} {
    margin: 0 0 16px 0;
  }
  ${ColorBox} {
    width: 40px;
    height: 40px;
    svg {
      color: #fff;
    }
  }
`

export const EmptyMessage = styled(ToolTipBody)`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ColorOptionsContainer = styled.div`
  width: 230px;
  height: 68px;
  position: absolute;
  left: 50%;
  top: -76px;
  margin-left: -115px;
  transform-origin: 50% 100%;
  animation: 0.3s ${AnimateTooltip} ease;
  background: #fff;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  &::before,
  &::after {
    display: block;
    position: absolute;
    left: 50%;
    transform: translateX(-12px);
    width: 0;
    height: 0;
    content: '';
    margin: auto;
    border-style: solid;
    border-width: 10px 12px 0 12px;
  }
  &::before {
    border-color: rgba(0, 0, 0, 0.15) transparent transparent transparent;
    bottom: -11px;
  }
  &::after {
    border-color: white transparent transparent transparent;
    bottom: -10px;
  }
  &.right {
    left: auto;
    right: 0;
    margin-left: 0;
    transform: translateX(0);
    transform-origin: 90% 100%;
    &::before,
    &::after {
      left: 82%;
    }
  }
  &.left {
    left: 0;
    margin-left: 0;
    transform: translateX(0);
    transform-origin: 10% 100%;
    &::before,
    &::after {
      left: 17%;
    }
  }
`

export const ColorOptionsList = styled.div`
  display: flex;
  padding: 16px 8px;
`

export const ColorOption = styled.div`
  padding: 8px;
  > div {
    margin-bottom: 0;
  }
`

export const ColorInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
`
