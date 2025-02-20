import { baseURL } from 'providers'
import { s3, s3Bucket } from 'helpers'

export function dataURItoBlob(dataURI: any) {
  var byteString
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1])
  else byteString = unescape(dataURI.split(',')[1])
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  var ia = new Uint8Array(byteString.length)
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ia], { type: mimeString })
}

export function generateThumbnail(orderId: string, canvasId: string) {
  return new Promise((resolve, reject) =>
    getResizedCanvas(canvasId, 600).toBlob((blob: any) => {
      const params = {
        Bucket: s3Bucket,
        Key: `player/${orderId}-thumb-nail.png`,
        Body: blob,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: `image/*`,
      }

      s3.upload(params)
        .promise()
        .then((res: any) => resolve(res))
    }),
  )
}

export function hexToRgb(hex: string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

export function rgbToHex(r: number, g: number, b: number) {
  function numberToHex(num: number) {
    var hex = num.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return '#' + numberToHex(r) + numberToHex(g) + numberToHex(b)
}

export function is2dLengthEqual(sourceObj: any[], destinationObj: any[]) {
  const keys: any[] = Object.keys(sourceObj)

  for (let i = 0; i < keys.length; i++) {
    let a1 = sourceObj[keys[i]],
      a2 = destinationObj[keys[i]]

    if (
      !a1 ||
      !a2 ||
      Object.values(a1).filter((obj: any) => !!obj.src).length !==
        Object.keys(a2).length
    ) {
      return false
    }
  }

  return true
}

export function isLightColor(hex: string) {
  let rgb = hexToRgb(hex) || { r: 255, g: 255, b: 255 }

  return rgb.r + rgb.g + rgb.b > 500
}

export function isValidHexColor(hex: string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  return !!result
}

export function loadImage(src: string, canvas?: boolean) {
  return new Promise((resolve: any, reject: any) => {
    const img = new Image()
    img.onload = function () {
      resolve(img)
    }
    img.onerror = reject
    img.src = canvas ? `${baseURL}getImage?src=${src}` : src
  })
}

export function getResizedCanvas(
  id: string,
  maxSize: number,
  imageWithBorder?: boolean,
) {
  const canvas = document.getElementById(id) as HTMLCanvasElement
  const resizedCanvas = document.createElement('canvas')
  const ctx: any = resizedCanvas.getContext('2d')
  var canvasWidth = canvas.width
  var canvasHeight = canvas.height
  const ratio = maxSize / Math.max(canvas.width, canvasHeight)
  const newCanvasWidth = canvasWidth * ratio
  const newCanvasHeight = canvasHeight * ratio
  let x = 0,
    y = 0

  if (imageWithBorder) {
    resizedCanvas.width = maxSize
    resizedCanvas.height = maxSize
    x = (maxSize - newCanvasWidth) / 2
    y = (maxSize - newCanvasHeight) / 2
  } else {
    resizedCanvas.width = newCanvasWidth
    resizedCanvas.height = newCanvasHeight
  }
  ctx.drawImage(
    canvas,
    0,
    0,
    canvasWidth,
    canvasHeight,
    x,
    y,
    newCanvasWidth,
    newCanvasHeight,
  )

  return resizedCanvas
}

export function fetchImageColors(img: any) {
  if (img.width && img.height) {
    const imageWidth = img.width || img.naturalWidth
    const imageHeight = img.height || img.naturalHeight
    const canvas: any = document.createElement('canvas') as HTMLCanvasElement
    canvas.width = imageWidth
    canvas.height = imageHeight
    const ctx = canvas.getContext('2d')

    ctx.drawImage(img, 0, 0)
    const imageData = ctx.getImageData(0, 0, imageWidth, imageHeight)
    const colorData = imageData.data

    const colors: any = {}
    for (let i = 0; i < colorData.length; i += 4) {
      let key = colorData[i] + '-' + colorData[i + 1] + '-' + colorData[i + 2]
      if (colors[key]) {
        colors[key]++
      } else {
        colors[key] = 1
      }
    }
    delete colors['0-0-0']

    const filteredColors = Object.keys(colors).filter((key) => {
      return colors[key] >= 100
    })
    const sortedColors = filteredColors.sort((i, j) => {
      let iSplit = i.split('-')
      let jSplit = j.split('-')
      let r = parseInt(iSplit[0], 10) - parseInt(jSplit[0], 10)
      if (r !== 0) {
        return r
      }
      let g = parseInt(iSplit[1], 10) - parseInt(jSplit[1], 10)
      if (g !== 0) {
        return g
      }
      let b = parseInt(iSplit[2], 10) - parseInt(jSplit[2], 10)
      if (b !== 0) {
        return b
      }
      return 0
    })
    const uniqueColors: any[] = []
    sortedColors.forEach((color) => {
      if (uniqueColors.length === 0) {
        uniqueColors.unshift(color)
      }
      let color1 = uniqueColors[0].split('-')
      let color2 = color.split('-')

      if (
        Math.abs(parseInt(color2[0], 10) - parseInt(color1[0], 10)) > 10 ||
        Math.abs(parseInt(color2[1], 10) - parseInt(color1[1], 10)) > 10 ||
        Math.abs(parseInt(color2[2], 10) - parseInt(color1[2], 10)) > 10
      ) {
        uniqueColors.unshift(color)
      } else {
        let r = Math.round(
          (parseInt(color2[0], 10) + parseInt(color1[0], 10)) / 2,
        )
        let g = Math.round(
          (parseInt(color2[1], 10) + parseInt(color1[1], 10)) / 2,
        )
        let b = Math.round(
          (parseInt(color2[2], 10) + parseInt(color1[2], 10)) / 2,
        )
        uniqueColors[0] = `${r}-${g}-${b}`
      }
    })

    return uniqueColors.slice(0, 10).map((color) => {
      const rgb = color.split('-')

      return rgbToHex(
        parseInt(rgb[0], 10),
        parseInt(rgb[1], 10),
        parseInt(rgb[2], 10),
      )
    })
  }
}

function gloveCoordinates() {
  const scale = 1
  const p1 = {
    x: 133.279,
    y: 190.1025,
  }

  const assets = [
    {
      src: 1,
      x: 133.279,
      y: 190.1025,
    },
    {
      src: 2,
      x: 220.9866,
      y: 321.5896,
    },
    {
      src: 3,
      x: 1031.2699,
      y: 190.1025,
    },
    {
      src: 4,
      x: 1106.7969,
      y: 321.5896,
    },
  ]

  const newAssets = assets.map((p2) => {
    return {
      src: p2.src,
      x: Math.round((p2.x - p1.x) * scale * 10000) / 10000,
      y: Math.round((p2.y - p1.y) * scale * 10000) / 10000,
    }
  })

  console.log(newAssets)
}

// gloveCoordinates()
