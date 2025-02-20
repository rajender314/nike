import styled from 'styled-components'

export const ArtworkContainer = styled.div`
  position: relative;
  padding: 16px;
  background-color: #e9edf0;
  border-radius: 8px;
  min-height: 200px;
`

export const ArtworkSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 150px 100px;
  grid-gap: 16px;
`

export const Artwork = styled.div``

export const ArtworkUploadContainer = styled.div`
  height: calc(100% - 16px);
  background-color: #fff;
  border-radius: 4px;
  > div {
    background-color: inherit;
    width: 100%;
    height: 100%;
    flex: 1 0 84px;
  }
`

export const ArtworkLabel = styled.div`
  color: #6c7b88;
  margin-bottom: 6px;
  font-size: 0.8rem;
  font-weight: 500;
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
