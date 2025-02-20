import React from 'react'
import { createGlobalStyle } from 'styled-components'

import './fonts.css'
import AntennaExtraCondBold from 'fonts/AntennaExtraCond-Bold.woff'
import WhitneyBoldPro from 'fonts/Whitney-Bold-Pro.woff'
import NikeFieldTypeFootball from 'fonts/NikeFieldTypeFootball.otf'
import BrushScript from 'fonts/BrushScript.ttf'
import Combat from 'fonts/Combat-BoldStencilOblique.ttf'

const Fonts = createGlobalStyle`
    @font-face {
        font-family: NikeFieldTypeFootball;
        src: url(${NikeFieldTypeFootball}) format('opentype');
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: BrushScript;
        src: url(${BrushScript}) format('truetype');
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: AntennaExtraCondBold;
        src: url(${AntennaExtraCondBold}) format('woff');
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: WhitneyBoldPro;
        src: url(${WhitneyBoldPro}) format('woff');
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
      font-family: Combat;
      src: url(${Combat}) format('truetype');
      font-weight: normal;
      font-style: normal;
  }
`

export default function GlobalFonts() {
  return (
    <>
      <Fonts />
      <div
        style={{
          position: 'absolute',
          height: '0',
          overflow: 'hidden',
          textIndent: '-1000px',
        }}>
        <div style={{ fontFamily: 'NikeFieldTypeFootball' }}>
          Nike Field Type Football
        </div>
        <div style={{ fontFamily: 'BrushScript' }}>Brush Script</div>
        <div style={{ fontFamily: 'AntennaExtraCondBold' }}>
          Antenna Extra Cond
        </div>
        <div style={{ fontFamily: 'WhitneyBoldPro' }}>Whitney Bold Pro</div>
        <div style={{ fontFamily: 'Combat' }}>Combat</div>
      </div>
    </>
  )
}
