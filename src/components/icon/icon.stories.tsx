import * as React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'
import Icon, { iconNames, IconProps } from './icon'

const Container = styled.div`
  background-color: #98a4ae;
  height: 100%;
  overflow: auto;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 200px);
  grid-auto-flow: row;
  width: fit-content;
  height: fit-content;
`
const GridCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`

const CenteredContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const TextContent = styled.div`
  display: flex;
  justify-content: center;
  color: #fff;
  margin-top: 8px;
`

storiesOf('Icon', module).add('all variants', () => (
  <Container>
    <GridContainer>
      {Object.keys(iconNames).map((iconName) => (
        <GridCell style={{ display: iconName === 'nikeLoading' ? 'none' : '' }}>
          <CenteredContent>
            <Icon name={iconName as IconProps['name']} />
          </CenteredContent>
          <TextContent>
            <span>{iconName}</span>
          </TextContent>
        </GridCell>
      ))}
    </GridContainer>
  </Container>
))
