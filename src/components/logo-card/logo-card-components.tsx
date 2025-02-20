import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  position: relative;
  padding-bottom: 16px;
  border-bottom: solid 2px #d5dce2;
`

export const InfoContainer = styled.div`
  flex: 1;
  margin: 0 16px;
`

export const ImageName = styled.div`
  display: flex;
  &.image-name {
    color: #6b7c88;
    overflow: hidden;
    width: 160px;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
  }
`

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  position: absolute;
  right: 0;
  top: -14px;
  width: 48px;
  height: 48px;
  cursor: pointer;
  svg {
    color: #98a4ae;
  }
`
