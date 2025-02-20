import styled from 'styled-components'

type InputProps = {
  color?: string
}

export const Container = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  flex: 0 0 64px;
  background-color: rgba(179, 179, 179, 0.5);
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
`

export const Input = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
`
