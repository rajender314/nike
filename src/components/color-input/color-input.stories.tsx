import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import styled from 'styled-components'
import ColorInput from './color-input'

const Container = styled.div`
  padding: 20px;
`

storiesOf('Color Input', module).add('default', () => {
  const [color, setColor] = useState('#000000')

  function onChange(e: any) {
    setColor(e.target.value)
    action('changed')(e.target.value)
  }

  return (
    <Container>
      <ColorInput value={color} onChange={onChange} onBlur={onChange} />
    </Container>
  )
})
