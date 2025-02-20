import styled from 'styled-components'
import { antennaBoldFont } from 'styles'

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: calc(100vw - 72px);
  float: right;
`

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 372px;
  padding: 0px;

  border-right: 1px solid #dadcdb;
`

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0;
`

export const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  padding: 16px 16px;
`

export const ListTitle = styled.div`
  ${antennaBoldFont}
  font-size: 2rem;
  text-transform: uppercase;
`

export const DialogFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    margin-left: 16px;
  }
`

export const ErrorMsg = styled.div`
  color: red;
  margin-top: -6px;
`
