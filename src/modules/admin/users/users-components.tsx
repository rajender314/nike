import styled from 'styled-components'
import { antennaBoldFont } from 'styles'

export const Container = styled.div`
  display: flex;
  width: calc(100vw - 72px);
  height: 100vh;
  float: right;
`

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 372px;
  border-right: 1px solid #dadcdb;
`

export const DetailContainer = styled.div`
  flex: 1;
  padding: 0 0px;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-flex-wrap: nowrap;
  -ms-flex-wrap: nowrap;
  -webkit-flex-wrap: nowrap;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-box-align: stretch;
  -webkit-align-items: stretch;
  -ms-flex-align: stretch;
  -webkit-align-items: stretch;
  -webkit-box-align: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
`
export const UserListContainer = styled.div`
  flex: 1;
  padding: 0 16px;
  overflow: auto;
`

export const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  flex: 0 0 auto;

  padding: 16px 16px;
`

export const ListTitle = styled.div`
  ${antennaBoldFont}
  font-size: 2rem;
  text-transform: uppercase;
`
