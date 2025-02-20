import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Checkbox from './checkbox'
import styled from 'styled-components'

const Container = styled.div`
  padding: 20px;
`

storiesOf('Checkbox', module)
  .add('default', () => (
    <Container>
      <Checkbox label="Default checkbox" onChange={action('changed')} />
    </Container>
  ))
  .add('small', () => (
    <Container>
      <Checkbox
        size="small"
        label="Small checkbox"
        onChange={action('changed')}
      />
    </Container>
  ))
