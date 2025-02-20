import moment from 'moment'
import { jsPDF } from 'jspdf'
import JSZIP from 'jszip'
import autoTable from 'jspdf-autotable'
import { saveAs } from 'file-saver'
import { font } from 'fonts/Combat'
import { vj6, vj7, sb6, vk4 } from 'data/football'
import { mlb, sp21 } from 'data/baseball'
import * as SB6PDF from 'data/football/sb6/pdf-images'
import * as VJ6PDF from 'data/football/vj6/pdf-images'
import * as VJ7PDF from 'data/football/vj7/pdf-images'
import * as VK4PDF from 'data/football/vk4/pdf-images'
import * as MLBPDF from 'data/baseball/mlb/pdf-images'
import { isLightColor } from 'helpers'

export const productTypes: any = {
  VJ6: vj6,
  VJ7: vj7,
  SB6: sb6,
  VK4: vk4,

  MLB: mlb,
  SP21: sp21,
}

export function downloadPDF({
  sportId,
  orderId,
  order,
  products,
  playerLogo,
  dieCast,
}: any) {
  return new Promise(async (resolve, rejected) => {
    const PDF = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: [792, 612],
    })

    PDF.addFileToVFS('Combat.ttf', font)
    PDF.addFont('Combat.ttf', 'Combat', 'normal')

    generatePreview(PDF, order)
    generateColorsTable(PDF, products)
    await generateStaticPages(PDF, order, sportId)
    await generateDieCast(PDF, order, dieCast, sportId)
    generateHeader(PDF)
    generateFooter(PDF, order, sportId)

    const fileName: any = []
    if (order.fileName) {
      fileName.push(order.fileName)
    }
    fileName.push(`FA${order.season.slice(-2)}_PROMO`)
    if (order.styleName) {
      fileName.push(order.styleName)
    }
    fileName.push(moment().format('MMDDYY'))

    const pdfFile = new File([PDF.output('blob')], `${orderId}.pdf`, {
      type: 'pdf',
    })

    var zip = new JSZIP()
    zip.file(`${fileName.join('_')}.pdf`, pdfFile)

    /**
     * Add player logos to zip file
     */
    const logoList: any = getAiLogos(playerLogo)
    logoList.forEach((ai: any) => {
      const blob: any = fetch(ai.aiLogo).then((r) => (r ? r.blob() : null))
      zip.file(ai.aiName, blob, { binary: true })
    })

    zip.generateAsync({ type: 'blob' }).then(function (content) {
      saveAs(content, `${fileName.join('_')}.zip`)
    })

    resolve('success')
  })
}

function generatePreview(PDF: any, order: any) {
  const pageWidth = PDF.internal.pageSize.getWidth()
  const pageHeight = PDF.internal.pageSize.getHeight()
  const pageHeightWithoutHeaderFooter = pageHeight - (30 + 45 + 20) // header + footer + extra padding
  const previewAll = productTypes[order.product.name].config.tabs[0]
  let offsetTop = 0

  let container: any = getDimensionsWithFixedWidth(
    pageWidth,
    previewAll.aspectRatio.x,
    previewAll.aspectRatio.y,
  )
  if (container.height > pageHeightWithoutHeaderFooter) {
    container = getDimensionsWithFixedHeight(
      pageHeightWithoutHeaderFooter,
      previewAll.aspectRatio.x,
      previewAll.aspectRatio.y,
    )
  }
  container.left = (pageWidth - container.width) * 0.5
  container.top =
    30 + 10 + (pageHeightWithoutHeaderFooter - container.height) * 0.5

  previewAll.views.forEach((view: any, index: number) => {
    const canvasEl = document.getElementById(
      'preview-' + view.name.toLowerCase().replace(/\s/g, '-'),
    ) as HTMLCanvasElement

    const widthPercent =
      Number(previewAll.styleProps[index].width.replace('%', '')) * 0.01
    const heightPercent =
      Number(previewAll.styleProps[index].height.replace('%', '')) * 0.01
    const margin =
      Number(
        (previewAll.styleProps[index].marginLeft || '0').replace('%', ''),
      ) * 0.01

    const myWidth = container.width * widthPercent
    const myHeight = container.height * heightPercent
    const col = index % 2
    const row = Math.floor(index / 2)

    /**
     * to create some padding
     * subtract 20 from parent width and height
     */
    const resizedCanvas = getResizedDimensions(
      canvasEl.width * 0.75, //convert from pixels to points
      canvasEl.height * 0.75,
      myWidth - 20,
      myHeight - 20,
    )

    /**
     * to create some padding
     * add 10 to left and top
     */
    PDF.addImage(
      canvasEl.toDataURL(),
      'PNG',
      10 +
        (col > 0 ? (1 - widthPercent - margin) * container.width : 0) +
        container.left +
        resizedCanvas.left,
      10 + container.top + resizedCanvas.top + offsetTop,
      resizedCanvas.width,
      resizedCanvas.height,
      '',
      'FAST',
    )

    if (col === 1) {
      offsetTop = offsetTop + myHeight
    }
  })
}

function getDimensionsWithFixedWidth(
  width: number,
  xRatio: number,
  yRatio: number,
) {
  let w = width,
    h = (width * yRatio) / xRatio
  return { width: w, height: h }
}

function getDimensionsWithFixedHeight(
  height: number,
  xRatio: number,
  yRatio: number,
) {
  let w = (height * xRatio) / yRatio,
    h = height
  return { width: w, height: h }
}

function generateColorsTable(PDF: any, products: any[]) {
  const rows: any[] = []

  products
    .slice()
    .sort(sortProducts)
    .forEach((item: any) => {
      if (item.itemType === 'swoosh') {
        const primaryColor = getSelectedColor([...item.primaryColors])
        rows.push({
          id: item.component,
          location: item.pdfItem || item.item,
          color: primaryColor.colorName || '--',
          code: primaryColor.colorCode,
          material: item.material,
        })

        const secondaryColor = getSelectedColor([...item.secondaryColors])
        if (secondaryColor.colorCode !== '') {
          rows.push({
            id: '',
            location: item.pdfItem || item.pattern,
            color: secondaryColor.colorName || '--',
            code: secondaryColor.colorCode,
            material: item.material,
            supplier: item.supplier,
          })
        }
      } else if (item.itemType === 'palm') {
        const palmColor = getPalmColor(item.material)
        rows.push({
          id: item.component,
          location: item.pdfItem
            ? `${item.pdfItem} (${item.material})`
            : item.item,
          color: palmColor.colorName || '--',
          code: palmColor.colorCode,
          material: getPalmObjectValue(item.materialOptions, item.material),
          supplier: getPalmObjectValue(item.supplier, item.material),
        })

        if (item.pattern !== '') {
          rows.push({
            id: '',
            location: 'Palm Graphics',
            color: '',
            code: '',
            material: item.pattern,
            supplier: getPalmObjectValue(item.supplier, item.material),
          })
        }

        let primaryColor = getSelectedColor([...item.primaryColors])
        if (primaryColor.colorCode !== '') {
          rows.push({
            id: '',
            location: 'Palm Base Color',
            color: primaryColor.colorName || '--',
            code: primaryColor.colorCode,
            material: '',
          })
        }

        let secondaryColor = getSelectedColor([...item.secondaryColors])
        if (secondaryColor.colorCode !== '') {
          rows.push({
            id: '',
            location: 'Palm Secondary Color',
            color: secondaryColor.colorName || '--',
            code: secondaryColor.colorCode,
            material: '',
          })
        }
      } else {
        let selectedColor = getSelectedColor([
          ...item.options,
          ...item.optionalColors,
        ])

        rows.push({
          id: item.component,
          location: item.pdfItem || item.item,
          color: selectedColor.colorName || item.color || '--',
          code: selectedColor.colorCode,
          material: item.material,
          supplier: item.supplier,
        })

        if (item.children) {
          item.children.forEach((child: any) => {
            rows.push({
              id: child.component || item.component,
              location: child.pdfItem || child.item,
              color: selectedColor.colorName || '--',
              code: selectedColor.colorCode,
              material: child.material || item.material,
              supplier: child.supplier || item.material,
            })
          })
        }
      }
    })

  let columns = [
    { header: 'COMPONENT', dataKey: 'id' },
    { header: 'LOCATION', dataKey: 'location' },
    { header: 'COLOR', dataKey: 'color' },
    { header: 'MATERIAL', dataKey: 'material' },
    { header: 'SUPPLIER', dataKey: 'supplier' },
  ]

  PDF.addPage('l')
  autoTable(PDF, {
    head: [columns.map((col) => col.header)],
    headStyles: {
      halign: 'left',
      valign: 'middle',
      textColor: '#323232',
      fillColor: '#e1e1e1',
      fontStyle: 'bold',
      fontSize: 8,
      lineWidth: 0.1,
    },
    columns: columns,
    columnStyles: {
      2: {
        cellPadding: { left: 24 },
        valign: 'middle',
        halign: 'left',
      },
    },
    body: rows,
    theme: 'grid', //'striped'|'grid'|'plain'
    tableLineWidth: 0.1,
    margin: { top: 50, left: 24, bottom: 60, right: 24 },
    didDrawCell: (data) => {
      if (data.section === 'body' && data.column.index === 2) {
        var rawData: any = data.row && data.row.raw && data.row.raw
        let code: string = ''
        if (rawData) {
          code = rawData.code || ''
        }
        if (code) {
          PDF.setLineWidth(0)
          PDF.setDrawColor(isLightColor(code) ? '#000000' : '#ffffff')
          PDF.setFillColor(code)
          PDF.circle(data.cell.x + 12, data.cell.y + 10, 6, 'FD')
        }
      }
    },
  })
}

function sortProducts(a: any, b: any) {
  if (a.component && b.component) {
    if (a.component[0] === b.component[0]) {
      if (Number(a.component.slice(1)) > Number(b.component.slice(1))) {
        return 1
      } else {
        return -1
      }
    } else {
      if (a.component > b.component) {
        return 1
      } else {
        return -1
      }
    }
  } else {
    if (a.component) {
      return -1
    } else {
      return 1
    }
  }
}

async function generateStaticPages(PDF: any, order: any, sportId: string) {
  const pageWidth = PDF.internal.pageSize.getWidth()
  const pageHeight = PDF.internal.pageSize.getHeight()
  let assets: any[] = []

  if (order.product.name === 'SB6') {
    const {
      asset1,
      asset2,
      asset3,
      asset4,
      asset5,
      asset6,
      asset7,
      asset4ncaa,
    } = SB6PDF

    assets.push(asset1, asset2, asset3)
    if (sportId === 'football-ncaa') {
      assets.push(asset4ncaa)
    } else {
      assets.push(asset4)
    }
    assets.push(asset5, asset6, asset7)
  } else if (order.product.name === 'VJ6') {
    const {
      asset1,
      asset2,
      asset3,
      asset4,
      asset5,
      asset6,
      asset7,
      asset4ncaa,
    } = VJ6PDF

    assets.push(asset1, asset2, asset3)
    if (sportId === 'football-ncaa') {
      assets.push(asset4ncaa)
    } else {
      assets.push(asset4)
    }
    assets.push(asset5, asset6, asset7)
  } else if (order.product.name === 'VJ7') {
    const {
      asset1,
      asset2,
      asset3,
      asset4,
      asset5,
      asset6,
      asset7,
      asset8,
      asset4ncaa,
    } = VJ7PDF

    assets.push(asset1, asset2, asset3)
    if (sportId === 'football-ncaa') {
      assets.push(asset4ncaa)
    } else {
      assets.push(asset4)
    }
    assets.push(asset5, asset6, asset7, asset8)
  } else if (order.product.name === 'VK4') {
    const { asset1, asset2, asset3, asset4, asset5, asset6, asset3ncaa } =
      VK4PDF

    assets.push(asset1, asset2)
    if (sportId === 'football-ncaa') {
      assets.push(asset3ncaa)
    } else {
      assets.push(asset3)
    }
    assets.push(asset4, asset5, asset6)
  } else if (order.product.name === 'MLB') {
    const { asset1, asset2 } = MLBPDF

    assets = [asset1, asset2]
  }

  for (let i = 0; i < assets.length; i++) {
    const imgObj: any = await getResizedImage(assets[i], pageWidth, pageHeight)
    PDF.addPage('l')
    PDF.addImage(
      imgObj.image,
      'PNG',
      0,
      0,
      imgObj.width,
      imgObj.height,
      '',
      'FAST',
    )

    if (sportId === 'football') {
      if (
        (order.product.name === 'SB6' && i === 3) ||
        (order.product.name === 'VJ6' && i === 3) ||
        (order.product.name === 'VJ7' && i === 3) ||
        (order.product.name === 'VK4' && i === 2)
      ) {
        drawGloveSize(PDF, order)
      }
    }
  }
}

function drawGloveSize(PDF: any, order: any) {
  const backgroundColor = '#000000'
  const color = '#9DA1A2'

  const positions = [
    {
      x: 249,
      y: 375,
      width: 46,
      height: 33,
      fontSize: 22,
      top: 0.65,
    },
  ]

  if (order.product.name === 'VJ7') {
    positions[0].x = 175
    positions[0].y = 394
  } else if (order.product.name === 'VK4') {
    positions[0].y = 371.5
  }

  if (order.product.name === 'SB6') {
    positions.push({
      x: 370,
      y: 177,
      width: 33,
      height: 24,
      fontSize: 18,
      top: 0.65,
    })
  } else if (order.product.name === 'VJ6') {
    positions.push({
      x: 396,
      y: 119,
      width: 22,
      height: 16,
      fontSize: 11,
      top: 0.7,
    })
  } else if (order.product.name === 'VJ7') {
    positions.push({
      x: 523,
      y: 222,
      width: 46,
      height: 33,
      fontSize: 22,
      top: 0.65,
    })
  }

  positions.forEach((position) => {
    const { x, y, width, height, fontSize, top } = position

    PDF.setFillColor(backgroundColor)
    PDF.setTextColor(color)
    PDF.setFont('Combat')
    PDF.rect(position.x, position.y, position.width, position.height, 'F')
    PDF.setFontSize(fontSize)
    PDF.text(order.gloveSize, x + width * 0.5, y + height * top, {
      align: 'center',
    })
  })
}

async function getResizedImage(
  url: string,
  parentWidth: number,
  parentHeight: number,
) {
  const imgObj: any = await getImageDimensions(url)

  return {
    image: imgObj.image,
    ...getResizedDimensions(
      imgObj.width,
      imgObj.height,
      parentWidth,
      parentHeight,
    ),
  }
}

async function getImageDimensions(url: string) {
  return new Promise(function (resolve) {
    var img = new Image()
    img.onload = function () {
      /**
       * for converting pixels to points
       * multiply with 0.75
       */
      resolve({
        image: img,
        width: img.width * 0.75,
        height: img.height * 0.75,
      })
    }
    img.crossOrigin = ''
    img.src = url
  })
}

function getResizedDimensions(
  width: number,
  height: number,
  parentWidth: number,
  parentHeight: number,
) {
  let ratio = 1

  if (width > height) {
    ratio = parentWidth / width
  } else {
    ratio = parentHeight / height
  }

  // if (parentWidth > parentHeight) {
  //   if (height > parentHeight) {
  //     ratio = parentHeight / height
  //   } else {
  //     ratio = parentWidth / width
  //   }
  // } else {
  //   if (width > parentWidth) {
  //     ratio = parentWidth / width
  //   } else {
  //     ratio = parentHeight / height
  //   }
  // }

  const newWidth = width * ratio
  const newHeight = height * ratio

  return {
    left: (parentWidth - newWidth) * 0.5,
    top: (parentHeight - newHeight) * 0.5,
    width: newWidth,
    height: newHeight,
  }
}

async function generateDieCast(
  PDF: any,
  order: any,
  dieCast: any,
  sportId: string,
) {
  const dieCastCanvas = document.getElementById('die-cast') as HTMLCanvasElement
  const dieCastSmallCanvas = document.getElementById(
    'small-die-cast',
  ) as HTMLCanvasElement
  const leftInsideCuff = document.getElementById(
    'preview-left-inside-cuff',
  ) as HTMLCanvasElement
  const rightInsideCuff = document.getElementById(
    'preview-right-inside-cuff',
  ) as HTMLCanvasElement
  const pageWidth = PDF.internal.pageSize.getWidth()
  const pageHeight = PDF.internal.pageSize.getHeight()
  const pageHeightWithoutHeaderFooter = pageHeight - (30 + 45 + 20) // header + footer + extra padding

  let container: any = getDimensionsWithFixedWidth(pageWidth, 10, 6)
  if (container.height > pageHeightWithoutHeaderFooter) {
    container = getDimensionsWithFixedHeight(
      pageHeightWithoutHeaderFooter,
      10,
      6,
    )
  }
  container.left = (pageWidth - container.width) * 0.5
  container.top =
    30 + 10 + (pageHeightWithoutHeaderFooter - container.height) * 0.5
  let assets: any[] = []

  if (order.product.name === 'SB6') {
    if (sportId === 'football-ncaa') {
      const { diecastLncaa, diecastXLncaa } = SB6PDF

      assets = [diecastLncaa, diecastXLncaa]
    } else {
      const { diecastL, diecastXL } = SB6PDF

      assets = [diecastL, diecastXL]
    }
  } else if (order.product.name === 'VJ6') {
    if (sportId === 'football-ncaa') {
      const { diecastLncaa, diecastXLncaa } = VJ6PDF

      assets = [diecastLncaa, diecastXLncaa]
    } else {
      const { diecastL, diecastXL } = VJ6PDF

      assets = [diecastL, diecastXL]
    }
  } else if (order.product.name === 'VJ7') {
    if (sportId === 'football-ncaa') {
      const { diecastLncaa, diecastXLncaa } = VJ7PDF

      assets = [diecastLncaa, diecastXLncaa]
    } else {
      const { diecastL, diecastXL } = VJ7PDF

      assets = [diecastL, diecastXL]
    }
  } else if (order.product.name === 'VK4') {
    if (sportId === 'football-ncaa') {
      const { diecastLncaa, diecastXLncaa } = VK4PDF

      assets = [diecastLncaa, diecastXLncaa]
    } else {
      const { diecastL, diecastXL } = VK4PDF

      assets = [diecastL, diecastXL]
    }
  }

  for (let i = 0; i < assets.length; i++) {
    const imgObj: any = await getResizedImage(assets[i], pageWidth, pageHeight)
    PDF.addPage('l')
    PDF.addImage(
      imgObj.image,
      'PNG',
      0,
      0,
      imgObj.width,
      imgObj.height,
      '',
      'FAST',
    )

    generateDieCastColors(PDF, order, dieCast)

    if (i === 0) {
      const dieCastDimensions = getResizedDimensions(
        dieCastCanvas.width * 0.75, //convert from pixels to points
        dieCastCanvas.height * 0.75,
        container.width,
        container.height * 0.68,
      )
      PDF.addImage(
        dieCastCanvas.toDataURL(),
        'PNG',
        container.left + dieCastDimensions.left,
        container.top + dieCastDimensions.top,
        dieCastDimensions.width,
        dieCastDimensions.height,
        '',
        'FAST',
      )
    } else if (i === 1) {
      const dieCastSmallDimensions = getResizedDimensions(
        dieCastSmallCanvas.width * 0.75, //convert from pixels to points
        dieCastSmallCanvas.height * 0.75,
        container.width,
        container.height * 0.7,
      )
      PDF.addImage(
        dieCastSmallCanvas.toDataURL(),
        'PNG',
        container.left + dieCastSmallDimensions.left,
        container.top + dieCastSmallDimensions.top,
        dieCastSmallDimensions.width,
        dieCastSmallDimensions.height,
        '',
        'FAST',
      )
    }

    const leftInsideCuffDimensions = getResizedDimensions(
      leftInsideCuff.width * 0.75,
      leftInsideCuff.height * 0.75,
      container.width * 0.15,
      container.height * 0.05,
    )
    PDF.addImage(
      leftInsideCuff.toDataURL(),
      'PNG',
      container.width * 0.323 + container.left + leftInsideCuffDimensions.left,
      container.height * 0.725 + container.top + leftInsideCuffDimensions.top,
      leftInsideCuffDimensions.width,
      leftInsideCuffDimensions.height,
      '',
      'FAST',
    )

    const rightInsideCuffDimensions = getResizedDimensions(
      rightInsideCuff.width * 0.75,
      rightInsideCuff.height * 0.75,
      container.width * 0.15,
      container.height * 0.05,
    )
    PDF.addImage(
      rightInsideCuff.toDataURL(),
      'PNG',
      35 +
        container.width * 0.5 +
        container.left +
        rightInsideCuffDimensions.left,
      container.height * 0.725 + container.top + rightInsideCuffDimensions.top,
      rightInsideCuffDimensions.width,
      rightInsideCuffDimensions.height,
      '',
      'FAST',
    )
  }
}

function generateDieCastColors(PDF: any, order: any, dieCast: any) {
  const pageWidth = PDF.internal.pageSize.getWidth()
  let colorPosition: any = {
    x: pageWidth * 0.5 - 20,
    y: 80,
  }

  if (dieCast) {
    const { primaryColors = [], logoColors = [], patternColors = [] } = dieCast
    const uniqueColors: string[] = []
    primaryColors
      .filter((color: any) => !!color.selected)
      .forEach((color: any) => {
        if (uniqueColors.indexOf(color.code) === -1) {
          uniqueColors.push(color.code)
          drawPalmColor(PDF, color, colorPosition.x, colorPosition.y)
          colorPosition.y = colorPosition.y + 10
        }
      })

    logoColors
      .filter((color: any) => color.selected === true)
      .forEach(async (color: any) => {
        if (uniqueColors.indexOf(color.code) === -1) {
          uniqueColors.push(color.code)
          drawPalmColor(PDF, color, colorPosition.x, colorPosition.y)
          colorPosition.y = colorPosition.y + 10
        }
      })
    patternColors
      .filter((color: any) => color.selected === true)
      .forEach((color: any) => {
        if (uniqueColors.indexOf(color.code) === -1) {
          uniqueColors.push(color.code)
          drawPalmColor(PDF, color, colorPosition.x, colorPosition.y)
          colorPosition.y = colorPosition.y + 10
        }
      })
  }
}

function drawPalmColor(PDF: any, color: any, x: number, y: number) {
  PDF.setDrawColor(isLightColor(color.code) ? '#222222' : color.code)
  PDF.setFillColor(color.code)
  PDF.rect(x, y, 50, 10, 'FD')
  PDF.setTextColor(isLightColor(color.code) ? '#000000' : '#ffffff')
  PDF.setFontSize(7)
  PDF.text(color.name || color.code, x + 2, y + 1, {
    maxWidth: 46,
    baseline: 'top',
  })
}

function generateHeader(PDF: any) {
  const pageWidth = PDF.internal.pageSize.getWidth()
  const pageCount = PDF.internal.getNumberOfPages()

  PDF.setTextColor('#000')
  PDF.setFont('Helvetica', 'normal', 'bold')
  PDF.setFontSize(9)

  for (let i = 1; i <= pageCount; i++) {
    PDF.setPage(i)

    PDF.setLineWidth(1)
    PDF.setDrawColor(100)
    PDF.line(12, 30, pageWidth - 12, 30)

    PDF.addImage(getImageObject(SB6PDF.pdfLogo), 'PNG', 24, 12, 48, 0)
    PDF.text(i === 1 ? 'COVER PAGE' : 'OVERVIEW', pageWidth * 0.5, 18, {
      align: 'center',
    })
    PDF.text(`Page ${i} of ${pageCount}`, pageWidth - 24, 18, {
      align: 'right',
    })
  }
}

function generateFooter(PDF: any, order: any, sportId: string) {
  const pageHeight = PDF.internal.pageSize.getHeight()
  const pageCount = PDF.internal.getNumberOfPages()
  const franchise: any = {
    football: 'NFL',
    baseball: 'MLB',
    'football-ncaa': 'NCAA',
  }

  const header = [
    '',
    'PRODUCT NUMBER:',
    'PRODUCT NAME:',
    'CATEGORY:',
    'DESIGNER:',
    'ENGINEER:',
    'PRODUCT MANGER:',
    'SEASON:',
    'REVISION DATE:',
  ]
  const body = [
    '',
    '<TBD>',
    `${order.product.name} - ${franchise[sportId]}`,
    'FOOTBALL',
    'ANDREW NGUYEN',
    'CODY DILL',
    'LAUREN SILBER',
    order.season,
    moment(order.updateAt).format('YYYY-MM-DD'),
  ]
  const footer = [
    {
      content: `STRICTLY CONFIDENTIAL JR286 DESIGN. "KEEP TIGHT" - ALL MATERIAL IS PROPERTY OF JR286, ANY USE, REPRESENTATION OR PRODUCTION WITHOUT WRITTEN AUTHORIZATION STRICTLY PROHIBITED `,
      colSpan: 9,
      rowSpan: 0,
      styles: {
        fillColor: '#323232',
        textColor: 'white',
        fontSize: 6,
      },
    },
  ]

  for (let i = 1; i <= pageCount; i++) {
    PDF.setPage(i)

    autoTable(PDF, {
      head: [header],
      headStyles: {
        cellPadding: 0,
        halign: 'left',
        valign: 'middle',
        fillColor: '#ffffff',
        textColor: '#000000',
        fontSize: 6,
        fontStyle: 'bold',
      },
      body: [body],
      bodyStyles: {
        cellPadding: 0,
        halign: 'left',
        fontSize: 8,
      },
      foot: [footer],
      theme: 'plain', //'striped'|'grid'|'plain'
      margin: { top: pageHeight - 45, left: 12, bottom: 2, right: 12 },
      tableLineWidth: 1,
      tableLineColor: '#323232',
      didDrawCell: (data) => {
        if (data.section === 'head' && data.column.index === 0) {
          PDF.addImage(
            getImageObject(SB6PDF.pdfLogo),
            'PNG',
            data.cell.x + 20,
            data.cell.y + 6,
            40,
            0,
            '',
            'FAST',
          )
        }
      },
      columnStyles: {
        0: {
          cellWidth: 80,
        },
      },
    })
  }
}

function getSelectedColor(data: any) {
  let obj = data.find((option: any) => !!option.selected)
  let colorName = obj && obj.name ? obj.name : ''
  let colorCode = obj && obj.code ? obj.code : ''
  return { colorName: colorName, colorCode: colorCode }
}

function getAiLogos(logos: any) {
  let list: any = []
  logos &&
    logos.forEach((logo: any) => {
      if (logo.aiLogo) {
        list.push(logo)
      }
    })
  return list
}

function getImageObject(url: string) {
  var img = new Image()
  img.src = url

  return img
}

function getPalmColor(material: string) {
  let colorName = ''
  let colorCode = ''
  switch (material) {
    case 'Hydragrip':
      colorName = 'Black'
      colorCode = '#000000'
      break
    case 'Leather':
      colorName = 'Grey'
      colorCode = '#C0C0C0'
      break
  }
  return { colorName, colorCode }
}

function getPalmObjectValue(obj: any, material: string) {
  if (!obj) {
    return ''
  }

  let key = ''
  if (material === 'Magnagrip Silicone') {
    key = 'silicone'
  } else {
    key = material.toLowerCase()
  }

  return obj[key] || ''
}
