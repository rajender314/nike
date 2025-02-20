import React from 'react'
import { Container, Progress } from './progress-bar-components'

type Props = {
  progress: number
  height?: string
}

export default function ProgressBar({ progress = 0, height }: Props) {
  return (
    <Container height={height}>
      <Progress progress={progress} />
    </Container>
  )
}
