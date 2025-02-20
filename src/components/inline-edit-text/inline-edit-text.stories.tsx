import React, { useState } from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import InlineEditText from './inline-edit-text'

const Container = styled.div`
  position: relative;
  width: 400px;
  max-width: 100%;
  padding: 20px;
`

storiesOf('Inline Edit Text', module).add('default', () => {
  return (
    <Container>
      <InlineEditText label="Notes" onChange={action('changed')} />
    </Container>
  )
})
