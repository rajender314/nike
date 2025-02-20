import styled from 'styled-components'

export const TeamListContainer = styled.div`
  position: relative;
  overflow: auto;
  padding: 0 16px;
`

export const TeamListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 2px;
  cursor: pointer;
  &:hover {
    background-color: #f6fafe;
  }
  ${({ active }: { active: boolean }) => {
    if (active) {
      return `
        background-color: #EBF5FF;
        border-radius: 6px;
        color: #006AC6;
        &:hover {
             background-color: #EBF5FF;
      }
      `
    }
  }}
`

export const Logo = styled.div`
  display: felx;
  align-items: center;
  justify-content: center;
  flex: 0 0 64px;
  width: 64px;
  height: 64px;
  padding: 2px;
  border: 1px solid #e8eaed;
  border-radius: 4px;
  flex: 0 0 64px;
  background-color: #e8eaed;
  img {
    max-width: 100%;
    max-height: 100%;
  }
`

export const TeamName = styled.div`
  margin-left: 16px;
  font-size: 1.125rem;
  word-break: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  overflow: hidden;
`
