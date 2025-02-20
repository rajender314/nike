import styled from 'styled-components'
import { primaryColor } from 'styles'

export const Container = styled.div`
  position: relative;
  ${({ height }: { height?: string }) => {
    if (height) {
      return `height: ${height}`
    } else {
      return `height: 5px`
    }
  }}
`

export const Progress = styled.div`
  height: 100%;
  background-color: ${primaryColor};
  transition: width 0.2s linear;
  ${({ progress = 0 }: { progress: number }) => {
    return `width: ${progress}%`
  }}
`
