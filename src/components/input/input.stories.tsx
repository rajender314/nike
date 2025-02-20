import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Input from './input'

const Container = styled.div`
  position: relative;
  width: 400px;
  max-width: 100%;
  padding: 20px;
`

storiesOf('Input', module).add('default', () => (
  <Container>
    <Input
      label="First Name"
      placeholder="Enter First Name"
      onChange={action('changed')}
    />
  </Container>
))
