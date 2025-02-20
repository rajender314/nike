import React, { useState, useLayoutEffect, useRef } from 'react'
import { Container, ARContainer } from './aspect-ratio-container-components'

type Props = {
  xRatio: number
  yRatio: number
  width?: 'fixed' | 'auto'
  height?: 'fixed' | 'auto'
  children: any
}

export default function AspectRatioContainer({
  xRatio,
  yRatio,
  width = 'auto',
  height = 'auto',
  children,
}: Props) {
  const containerRef = useRef(null)
  const [style, setStyle] = useState({})

  useLayoutEffect(() => {
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
    // eslint-disable-next-line
  }, [containerRef])

  function updateDimensions() {
    const parentContainer: any = containerRef.current
    const containerProps: any = parentContainer.getBoundingClientRect()
    let dimensions
    if (width === 'fixed') {
      dimensions = getDimensionsWithFixedWidth(containerProps)
    } else if (height === 'fixed') {
      dimensions = getDimensionsWithFixedHeight(containerProps)
    } else {
      dimensions = getDimensionsWithFixedWidth(containerProps)

      if (dimensions.height > containerProps.height) {
        dimensions = getDimensionsWithFixedHeight(containerProps)
      }
    }

    setStyle(dimensions)
  }

  function getDimensionsWithFixedWidth(obj: any) {
    let w = obj.width,
      h = (obj.width * yRatio) / xRatio
    return { width: w, height: h }
  }

  function getDimensionsWithFixedHeight(obj: any) {
    let w = (obj.height * xRatio) / yRatio,
      h = obj.height
    return { width: w, height: h }
  }

  return (
    <Container ref={containerRef}>
      <ARContainer style={style}>{children}</ARContainer>
    </Container>
  )
}
