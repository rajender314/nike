import React, { useState } from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import InlineEdit from './inline-edit'

const Container = styled.div`
  position: relative;
  width: 400px;
  max-width: 100%;
  padding: 20px;
`

storiesOf('Inline Edit', module).add('default', () => {
  return (
    <Container>
      <InlineEdit label="First Name" onChange={action('changed')} />
    </Container>
  )
})
