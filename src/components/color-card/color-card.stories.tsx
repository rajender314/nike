import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'
import ColorCard from './color-card'

const Container = styled.div`
  width: 300px;
  padding: 20px;
`

storiesOf('Color Card', module).add('default', () => {
  const [teamColor, setTeamColor] = useState({
    name: '',
    code: '#000000',
    publicName: '',
  })
  function deleteColor() {}
  return (
    <Container>
      <ColorCard
        {...teamColor}
        onDelete={() => deleteColor()}
        onChange={setTeamColor}
      />
    </Container>
  )
})
