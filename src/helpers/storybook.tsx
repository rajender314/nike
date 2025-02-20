import React from 'react'
import { DecoratorFn } from '@storybook/react'
import StoryRouter from 'storybook-react-router'
import { GlobalFonts, GlobalStyles } from 'components'

export const DecorateWithGlobalStyles: DecoratorFn = (storyFn) => {
  return (
    <React.Fragment>
      <GlobalFonts />
      <GlobalStyles />
      {storyFn()}
    </React.Fragment>
  )
}

export const DecorateWithRouter = StoryRouter(undefined, {
  initialEntries: [''],
})
