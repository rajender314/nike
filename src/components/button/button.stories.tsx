import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import styled from 'styled-components'
import Button from './button'

const Container = styled.div`
  padding: 20px;
`

storiesOf('Button', module)
  .add('primary', () => (
    <Container>
      <Button onClick={action('clicked')}>Primary Button</Button>
    </Container>
  ))
  .add('secondary', () => (
    <Container>
      <Button variant="secondary" onClick={action('clicked')}>
        Secondary Button
      </Button>
    </Container>
  ))
  .add('text', () => (
    <Container>
      <Button variant="text" onClick={action('clicked')}>
        Text Button
      </Button>
    </Container>
  ))
  .add('outline', () => (
    <Container>
      <Button variant="outline" onClick={action('clicked')}>
        Outline Button
      </Button>
    </Container>
  ))
