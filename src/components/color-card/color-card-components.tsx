import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  padding: 16px;
  background-color: #e9edf0;
  border-radius: 8px;
`

export const ColorSection = styled.div`
  display: flex;
`

export const NameSection = styled.div`
  display: flex;
  margin-left: 80px;
  > div:first-child {
    margin-right: 20px;
  }
  > div {
    margin-bottom: 0;
  }
`

export const ColorCode = styled.div`
  margin-left: 16px;
`

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  width: 48px;
  height: 48px;
  cursor: pointer;
  svg {
    color: #98a4ae;
  }
`
