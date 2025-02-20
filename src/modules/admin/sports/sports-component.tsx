import styled from 'styled-components'
import { antennaBoldFont, primaryColor, whiteColor } from 'styles'

export const Container = styled.div`
  max-width: 1440px;
  height: 100vh;
  margin: 0 80px;
`

export const ListHeader = styled.div`
  padding: 24px 0;
`

export const ListTitle = styled.div`
  ${antennaBoldFont}
  font-size: 2rem;
  text-transform: uppercase;
`

export const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -16px;
`

export const ListItem = styled.div`
  display: flex;
  width: 33.3333%;
  max-width: 400px;
  padding: 16px;
`

export const SelectionCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 160px;
  border-radius: 8px;
  background: #eff7ff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: background 0.25s ease;
  &:hover {
    background: #eaf2fa;
  }
  ${({ active }: { active: boolean }) => {
    if (active) {
      return `
        background: ${primaryColor};
        color: ${whiteColor};
        svg g,
        svg path {
          fill: ${whiteColor};
        }
        &:hover {
          background: ${primaryColor};
        }
      `
    }
  }}
`
export const SportIcon = styled.div`
  margin-right: 16px;
`
export const SportLabel = styled.label`
  font-weight: 600;
  font-size: 21px;
  cursor: inherit;
`
