import JSZIP from 'jszip'
import { saveAs } from 'file-saver'
import { getResizedCanvas } from './designer'

function getImageColors(productItems: any, style: any) {
  function getSelectedColor(data: any) {
    let obj = data.find((option: any) => !!option.selected) || {}

    return obj.publicName || obj.name || '--'
  }
  function pickColorByComponentId(id: any) {
    let data = productItems.find((item: any) => item.itemType === id)
    let sB6Data = productItems.find(
      (item: any) => item.itemType === id && item.itemId === 102,
    )
    if (!data) {
      return '--'
    }
    if (id === 'swoosh' || id === 'palm') {
      let primaryColor = getSelectedColor(data.primaryColors)
      if (primaryColor !== '--') {
        return primaryColor
      } else {
        return data.primaryColors && data.primaryColors[0]
          ? data.primaryColors[0].publicName || data.primaryColors[0].name
          : '--'
      }
    } else {
      if (style !== 'SB6') {
        return getSelectedColor([...data.options, ...data.optionalColors])
      } else {
        return getSelectedColor([...sB6Data.options, ...sB6Data.optionalColors])
      }
    }
  }
  let palmColor = pickColorByComponentId('palm')
  let swooshColor = pickColorByComponentId('swoosh')
  let bohColor = pickColorByComponentId('color')

  return `${bohColor}_${palmColor}_${swooshColor}`
}

function getImageName(params: any, imageColors: any) {
  const { season, styleName } = params
  return `${season}_${styleName}_${imageColors}`
}

export const getPng = async (params: any) => {
  Promise.all([
    getImageBlob('preview-top-of-hand'),
    getImageBlob('preview-palm-of-hand'),
  ]).then(generatePNGs)

  function generatePNGs(images: any[]) {
    const imageColors: any = getImageColors(params.products, params.styleName)
    const imageName: any = getImageName(params, imageColors)
    var zip = new JSZIP()
    images.forEach((i: any, index: number) => {
      zip.file(`${imageName}_${index + 1}.png`, i, {
        base64: true,
        createFolders: true,
      })
    })
    zip.generateAsync({ type: 'blob' }).then(function (content) {
      saveAs(content, `${params.orderId}.zip`)
    })
  }
}

function getImageBlob(id: string) {
  return new Promise((resolve, reject) =>
    getResizedCanvas(id, 600, true).toBlob((blob: any) => resolve(blob)),
  )
}
