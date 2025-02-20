import { mediumFont } from 'styles'
import styled from 'styled-components'

type Props = {
  type: 'text' | 'color' | 'button' | 'pill' | 'logo'
  active?: boolean
  background?: string
}

export const Container = styled.div`
  position: relative;
  width: 100%;
  font-size: 1.05rem;
`

export const ListContainer = styled.div`
  width: 100%;
  overflow-y: visible;
  overflow-x: scroll;
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    display: none;
  }
  text-align: center;
`

export const List = styled.div`
  display: inline-flex;
  ${({ type }: Props) => {
    if (type === 'color') {
      return `
        height: 48px;
        align-items: center;
      `
    } else if (type === 'logo') {
      return `
        height: 72px;
        align-items: center;
      `
    }
  }}
  transition: opacity 0.25s ease;
`

export const ListItem = styled.div`
  min-width: 60px;
  padding: 12px 16px;
  margin: 0 8px;
  ${mediumFont};
  ${({ active }: Props) => {
    return `
      color: ${active ? '#FF3366' : '#404040'};
    `
  }}
  ${({ type, active, background }: Props) => {
    if (type === 'color') {
      return `
        height: 36px;
        width: 36px;
        min-width: 36px;
        border-radius: 50%;
        background-color: ${background};
        border: 1px solid rgba(0, 0, 0, 0.2);
        ${
          active
            ? 'box-shadow: 0 0 6px 2px #fff, 0 0 1px 6px rgba(20, 20, 20, 0.15)'
            : ''
        };  
      `
    } else if (type === 'button') {
      return `
        height: 44px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${active ? '#fff' : '#404040'};
        border-radius: 4px;
        background-color:${active ? '#FF3366' : '#F2F2F2'};
      `
    } else if (type === 'pill') {
      return `
        height: 44px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 30px;
        border: 2px solid ${
          active ? 'rgba(255, 51, 102, 0.5)' : 'rgba(64, 64, 64, 0.5)'
        };
      `
    } else if (type === 'text') {
      return `
        padding: 8px 16px;
        margin: 0;
      `
    } else if (type === 'logo') {
      return `
        position: relative;
        height: 60px;
        width: 60px;
        min-width: 60px;
        margin: 0 16px;
        border-radius: 50%;
        border: 1px solid rgba(0, 0, 0, 0.2);
        ${
          active
            ? 'box-shadow: 0 0 6px 2px #fff, 0 0 1px 6px rgba(20, 20, 20, 0.15)'
            : ''
        }; 
        overflow: hidden;
      `
    }
  }}
`

export const ListCaption = styled.div`
  margin-top: 4px;
  text-align: center;
  color: #606060;
  font-size: 0.9rem;
  ${mediumFont};
`

export const Label = styled.label`
  text-align: center;
  white-space: nowrap;
`
