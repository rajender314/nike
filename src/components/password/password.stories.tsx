import * as React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Password from './password'

const Container = styled.div``

storiesOf('Password', module).add('default', () => {
  return (
    <Container>
      <Password
        label="Password"
        placeholder="Enter Password"
        onChange={action('changed')}
      />
    </Container>
  )
})
