import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import {
  Container,
  Arrow,
  SelectedOption,
} from './mobile-option-slider-components'

type Props = {
  options: any[]
  selectedIndex: number
  onChange: (e: any) => void
}

export default function MobileOptionSlider({
  options,
  selectedIndex,
  onChange,
}: Props) {
  function prev() {
    let newOption
    if (selectedIndex > 0) {
      newOption = selectedIndex - 1
    } else {
      newOption = options.length - 1
    }

    onChange(newOption)
  }

  function next() {
    let newOption
    if (selectedIndex < options.length - 1) {
      newOption = selectedIndex + 1
    } else {
      newOption = 0
    }

    onChange(newOption)
  }

  return (
    <Container>
      {options.length > 1 && (
        <Arrow onClick={prev}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Arrow>
      )}
      <SelectedOption>{options[selectedIndex]}</SelectedOption>
      {options.length > 1 && (
        <Arrow onClick={next}>
          <FontAwesomeIcon icon={faArrowRight} />
        </Arrow>
      )}
    </Container>
  )
}
