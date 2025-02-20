import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 32px;
  background: rgba(255, 255, 255, 0.9);
  z-index: 10;
  > div {
    width: 100%;
  }
`

export const HelpText = styled.div`
  color: #909090;
`
