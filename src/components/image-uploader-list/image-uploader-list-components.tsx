import { secondaryColor } from 'styles'
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

export const Container = styled.div``

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  padding: 0 8px;
  margin: 0 -8px 16px -8px;
`

export const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 25%;
  padding: 8px;
  text-align: center;
`

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 64px;
  height: 64px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    .cross-hover {
      display: block;
    }
  }
`

export const UploadContainer = styled(ImageContainer)`
  background-color: #e0e9f9;
  transition: all 0.15s ease;
  &:hover {
    background-color: #deebff;
  }
  ${({ active }: { active: boolean }) => {
    if (active) {
      return `
            background-color: #DEEBFF;
          `
    }
  }}
`

export const PreviewImg = styled.img`
  max-width: 100%;
  max-height: 100%;
`

export const SizeError = styled.div`
  color: red;
  position: absolute;
  top: 0;
`

export const ProgressContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
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
export const ImageOptionsContainer = styled.div`
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

export const ImageOptionsList = styled.div`
  display: flex;
  padding: 16px 8px;
`

export const ImageOption = styled.div`
  padding: 8px;
  > div {
    margin-bottom: 0;
  }
`
export const DeleteBox = styled.div`
  padding-top: 0px;
  padding-right: 0px;
  position: absolute;
  right: -8px;
  top: -8px;
  display: none;
  z-index: 999;
`
export const MobileCreate = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${secondaryColor};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`
