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
  padding: 24px;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10;
`

export const Dialog = styled.div`
  width: 100%;
  min-height: 180px;
  padding: 16px;
  background-color: #fff;
  border-radius: 12px;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 24px;
`

export const Color = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`

export const Title = styled.div`
  margin-left: 8px;
  font-size: 1.1rem;
  font-weight: 500;
`

export const CloseIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: -6px;
  top: -6px;
  width: 32px;
  height: 32px;
  padding: 8px;
  font-size: 1.2rem;
  color: #8c8c8c;
`

export const OptionsTable = styled.div`
  font-size: 1rem;
`

export const Row = styled.div`
  display: flex;
`

export const Col = styled.div`
  flex: 0 0 50%;
  padding: 12px 8px;
  > div {
    margin-bottom: 0;
  }
`
