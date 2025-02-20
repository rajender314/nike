import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'
import { appBackgroundColor, appFontColor, regularFont } from 'styles'
import './styles.css'

const GlobalStyles = createGlobalStyle`
  ${normalize}

  * {
    box-sizing: border-box;
    margin:0;
    padding:0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 14px;
    ${regularFont}
    line-height: 1.5;
    background-color: ${appBackgroundColor};
    color: ${appFontColor};
    overflow-x: hidden;
  }

  .canvas-tooltip {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
    font-size: 0.8rem;
    font-weight: 500;
    padding: 4px 8px;
    border-radius: 4px;
    z-index: 10;
  }

  *::-webkit-scrollbar {
    width: 3px;
  }


  *::-webkit-scrollbar-track {
    background: #fafafa;
    width: 3px;
  }
 

  *::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }
`

export default GlobalStyles
