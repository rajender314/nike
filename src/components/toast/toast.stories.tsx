import React, { useState } from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { Button, Toast } from 'components'

export const WhiteContainer = styled.div`
  position: relative;
  height: 100%;
  padding: 15px;
`

storiesOf('Toast', module).add('default', () => {
  const [showToast, setShowToast] = useState(false)

  return (
    <WhiteContainer>
      <Button onClick={() => setShowToast(true)}>Show Toast</Button>
      <Toast
        message="hello world"
        showToast={showToast}
        onClose={() => setShowToast(false)}
      />
    </WhiteContainer>
  )
})
