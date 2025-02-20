import styled from 'styled-components'

type ImageProps = {
  image?: string
}

export const UserListContainer = styled.div`
  position: relative;
  height: 100%;
`

export const UserListItem = styled.div`
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
export const PreviewImg = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 6px;
  background-size: cover;
  background-position: center;
  ${({ image }: ImageProps) => {
    if (image) {
      return `background-image:url(${image});`
    }
  }}
`
export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 64px;
  position: relative;
  width: 64px;
  height: 64px;
  background-color: #e8eaed;
  border: 1px solid #e8eaed;
  border-radius: 6px;
  color: black;
  font-size: 1.5rem;
`

export const UserName = styled.div`
  font-size: 1.125rem;
  margin-left: 16px;
  word-break: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  overflow: hidden;
`

export const ListItem = styled.li`
  background-color: #fafafa;
  border: 1px solid #99b4c0;
  padding: 8px;
  margin: 4px;
`
