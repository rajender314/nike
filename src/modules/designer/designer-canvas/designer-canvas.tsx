import React, { useRef, useEffect, useState } from 'react'
import { fabric } from 'fabric'
import FontFaceObserver from 'fontfaceobserver'
import { is2dLengthEqual, objectPath, loadImage } from 'helpers'
import { vj6, vj7, sb6, vk4 } from 'data/football'
import { mlb, sp21 } from 'data/baseball'
import { Product as ProductStyleType } from 'types'
import { Icon } from 'components'
import {
  CanvasContainer,
  CanvasInnerContainer,
} from '../designer-view/designer-components'

export const productTypes: any = {
  VJ6: vj6,
  VJ7: vj7,
  SB6: sb6,
  VK4: vk4,

  MLB: mlb,
  SP21: sp21,
}

type Props = {
  viewId:
    | 'palm'
    | 'top'
    | 'leftCuff'
    | 'rightCuff'
    | 'dieCast'
    | 'smallDieCast'
    | 'side'
    | 'back'
  viewType: string
  productType: ProductStyleType
  itemList: any[]
  customMessage: any
  reRender: number
  styleProps?: any
  prefix?: string
  isAdmin?: boolean
  isInteractive?: boolean
  styleName?: string
  onItemSelect?: (e: any) => void
  onViewUpdate?: () => void
  dieCast?: any
  onUpdate?: () => void
  onComplete?: () => void
}

export default function DesignerCanvas({
  viewId,
  viewType,
  productType,
  itemList,
  customMessage = {},
  styleProps = {},
  prefix = '', // try to rename this
  isAdmin = false,
  isInteractive = false,
  styleName = '', // rename this to title
  reRender,
  onItemSelect,
  onViewUpdate,
  onUpdate,
  onComplete,
}: Props) {
  const canvasRef = useRef(null)
  const [loadingImages, setLoadingImages] = useState('')
  const [canvasProps, setCanvasProps] = useState<any>({})
  const [canvasObj] = useState<any>({
    canvas: null,
    imageAssets: {},
    loadedImages: {},
    externalImages: {},
    loadedExternalImages: {
      customPattern: {},
      logos: {},
    },
    imageColors: {},
    swoosh: {
      pattern: '',
    },
    palm: {
      material: '',
      pattern: '',
    },
    silicone: {
      pattern: '',
    },
    customPattern: {
      material: '',
      pattern: '',
      src: '',
    },
    logos: {
      material: '',
    },
    objects: {},
    objectsJSON: {},
    activeObject: null,
    activeObjectProps: null,
    tooltip: null,
  })

  useEffect(() => {
    if (loadingImages === '') {
      loadImages()
    } else if (loadingImages === 'complete') {
      calculateCanvasDimensions()
    }
    // eslint-disable-next-line
  }, [loadingImages])

  useEffect(() => {
    if (canvasProps.width && canvasProps.height) {
      createCanvas()
      renderDefaultAssets()
      updateAssets()
      loadExternalImagesAndUpdateAssets()
    }
    // eslint-disable-next-line
  }, [canvasProps])

  useEffect(() => {
    if (canvasObj.canvas) {
      updateAssets()
      loadExternalImagesAndUpdateAssets()
    }
    // eslint-disable-next-line
  }, [reRender])

  function loadImages() {
    setLoadingImages('inprogress')
    canvasObj.imageAssets = productTypes[productType][viewId]

    const { imageAssets, loadedImages } = canvasObj

    Object.keys(imageAssets).forEach((key: any) => {
      let assets = imageAssets[key]
      if (!loadedImages[key]) {
        loadedImages[key] = {}
      }

      assets.forEach(function (asset: any, i: number) {
        if (!!asset.src) {
          loadImage(asset.src).then((img: any) => {
            loadedImages[key][i] = img

            if (is2dLengthEqual(imageAssets, loadedImages)) {
              setLoadingImages('complete')
            }
          })
        }
      })
    })
  }

  function loadExternalImagesAndUpdateAssets() {
    const { loadedExternalImages } = canvasObj
    let listItem: any = null
    if (viewType === 'Top of Hand' || viewType === 'Palm of Hand') {
      listItem = itemList.find((item) => item.itemType === 'palm')
    } else if (viewType === 'Die Cast' || viewType === 'Small Die Cast') {
      listItem = itemList.find((item) => item.itemType === 'dieCast')
    }

    if (listItem) {
      if (listItem.customPattern) {
        listItem.customPattern.forEach((pattern: any, index: number) => {
          if (!!pattern.selected) {
            let key = index,
              imageSrc = pattern.src
            if (viewType === 'Top of Hand') {
              key = 0
              imageSrc = pattern.bohSrc
            } else if (viewType === 'Palm of Hand') {
              key = 0
            }

            if (imageSrc) {
              loadedExternalImages.customPattern[key] = null
              loadExternalImage(imageSrc).then((img) => {
                loadedExternalImages.customPattern[key] = img
                if (checkExternalImagesLength()) {
                  updateExternalAssets()
                }
              })
            }
          }
        })
      }

      if (listItem.logos) {
        listItem.logos.forEach((logo: any, index: number) => {
          if (!!logo.selected) {
            loadedExternalImages.logos[index] = null
            loadExternalImage(logo.logo).then((img) => {
              loadedExternalImages.logos[index] = img

              if (checkExternalImagesLength()) {
                updateExternalAssets()
              }
            })
          }
        })
      }
    }

    if (checkExternalImagesLength()) {
      updateExternalAssets()
    }
  }

  function loadExternalImage(src: string) {
    const { externalImages } = canvasObj

    return new Promise((resolve: any, reject: any) => {
      if (externalImages[src]) {
        resolve(externalImages[src])
      } else {
        loadImage(src, true).then((img) => {
          externalImages[src] = img
          resolve(img)
        })
      }
    })
  }

  function checkExternalImagesLength() {
    const { loadedExternalImages } = canvasObj

    if (
      Object.keys(loadedExternalImages).length ===
        Object.values(loadedExternalImages).filter((val) => !!val).length &&
      Object.keys(loadedExternalImages.customPattern).length ===
        Object.values(loadedExternalImages.customPattern).filter((val) => !!val)
          .length &&
      Object.keys(loadedExternalImages.logos).length ===
        Object.values(loadedExternalImages.logos).filter((val) => !!val).length
    ) {
      return true
    } else {
      return false
    }
  }

  function createCanvas() {
    canvasObj.canvas = new fabric.Canvas(canvasRef.current, {
      width: canvasProps.width,
      height: canvasProps.height,
      hoverCursor: isInteractive ? 'pointer' : 'default',
      selection: false,
    })

    if (isInteractive) {
      const { canvas } = canvasObj

      canvas.on('mouse:over', function (e: any) {
        if (e.target) {
          let itemId = e.target.name
          if (itemId) {
            let objects = canvas.getObjects()
            objects.forEach((obj: any) => {
              if (obj.name === itemId) {
                obj.filters[1] = new fabric.Image.filters.Brightness({
                  brightness: 0.2,
                })
                obj.applyFilters()
              }
            })
            canvas.requestRenderAll()
          }
        }
      })

      canvas.on('mouse:out', function (e: any) {
        if (e.target) {
          let itemId = e.target.name
          if (itemId) {
            let objects = canvas.getObjects()
            objects.forEach((obj: any) => {
              if (obj.name === itemId) {
                obj.filters[1] = false
                obj.applyFilters()
              }
            })
            canvas.requestRenderAll()
          }
        }
      })

      canvas.on('mouse:down', function (e: any) {
        if (e.target) {
          let itemId = e.target.name
          if (itemId && onItemSelect) {
            let selectedItem = itemList.find((item) => item.itemId === itemId)
            onItemSelect(selectedItem)
          }
        }
      })

      canvas.on('mouse:up', function (e: any) {
        const {
          objects,
          objectsJSON,
          activeObject,
          activeObjectProps,
          tooltip,
        } = canvasObj

        if (activeObject) {
          const { left, top, angle, scaleX } = e.target
          activeObject.x = left
          activeObject.y = top
          activeObject.angle = angle
          activeObject.scale = scaleX

          if (activeObjectProps) {
            const { item, objectType, position } = activeObjectProps
            let oppositePosition = ''

            if (
              position &&
              ((objectType === 'logos' && item.symmetricalLogos) ||
                (objectType === 'customPattern' &&
                  item.symmetricalCustomPattern))
            ) {
              if (position.indexOf('Right') > -1) {
                oppositePosition = position.replace('Right', 'Left')
              } else if (position.indexOf('Left') > -1) {
                oppositePosition = position.replace('Left', 'Right')
              }

              if (
                oppositePosition &&
                objects[objectType] &&
                objects[objectType][oppositePosition]
              ) {
                const oppositeObject = objects[objectType][oppositePosition]
                const oppositeObjectJSON =
                  objectsJSON[objectType][oppositePosition]

                if (oppositeObject && oppositeObjectJSON) {
                  const { left, top, angle, scaleX } = oppositeObject
                  oppositeObjectJSON.x = left
                  oppositeObjectJSON.y = top
                  oppositeObjectJSON.angle = angle
                  oppositeObjectJSON.scale = scaleX
                }
              }
            }
          }

          if (tooltip) {
            tooltip.style.display = 'none'
          }
        }
      })

      canvas.on('object:scaling', function (e: any) {
        const { activeObjectProps, objects } = canvasObj

        if (activeObjectProps) {
          const { item, objectType, position, width, containerWidth } =
            activeObjectProps
          const { scaleX } = e.target
          let oppositePosition = ''

          if (!canvasObj.tooltip) {
            canvasObj.tooltip = document.createElement('div')
            canvasObj.tooltip.className = 'canvas-tooltip'
            document.body.appendChild(canvasObj.tooltip)
          }

          canvasObj.tooltip.innerHTML =
            ((width * scaleX * 100) / containerWidth).toFixed(2) + '%'
          canvasObj.tooltip.style.left = e.e.clientX + 10 + 'px'
          canvasObj.tooltip.style.top = e.e.clientY + 10 + 'px'
          canvasObj.tooltip.style.display = 'block'

          if (
            position &&
            ((objectType === 'logos' && item.symmetricalLogos) ||
              (objectType === 'customPattern' && item.symmetricalCustomPattern))
          ) {
            if (position.indexOf('Right') > -1) {
              oppositePosition = position.replace('Right', 'Left')
            } else if (position.indexOf('Left') > -1) {
              oppositePosition = position.replace('Left', 'Right')
            }

            if (
              oppositePosition &&
              objects[objectType] &&
              objects[objectType][oppositePosition]
            ) {
              let oppositeObject = objects[objectType][oppositePosition]

              if (objectType === 'logos') {
                oppositeObject.scale(
                  (width * scaleX) /
                    Math.max(oppositeObject.width, oppositeObject.height),
                )
              } else {
                oppositeObject.scale(scaleX)
              }
            }
          }
        }
      })

      canvas.on('object:rotating', function (e: any) {
        const { activeObjectProps, objects } = canvasObj

        if (activeObjectProps) {
          const { item, objectType, position } = activeObjectProps
          const { angle } = e.target
          let oppositePosition = ''

          if (
            position &&
            ((objectType === 'logos' && item.symmetricalLogos) ||
              (objectType === 'customPattern' && item.symmetricalCustomPattern))
          ) {
            if (position.indexOf('Right') > -1) {
              oppositePosition = position.replace('Right', 'Left')
            } else if (position.indexOf('Left') > -1) {
              oppositePosition = position.replace('Left', 'Right')
            }

            if (
              oppositePosition &&
              objects[objectType] &&
              objects[objectType][oppositePosition]
            ) {
              let oppositeObject = objects[objectType][oppositePosition]

              oppositeObject.rotate(-angle)
            }
          }
        }
      })
    }
  }

  function renderDefaultAssets() {
    const { imageAssets } = canvasObj

    if (styleName) {
      renderTitle()
    }

    if (imageAssets['shadow'] && !prefix) {
      renderShadow()
    }

    renderAssets()
  }

  function renderTitle() {
    const { canvas } = canvasObj

    new FontFaceObserver('NikeFieldTypeFootball').load().then(() => {
      const obj = new fabric.Text(styleName, {
        fill: '#000',
        left: canvasProps.width * 0.5,
        top: 35,
        originX: 'center',
        originY: 'center',
        fontFamily: 'NikeFieldTypeFootball',
        fontSize: 70,
        textAlign: 'center',
        selectable: false,
      })

      canvas.add(obj)
    })
  }

  function renderShadow() {
    const {
      canvas,
      imageAssets,
      loadedImages: { shadow },
    } = canvasObj

    imageAssets.shadow.forEach((asset: any, i: number) => {
      const obj = new fabric.Image(shadow[i], {
        left: asset.x + canvasProps.x,
        top: asset.y + canvasProps.y,
        width: shadow[i].width,
        height: shadow[i].height,
        globalCompositeOperation: asset.globalComposition || 'source-over',
        selectable: false,
        evented: false,
      })

      canvas.add(obj)
    })
  }

  function renderAssets() {
    const {
      canvas,
      imageAssets,
      loadedImages: { assets },
      objects,
    } = canvasObj

    if (!objects.assets) {
      objects.assets = {}
    }
    const swoosh = itemList.find((item) => item.itemType === 'swoosh')
    const silicone = itemList.find((item) => item.itemType === 'silicone')

    imageAssets.assets.forEach((asset: any, i: number) => {
      if (
        !!asset.src &&
        !asset.overlay &&
        (!asset.brand || asset.brand === swoosh.brand)
      ) {
        const obj = new fabric.Image(assets[i], {
          left: asset.x + canvasProps.x,
          top: asset.y + canvasProps.y,
          width: assets[i].width,
          height: assets[i].height,
          globalCompositeOperation: asset.globalComposition || 'source-over',
          selectable: false,
          evented: !!asset.itemId,
          perPixelTargetFind: true,
          name: asset.itemId,
        })

        canvas.add(obj)
        objects.assets[i] = obj
        if (silicone && silicone.itemId === asset.itemId) {
          objects['silicone'] = obj
        }
      }
    })
  }

  function renderOverlayAssets() {
    const {
      canvas,
      imageAssets,
      loadedImages: { assets },
      objects,
    } = canvasObj

    if (!objects.assets) {
      objects.assets = {}
    }

    imageAssets.assets.forEach(function (asset: any, i: number) {
      if (asset.overlay) {
        if (objects.assets[i]) {
          canvas.remove(objects.assets[i])
          objects.assets[i] = null
        }

        const obj = new fabric.Image(assets[i], {
          left: asset.x + canvasProps.x,
          top: asset.y + canvasProps.y,
          width: assets[i].width,
          height: assets[i].height,
          globalCompositeOperation: asset.globalComposition || 'source-over',
          selectable: false,
          evented: !!asset.itemId,
          perPixelTargetFind: true,
          name: asset.itemId,
        })

        canvas.add(obj)
        objects.assets[i] = obj
      }
    })
  }

  function render3dLayer() {
    const {
      canvas,
      imageAssets,
      loadedImages: { '3dLayer': layer3d },
      objects,
    } = canvasObj

    if (!objects['3dLayer']) {
      objects['3dLayer'] = {}
    }

    imageAssets['3dLayer'].forEach(function (asset: any, i: number) {
      if (objects['3dLayer'][i]) {
        canvas.remove(objects['3dLayer'][i])
        objects['3dLayer'][i] = null
      }

      const obj = new fabric.Image(layer3d[i], {
        left: asset.x + canvasProps.x,
        top: asset.y + canvasProps.y,
        width: layer3d[i].width,
        height: layer3d[i].height,
        globalCompositeOperation: asset.globalComposition || 'source-over',
        selectable: false,
        evented: false,
      })

      canvas.add(obj)
      objects['3dLayer'][i] = obj
    })
  }

  function renderSwoosh(pattern: string) {
    const { canvas, imageAssets, loadedImages, objects, swoosh, imageColors } =
      canvasObj
    const previousPattern = swoosh.pattern
    const swooshImages = imageAssets[pattern]
    const loadedSwooshImages = loadedImages[pattern]

    if (!objects[pattern]) {
      objects[pattern] = {}
    }

    if (objects[previousPattern]) {
      Object.values(objects[previousPattern]).forEach((obj: any, i: number) => {
        canvas.remove(obj)
      })
      objects[previousPattern] = {}
      imageColors[previousPattern] = {}
    }
    swoosh.pattern = pattern

    if (swooshImages) {
      swooshImages.forEach(function (asset: any, i: number) {
        const obj = new fabric.Image(loadedSwooshImages[i], {
          left: asset.x + canvasProps.x,
          top: asset.y + canvasProps.y,
          width: loadedSwooshImages[i].width,
          height: loadedSwooshImages[i].height,
          globalCompositeOperation: asset.globalComposition || 'source-over',
          selectable: false,
          evented: !!asset.itemId,
          perPixelTargetFind: true,
          name: asset.itemId,
        })

        canvas.add(obj)
        objects[pattern][i] = obj
      })
    }
  }

  function renderPalm(material: string, pattern: string) {
    const { canvas, imageAssets, loadedImages, objects, palm, imageColors } =
      canvasObj
    const previousPattern = palm.pattern
    const palmImages = imageAssets[pattern]
    const loadedPalmImages = loadedImages[pattern]

    if (!objects[pattern]) {
      objects[pattern] = {}
    }

    if (objects[previousPattern]) {
      Object.values(objects[previousPattern]).forEach((obj: any, i: number) => {
        canvas.remove(obj)
      })
      objects[previousPattern] = {}
      imageColors[previousPattern] = {}
    }
    palm.material = material
    palm.pattern = pattern

    if (
      palmImages &&
      material === 'Magnagrip Silicone' &&
      pattern !== 'solid'
    ) {
      palmImages.forEach(function (asset: any, i: number) {
        const obj = new fabric.Image(loadedPalmImages[i], {
          left: asset.x + canvasProps.x,
          top: asset.y + canvasProps.y,
          width: loadedPalmImages[i].width,
          height: loadedPalmImages[i].height,
          globalCompositeOperation: asset.globalComposition || 'source-over',
          selectable: false,
          evented: false,
        })

        canvas.add(obj)
        objects[pattern][i] = obj
      })
    }
  }

  function renderSilicone(pattern: string) {
    const {
      imageAssets: { assets },
      imageColors,
      objects,
    } = canvasObj
    const siliconeObject = objects['silicone']
    const siliconeItem = itemList.find(
      (item: any) => item.itemType === 'silicone',
    )

    if (siliconeItem && siliconeObject) {
      const siliconeIndex = assets.findIndex(
        (asset: any) => asset.itemId === siliconeItem.itemId,
      )
      const siliconeAsset = assets[siliconeIndex]
      const parentAsset = assets.find(
        (asset: any) => asset.itemId === siliconeAsset.parentId,
      )
      const parentSelectedOption = getSelectedColorForAsset(parentAsset)
      const selectedOption = getSelectedColorForAsset(siliconeAsset)

      if (pattern === 'Clear' || pattern === 'Solid') {
        if (parentSelectedOption && parentSelectedOption.code) {
          siliconeObject.filters[0] = new fabric.Image.filters.BlendColor({
            color: parentSelectedOption.code,
            mode: 'multiply',
            alpha: pattern === 'Clear' ? 0.5 : 0.7,
          })
          siliconeObject.applyFilters()
          imageColors['assets'][siliconeIndex] = ''
        }
      } else {
        if (selectedOption && selectedOption.code) {
          siliconeObject.filters[0] = new fabric.Image.filters.BlendColor({
            color: selectedOption.code,
            mode: 'multiply',
            alpha: 1,
          })
          siliconeObject.applyFilters()
          imageColors['assets'][siliconeIndex] = ''
        }
      }
    }
  }

  function renderPalmCustomPattern(
    material: string,
    pattern: string,
    src: string,
  ) {
    const { canvas, loadedExternalImages, objects, customPattern } = canvasObj

    if (objects.customPattern) {
      canvas.remove(objects.customPattern)
      objects.customPattern = null
    }
    customPattern.material = material
    customPattern.pattern = pattern
    customPattern.src = src

    if (material === 'Magnagrip Silicone' && pattern === 'solid' && src) {
      const loadedCustomPattern = loadedExternalImages.customPattern[0]
      let placementCorrection: any = {},
        scaleCorrection: any = {},
        zIndex: any = {}

      if (viewType === 'Top of Hand') {
        placementCorrection = {
          SB6: 600,
          VJ6: 225,
          VJ7: 225,
          VK4: 240,
        }
        scaleCorrection = {
          SB6: -80,
        }
        zIndex = {
          SB6: 11,
          VJ6: 4,
          VJ7: 4,
          VK4: 5,
        }
      } else if (viewType === 'Palm of Hand') {
        scaleCorrection = {
          VK4: 10,
        }
      }

      const obj = new fabric.Image(loadedCustomPattern, {
        left: canvasProps.x,
        top: canvasProps.y + placementCorrection[productType] || 0,
        width: loadedCustomPattern.width,
        height: loadedCustomPattern.height,
        globalCompositeOperation: 'source-over',
        selectable: false,
        evented: false,
      })
      obj.scale(
        (canvas.width -
          canvasProps.x * 2 +
          (scaleCorrection[productType] || 0)) /
          loadedCustomPattern.width,
      )

      canvas.add(obj)
      if (zIndex[productType]) {
        obj.moveTo(zIndex[productType])
      }
      objects.customPattern = obj
    }
  }

  function renderPalmLogos() {
    const { canvas, objects } = canvasObj
    const palmItem = itemList.find((item) => item.itemType === 'palm')

    if (objects.logos) {
      Object.values(objects.logos).forEach((obj: any) => {
        canvas.remove(obj)
      })
    }
    objects.logos = {}

    if (palmItem && palmItem.material === 'Magnagrip Silicone') {
      palmItem.logos.forEach((logo: any, i: number) => {
        if (!!logo.selected && logo.position) {
          logo.position.forEach((position: any, positionIndex: number) =>
            drawPalmLogo(logo, i, positionIndex),
          )
        }
      })
    }
  }

  function drawPalmLogo(logo: any, logoIndex: number, positionIndex: number) {
    const { canvas, loadedExternalImages, objects } = canvasObj
    let position = logo.position[positionIndex]
    let path = ['config', 'logoPositions']
    let defaultPosition = {}
    let containerSize = 80

    switch (position.name) {
      case 'Right Small Cuff':
        path.push('Small Cuff', 'right')
        defaultPosition = {
          x: 140,
          y: 890,
          angle: 50,
        }
        containerSize = 80
        break
      case 'Left Small Cuff':
        path.push('Small Cuff', 'left')
        defaultPosition = {
          x: 1295,
          y: 900,
          angle: -45,
        }
        containerSize = 80
        break
      case 'Right Middle Palm':
        path.push('Middle Palm', 'right')
        defaultPosition = {
          x: 400,
          y: 675,
          angle: 45,
        }
        containerSize = 325
        break
      case 'Left Middle Palm':
        path.push('Middle Palm', 'left')
        defaultPosition = {
          x: 1060,
          y: 680,
          angle: -45,
        }
        containerSize = 325
        break
      case 'LockUp':
        path.push('LockUp')
        defaultPosition = {
          x: 725,
          y: 600,
        }
        containerSize = 700
        break
    }

    const ratio =
      containerSize /
      Math.max(
        loadedExternalImages.logos[logoIndex].width,
        loadedExternalImages.logos[logoIndex].height,
      )

    //set default values
    //when the logo is placed for the first time
    if (!position.x) {
      const {
        x,
        y,
        angle = 0,
      } = objectPath(productTypes[productType], path, defaultPosition)

      position = {
        ...position,
        ...{ x: x + canvasProps.x, y: y + canvasProps.y, angle: angle },
        scale: ratio,
      }
      logo.position[positionIndex] = position
    }

    const obj: any = new fabric.Image(loadedExternalImages.logos[logoIndex], {
      left: position.x,
      top: position.y,
      globalCompositeOperation: 'source-over',
      originX: 'center',
      originY: 'center',
      angle: position.angle,
      borderColor: 'white',
      borderDashArray: [16, 12],
      borderScaleFactor: 3,
      borderOpacityWhenMoving: 0.8,
      padding: 10,
      cornerStyle: 'circle',
      cornerSize: 24,
      cornerColor: '#0672e4',
      cornerStrokeColor: 'white',
      selectable: isAdmin && !prefix,
      evented: isAdmin && !prefix,
      perPixelTargetFind: true,
    })
    obj.scale(position.scale)
    obj.onSelect = function () {
      canvasObj.activeObject = logo.position[positionIndex]
    }
    obj.onDeselect = function () {
      canvasObj.activeObject = null
      if (onViewUpdate) onViewUpdate()
    }

    // prevent resizing on sides
    obj.setControlsVisibility({
      mb: false,
      ml: false,
      mr: false,
      mt: false,
    })

    canvas.add(obj)
    objects.logos[position.name] = obj
  }

  function renderCustomMessage() {
    const { canvas, objects } = canvasObj

    if (objects.customMessage) {
      Object.values(objects.customMessage).forEach((obj) => {
        canvas.remove(obj)
      })
    }
    objects.customMessage = {}

    if (customMessage.type === 'text') {
      let fontSize = 180
      if (customMessage.value) {
        if (customMessage.value.length > 16) {
          fontSize = 90
        } else if (customMessage.value.length > 12) {
          fontSize = 120
        } else if (customMessage.value.length > 8) {
          fontSize = 150
        }
      }
      new FontFaceObserver('NikeFieldTypeFootball').load().then(() => {
        const obj = new fabric.Text(customMessage.value || '', {
          fill: customMessage.color || '#000',
          left: 640 + canvasProps.x,
          top: 320 + canvasProps.y,
          originX: 'center',
          originY: 'center',
          fontFamily: 'NikeFieldTypeFootball',
          fontSize,
          textAlign: 'center',
          selectable: false,
          evented: false,
        })

        canvas.add(obj)
        objects.customMessage.text = obj
      })
    } else if (customMessage.type === 'logo') {
      loadExternalImage(customMessage.value).then((img: any) => {
        const widthRatio = 960 / img.width
        const heightRatio = 320 / img.height
        const ratio = Math.min(widthRatio, heightRatio)

        const obj = new fabric.Image(img, {
          left: 645 + canvasProps.x,
          top: 250 + canvasProps.y,
          originX: 'center',
          originY: 'center',
          globalCompositeOperation: 'source-over',
          selectable: false,
          evented: false,
        })
        obj.scale(ratio)

        canvas.add(obj)
        objects.customMessage.logo = obj
      })
    }
  }

  function renderDieCastCustomPattern() {
    const { canvas, objects, objectsJSON } = canvasObj
    const dieCastItem = itemList.find((item) => item.itemType === 'dieCast')

    if (objects.customPattern) {
      Object.values(objects.customPattern).forEach((obj: any) => {
        canvas.remove(obj)
      })
    }
    objects.customPattern = {}
    objectsJSON.customPattern = {}

    if (dieCastItem) {
      dieCastItem.customPattern.forEach((pattern: any, i: any) => {
        if (!!pattern.selected && pattern.position) {
          pattern.position.forEach((position: any, positionIndex: number) => {
            renderDieCastPattern(dieCastItem, pattern, i, positionIndex)
          })
        }
      })
    }
  }

  function renderDieCastPattern(
    dieCastItem: any,
    pattern: any,
    patternIndex: number,
    positionIndex: number,
  ) {
    const {
      canvas,
      imageAssets,
      loadedImages: { assets },
      loadedExternalImages,
      objects,
      objectsJSON,
    } = canvasObj
    let position = pattern.position[positionIndex]
    let defaultValues = { x: 0, y: 0 }
    let containerSize = 751

    switch (position.name) {
      case 'Right':
        const rightIndex = imageAssets.assets.findIndex(
          (asset: any) =>
            asset.itemId === 'dieCast' && asset.position === 'Right',
        )
        defaultValues = {
          x: assets[rightIndex].width * 0.5,
          y: assets[rightIndex].height * 0.5,
        }
        containerSize = 756
        break
      case 'Left':
        const leftIndex = imageAssets.assets.findIndex(
          (asset: any) =>
            asset.itemId === 'dieCast' && asset.position === 'Left',
        )
        defaultValues = {
          x: imageAssets.assets[leftIndex].x + assets[leftIndex].width * 0.5,
          y: imageAssets.assets[leftIndex].y + assets[leftIndex].height * 0.5,
        }
        containerSize = 770
        break
    }
    const maxImageSize = Math.max(
      loadedExternalImages.customPattern[patternIndex].width,
      loadedExternalImages.customPattern[patternIndex].height,
    )
    const ratio = containerSize / maxImageSize
    if (!position.x) {
      position = {
        ...position,
        ...{
          x: defaultValues.x + canvasProps.x,
          y: defaultValues.y + canvasProps.y,
          angle: 0,
        },
        scale: ratio,
      }
      pattern.position[positionIndex] = position
    }
    const obj: any = new fabric.Image(
      loadedExternalImages.customPattern[patternIndex],
      {
        left: position.x,
        top: position.y,
        angle: position.angle,
        originX: 'center',
        originY: 'center',
        centeredScaling: true,
        globalCompositeOperation: 'source-atop',
        selectable: isAdmin && !prefix,
        borderColor: '#0672E4',
        borderDashArray: [16, 12],
        borderScaleFactor: 3,
        borderOpacityWhenMoving: 0.8,
        cornerStyle: 'circle',
        cornerSize: 15,
        cornerColor: '#0672E4',
        cornerStrokeColor: 'white',
      },
    )
    obj.scale(position.scale)
    obj.onSelect = function () {
      canvasObj.activeObject = pattern.position[positionIndex]
      canvasObj.activeObjectProps = {
        item: dieCastItem,
        objectType: 'customPattern',
        position: position.name,
        width: maxImageSize,
        containerWidth: containerSize,
      }
    }
    obj.onDeselect = function () {
      canvasObj.activeObject = null
      canvasObj.activeObjectProps = null
      if (canvasObj.tooltip) {
        document.body.removeChild(canvasObj.tooltip)
        canvasObj.tooltip = null
      }

      if (onViewUpdate) onViewUpdate()
    }

    // prevent resizing on sides
    obj.setControlsVisibility({
      mb: false,
      ml: false,
      mr: false,
      mt: false,
    })

    canvas.add(obj)
    objects.customPattern[position.name] = obj
    objectsJSON.customPattern[position.name] = pattern.position[positionIndex]
  }

  function renderDieCastLogos() {
    const { canvas, objects, objectsJSON } = canvasObj
    const dieCastItem = itemList.find((item) => item.itemType === 'dieCast')

    if (objects.logos) {
      Object.values(objects.logos).forEach((obj: any) => {
        canvas.remove(obj)
      })
    }
    objects.logos = {}
    objectsJSON.logos = {}

    if (dieCastItem) {
      dieCastItem.logos.forEach((logo: any, i: number) => {
        if (!!logo.selected && logo.position) {
          logo.position.forEach((position: any, positionIndex: number) =>
            drawDieCastLogo(dieCastItem, logo, i, positionIndex),
          )
        }
      })
    }
  }

  function drawDieCastLogo(
    dieCastItem: any,
    logo: any,
    logoIndex: number,
    positionIndex: number,
  ) {
    const { canvas, loadedExternalImages, objects, objectsJSON } = canvasObj
    let position = logo.position[positionIndex]
    let path = ['config', 'dieCastLogoPositions']
    let defaultPosition = {}
    let containerSize = 80

    switch (position.name) {
      case 'Right Small Cuff':
        path.push('Small Cuff', 'right')
        defaultPosition = {
          x: 122,
          y: 922,
          angle: 45,
        }
        containerSize = 60
        break
      case 'Left Small Cuff':
        path.push('Small Cuff', 'left')
        defaultPosition = {
          x: 1258,
          y: 928,
          angle: -45,
        }
        containerSize = 60
        break
      case 'Right Middle Palm':
        path.push('Middle Palm', 'right')
        defaultPosition = {
          x: 400,
          y: 675,
          angle: 45,
        }
        containerSize = 110
        break
      case 'Left Middle Palm':
        path.push('Middle Palm', 'left')
        defaultPosition = {
          x: 978,
          y: 686,
          angle: -45,
        }
        containerSize = 110
        break
    }

    const maxImageSize = Math.max(
      loadedExternalImages.logos[logoIndex].width,
      loadedExternalImages.logos[logoIndex].height,
    )
    const ratio = containerSize / maxImageSize

    if (!position.x) {
      const {
        x,
        y,
        angle = 0,
      } = objectPath(productTypes[productType], path, defaultPosition)

      position = {
        ...position,
        ...{ x: x + canvasProps.x, y: y + canvasProps.y, angle: angle },
        scale: ratio,
      }
      logo.position[positionIndex] = position
    }

    const obj: any = new fabric.Image(loadedExternalImages.logos[logoIndex], {
      left: position.x,
      top: position.y,
      globalCompositeOperation: 'source-over',
      originX: 'center',
      originY: 'center',
      centeredScaling: true,
      angle: position.angle,
      selectable: isAdmin && !prefix,
      borderColor: 'white',
      borderDashArray: [16, 12],
      borderScaleFactor: 3,
      borderOpacityWhenMoving: 0.8,
      padding: 10,
      cornerStyle: 'circle',
      cornerSize: 24,
      cornerColor: '#0672e4',
      cornerStrokeColor: 'white',
    })
    obj.scale(position.scale)
    obj.onSelect = function () {
      canvasObj.activeObject = logo.position[positionIndex]
      canvasObj.activeObjectProps = {
        item: dieCastItem,
        objectType: 'logos',
        position: position.name,
        width: maxImageSize,
        containerWidth: containerSize,
      }
    }
    obj.onDeselect = function () {
      canvasObj.activeObject = null
      canvasObj.activeObjectProps = null
      if (canvasObj.tooltip) {
        document.body.removeChild(canvasObj.tooltip)
        canvasObj.tooltip = null
      }

      if (onViewUpdate) onViewUpdate()
    }

    // prevent resizing on sides
    obj.setControlsVisibility({
      mb: false,
      ml: false,
      mr: false,
      mt: false,
    })

    canvas.add(obj)
    objects.logos[position.name] = obj
    objectsJSON.logos[position.name] = logo.position[positionIndex]
  }

  function renderArtwork() {
    const { canvas, imageAssets, objects } = canvasObj

    if (objects.artwork) {
      Object.values(objects.artwork).forEach((obj) => {
        canvas.remove(obj)
      })
    }
    objects.artwork = {}

    itemList.forEach((item: any) => {
      if (item.itemType === 'embroidery') {
        const artworkItem = imageAssets.assets.find(
          (asset: any) => asset.itemId === item.itemId,
        )

        if (artworkItem) {
          const selectedOption = getSelectedColorForAsset(artworkItem)

          new FontFaceObserver('BrushScript').load().then(() => {
            const obj = new fabric.Text(item.value || '', {
              left: artworkItem.x + canvasProps.x,
              top: artworkItem.y + canvasProps.y,
              fill: (selectedOption && selectedOption.code) || '#000000',
              originX: 'center',
              originY: 'center',
              fontFamily: 'BrushScript',
              fontSize: artworkItem.fontSize,
              textAlign: 'center',
              angle: artworkItem.angle,
              selectable: false,
              evented: false,
            })

            canvas.add(obj)
            objects.artwork[item.itemId] = obj
          })
        }
      }
    })
  }

  function updateAssets() {
    const { canvas, imageAssets } = canvasObj
    let hasChangedAssets = false

    const swooshData: any = checkSwoosh()
    if (swooshData.isChanged) {
      renderSwoosh(swooshData.pattern)
      hasChangedAssets = true
    }

    const palmData: any = checkPalm()
    if (palmData.isChanged) {
      renderPalm(palmData.material, palmData.pattern)
      hasChangedAssets = true
    }

    if (hasChangedAssets) {
      if (imageAssets['3dLayer']) {
        render3dLayer()
      }

      renderOverlayAssets()
    }

    updateAssetColors()

    renderArtwork()

    const siliconeData: any = checkSilicone()
    if (siliconeData.isChanged) {
      renderSilicone(siliconeData.pattern)
    }

    if (viewType === 'Left Inside Cuff' || viewType === 'Right Inside Cuff') {
      renderCustomMessage()
    }

    canvas.requestRenderAll()
  }

  function updateAssetColors() {
    const { imageAssets, imageColors, objects, swoosh, palm } = canvasObj

    Object.keys(imageAssets).forEach((key: any) => {
      if (key === 'assets' || key === swoosh.pattern || key === palm.pattern) {
        let assets = imageAssets[key]

        if (!imageColors[key]) {
          imageColors[key] = {}
        }

        assets.forEach(function (asset: any, i: number) {
          if (asset.itemId && objects[key][i]) {
            const obj = objects[key][i]
            const selectedOption = getSelectedColorForAsset(asset)

            if (selectedOption && selectedOption.code) {
              if (
                selectedOption.code !== imageColors[key][i] ||
                asset.overlay
              ) {
                obj.filters[0] = new fabric.Image.filters.BlendColor({
                  color: selectedOption.code,
                  mode: asset.blendMode || 'multiply',
                })

                obj.applyFilters()
                imageColors[key][i] = selectedOption.code
              }
            } else {
              obj.filters[0] = false

              obj.applyFilters()
              imageColors[key][i] = null
            }
          }
        })
      }
    })
  }

  function updateExternalAssets() {
    const { canvas, imageAssets } = canvasObj
    let hasChangedAssets = false

    const customPatternData: any = checkPalmCustomPattern()
    if (customPatternData.isChanged) {
      renderPalmCustomPattern(
        customPatternData.material,
        customPatternData.pattern,
        customPatternData.src,
      )
      hasChangedAssets = true
    }

    if (viewType === 'Die Cast' || viewType === 'Small Die Cast') {
      renderDieCastCustomPattern()
      renderDieCastLogos()
      hasChangedAssets = true
    }

    if (hasChangedAssets) {
      if (imageAssets['3dLayer']) {
        render3dLayer()
      }

      renderOverlayAssets()

      updateAssetColors()

      const siliconeData: any = checkSilicone()
      if (siliconeData.isChanged) {
        renderSilicone(siliconeData.pattern)
      }
    }

    const logoData: any = checkPalmLogos()
    if (logoData.isChanged) {
      renderPalmLogos()
      hasChangedAssets = true
    }

    if (hasChangedAssets) {
      canvas.requestRenderAll()
    }

    if (onComplete) {
      onComplete()
    }
  }

  //get the selected color for related item
  function getSelectedColorForAsset(asset: any) {
    const relatedItem = itemList.find(
      (item: any) => item.itemId === asset.itemId,
    )
    let selectedOption = null
    if (relatedItem) {
      if (relatedItem.itemType === 'swoosh') {
        if (asset.secondary) {
          selectedOption = relatedItem.secondaryColors.find(
            (option: any) => !!option.selected,
          )
        } else {
          selectedOption = relatedItem.primaryColors.find(
            (option: any) => !!option.selected,
          )
        }
      } else if (relatedItem.itemType === 'palm') {
        if (relatedItem.material === 'Leather') {
          selectedOption = { code: '#bfc7c5' }
        } else if (relatedItem.material === 'Hydragrip') {
          selectedOption = { code: '#121519' }
        } else {
          if (asset.secondary) {
            selectedOption = relatedItem.secondaryColors.find(
              (option: any) => !!option.selected,
            )
          } else if (asset.tertiary) {
            selectedOption = relatedItem.tertiaryColors.find(
              (option: any) => !!option.selected,
            )
          } else {
            if (
              (relatedItem.pattern === 'Solid' ||
                relatedItem.pattern === 'Glitter') &&
              asset.position
            ) {
              selectedOption = relatedItem.primaryColors.find(
                (option: any) =>
                  !!option.selected &&
                  option.position &&
                  option.position.indexOf(asset.position) > -1,
              )
            } else {
              selectedOption = relatedItem.primaryColors.find(
                (option: any) => !!option.selected,
              )
            }
          }
        }
      } else if (relatedItem.itemType === 'dieCast') {
        selectedOption = relatedItem.primaryColors.find(
          (option: any) =>
            !!option.selected &&
            option.position &&
            option.position.indexOf(asset.position) > -1,
        )
      } else {
        selectedOption = relatedItem.options.find(
          (option: any) => !!option.selected,
        )

        if (!selectedOption && relatedItem.optionalColors) {
          selectedOption = relatedItem.optionalColors.find(
            (option: any) => !!option.selected,
          )
        }
      }
    }

    return selectedOption
  }

  function calculateCanvasDimensions() {
    if (canvasObj) {
      const { imageAssets } = canvasObj
      const { assets = {}, shadow = {} } = canvasObj.loadedImages
      let x = 0,
        y = 0,
        largestImageWidth = 0,
        largestImageHeight = 0,
        negativeOffsetX = 0,
        negativeOffsetY = 0

      Object.values(assets).forEach((image: any, index: number) => {
        const { x, y } = imageAssets.assets[index]
        if (image.width + x > largestImageWidth) {
          largestImageWidth = image.width + x
        }
        if (image.height + y > largestImageHeight) {
          largestImageHeight = image.height + y
        }

        if (negativeOffsetX > x) {
          negativeOffsetX = x
        }
        if (negativeOffsetY > y) {
          negativeOffsetY = y
        }
      })

      if (shadow && !prefix) {
        Object.values(shadow).forEach((image: any, index: number) => {
          const { x, y } = imageAssets.shadow[index]

          if (image.width + x > largestImageWidth) {
            largestImageWidth = image.width + x
          }
          if (image.height + y > largestImageHeight) {
            largestImageHeight = image.height + y
          }

          if (negativeOffsetX > x) {
            negativeOffsetX = x
          }
          if (negativeOffsetY > y) {
            negativeOffsetY = y
          }
        })
      }

      x = Math.abs(negativeOffsetX)
      y = Math.abs(negativeOffsetY)

      largestImageWidth = largestImageWidth + Math.abs(negativeOffsetX) + 2
      largestImageHeight = largestImageHeight + Math.abs(negativeOffsetY) + 2

      if (styleName) {
        y = y + 90
        largestImageHeight = largestImageHeight + 90
      }
      if (viewType === 'Die Cast' || viewType === 'Small Die Cast') {
        x = x + 150
        y = y + 50
        largestImageWidth = largestImageWidth + 300
        largestImageHeight = largestImageHeight + 100
      }

      setCanvasProps({
        x,
        y,
        width: largestImageWidth,
        height: largestImageHeight,
      })
    }
  }

  function checkSwoosh() {
    const { swoosh } = canvasObj
    const data: any = {}

    if (viewType === 'Top of Hand') {
      const swooshItem = itemList.find((item) => item.itemType === 'swoosh')

      if (swooshItem) {
        const swooshPattern = (
          swooshItem.brand +
          '-' +
          swooshItem.pattern
        ).toLowerCase()

        if (swoosh.pattern !== swooshPattern) {
          data.pattern = swooshPattern
          data.isChanged = true
        }
      }
    }

    return data
  }

  function checkSilicone() {
    const { silicone } = canvasObj
    const data: any = {}

    if (viewType === 'Top of Hand') {
      const siliconeItem = itemList.find((item) => item.itemType === 'silicone')

      if (siliconeItem) {
        if (silicone.pattern !== siliconeItem.pattern) {
          data.pattern = siliconeItem.pattern
          data.isChanged = true
        }
      }
    }

    return data
  }

  function checkPalm() {
    const { palm } = canvasObj
    const data: any = {}

    if (viewType === 'Top of Hand' || viewType === 'Palm of Hand') {
      const palmItem = itemList.find((item) => item.itemType === 'palm')

      if (palmItem) {
        const palmPattern = palmItem.pattern.toLowerCase().replace(/\s/g, '-')

        if (
          palm.material !== palmItem.material ||
          palm.pattern !== palmPattern
        ) {
          data.material = palmItem.material
          data.pattern = palmPattern
          data.isChanged = true
        }
      }
    }

    return data
  }

  function checkPalmCustomPattern() {
    const { customPattern } = canvasObj
    const data: any = {}

    if (viewType === 'Top of Hand' || viewType === 'Palm of Hand') {
      const palmItem = itemList.find((item) => item.itemType === 'palm')

      if (palmItem) {
        const palmPattern = palmItem.pattern.toLowerCase().replace(/\s/g, '-')
        const customPatternObj =
          (palmItem.customPattern &&
            palmItem.customPattern.find(
              (pattern: any) => !!pattern.selected,
            )) ||
          {}
        const customPatternSrc =
          (viewType === 'Top of Hand'
            ? customPatternObj.bohSrc
            : customPatternObj.src) || ''

        if (
          customPattern.material !== palmItem.material ||
          customPattern.pattern !== palmPattern ||
          customPattern.src !== customPatternSrc
        ) {
          data.material = palmItem.material
          data.pattern = palmPattern
          data.src = customPatternSrc
          data.isChanged = true
        }
      }
    }

    return data
  }

  function checkPalmLogos() {
    const { logos } = canvasObj
    const data: any = {}

    if (viewType === 'Palm of Hand') {
      const palmItem = itemList.find((item) => item.itemType === 'palm')

      if (palmItem && logos.material !== palmItem.material) {
        data.material = palmItem.material
        data.isChanged = true
      }
    }

    return data
  }

  return (
    <CanvasContainer style={styleProps}>
      <CanvasInnerContainer>
        {loadingImages === 'inprogress' && <Icon name="nikeLoading" />}
        <canvas
          id={
            (prefix ? prefix + '-' : '') +
            viewType.toLowerCase().replace(/\s/g, '-')
          }
          ref={canvasRef}
          style={{ maxWidth: '100%', maxHeight: '100%' }}></canvas>
      </CanvasInnerContainer>
    </CanvasContainer>
  )
}
