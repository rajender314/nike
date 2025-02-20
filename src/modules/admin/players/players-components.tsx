import styled from 'styled-components'
import { antennaBoldFont } from 'styles'
import { primaryColor } from 'styles'

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
export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
export const InputWraper = styled.div`
  width: 48%;
`
export const IconContainer = styled.div`
  width: 32px;
  height: 32px;
  background: #d5dce2;
  margin-right: 6px;
  margin-left: 6px;
  border-radius: 4px;
  svg {
    width: 32px;
    height: 32px;
    padding: 4px;
    g {
      g {
        fill: ${primaryColor};
      }
    }
  }
`
export const DetailContainer = styled.div`
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  padding: 0 0px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
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

export const PlayerListContainer = styled.div`
  flex: 1;
  padding: 0 16px;
  overflow: auto;
`

export const DialogFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    margin-left: 16px;
  }
`

export const Error = styled.div`
  position: absolute;
  margin-top: -14px;
  color: #da0909;
`
