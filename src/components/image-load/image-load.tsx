import React, { useEffect, useState } from 'react'
import { loadImage } from 'helpers'
import { ImageContainer } from './image-load-components'

type Props = {
  src: string
}

export default function ImageLoad({ src }: Props) {
  const [showImage, setShowImage] = useState(false)

  useEffect(() => {
    if (src) {
      setShowImage(false)
      loadImage(src).then((img: any) => {
        setShowImage(true)
      })
    }
  }, [src])

  return (
    <ImageContainer
      style={{ backgroundImage: `url(${src})`, opacity: showImage ? 1 : 0 }}
    />
  )
}
