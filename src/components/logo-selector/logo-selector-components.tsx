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
  border-radius: 4px;
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
  width: 80px;
  height: 80px;
  position: relative;
  padding: 8px;
  text-align: center;
`

export const ImageBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 64px;
  height: 64px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
`

export const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  svg {
    color: #fff;
  }
`

export const ToolTipBody = styled.div`
  width: 320px;
  min-height: 120px;
  ${ItemList} {
    margin: 0 0 16px 0;
  }
  ${ListItem} {
    width: 76px;
    height: 76px;
  }
  ${ImageBox} {
    width: 60px;
    height: 60px;
  }
`

export const EmptyMessage = styled(ToolTipBody)`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ImageOptionsContainer = styled.div`
  position: absolute;
  left: 50%;
  top: -174px;
  width: 260px;
  height: 168px;
  padding: 8px;
  margin-left: -130px;
  transform-origin: 50% 100%;
  animation: 0.3s ${AnimateTooltip} ease;
  background: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  text-align: left;
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
      left: 84%;
    }
  }
  &.left {
    left: 0;
    margin-left: 0;
    transform: translateX(0);
    transform-origin: 10% 100%;
    &::before,
    &::after {
      left: 15%;
    }
  }
`

export const ImageOptionsList = styled.div``

export const ImageOptionsListItem = styled.div`
  display: flex;
  &:first-child {
    border-bottom: 1px solid #ccc;
  }
  &:nth-child(2) {
    justify-content: center;
    border-bottom: 1px dashed #ddd;
  }
`

export const OptionsListHeader = styled.div`
  flex: 0 0 50%;
  padding: 8px;
  font-weight: 500;
`

export const ImageOption = styled.div`
  flex: 0 0 50%;
  padding: 8px;
  > div {
    margin-bottom: 0;
  }
`
