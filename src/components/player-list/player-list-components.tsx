import styled from 'styled-components'

export const PlayerListContainer = styled.div`
  position: relative;
  height: 100%;
`

export const PlayerListItem = styled.div`
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
export const PreviewImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 6px;
`
export const Logo = styled.div`
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  border: 1px solid #e8eaed;
    border-radius: 6px;
    -webkit-flex: 0 0 64px;
    -ms-flex: 0 0 64px;
    flex: 0 0 64px;
    background-color: #e8eaed;
  position: relative;
  transition: all 0.15s ease-in-out;
`

export const PlayerName = styled.div`
margin-left: 16px;
font-size: 1.125rem;
word-break: break-word;
text-overflow: ellipsis;
white-space: nowrap;
max-width: 100%;
overflow: hidden;`

export const Nodata = styled.div`
  display: flex;
  height: calc(100% - 50px);
  align-items: center;
  justify-content: center;
`

export const ListItem = styled.li`
  background-color: #fafafa;
  border: 1px solid #99b4c0;
  padding: 8px;
  margin: 4px;
`
