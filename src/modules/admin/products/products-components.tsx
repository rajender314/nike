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
  flex: 1;
  padding: 0 0px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-flex-wrap: nowrap;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-box-align: stretch;
  -webkit-align-items: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
`
export const selectContainer = styled.select`
  flex: 1;
  width: 100%;
  padding: 32px;
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

export const ProductListContainer = styled.div`
  flex: 1;
  margin-top: 16px;
  overflow: auto;
`
