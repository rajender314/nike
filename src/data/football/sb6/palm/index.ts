import { Asset } from 'types'
import {
  asset1,
  asset2,
  asset3,
  asset4,
  asset5,
  asset6,
  layer3d,
  layerShadow,
  glitter,
  paintSwirl1,
  paintSwirl2,
  paintSwirl3,
  jordan1Sole,
} from './assets'

const assets: Asset[] = [
  { src: asset1, x: 0, y: 0, itemId: 106, position: 'Right' },
  { src: asset2, x: 452.5549, y: 0, itemId: 106, position: 'Left' },
  { src: asset3, x: 387.9508, y: 6.6192, overlay: true },
  { src: asset4, x: -6.5019, y: 559.807, itemId: 110, overlay: true },
  { src: asset5, x: -7.0864, y: 704.8012, itemId: 111, overlay: true },
  { src: asset6, x: 15.0589, y: 705.4575, overlay: true },
]

const data = {
  assets: assets,
  glitter: [{ src: glitter, x: 0, y: 0, globalComposition: 'lighter' }],
  'paint-swirl': [
    { src: paintSwirl1, x: 0, y: 0, itemId: 106, primary: true },
    { src: paintSwirl2, x: 0, y: 0, itemId: 106, secondary: true },
    { src: paintSwirl3, x: 0, y: 0, itemId: 106, tertiary: true },
  ],
  'jordan-1-sole': [
    {
      src: jordan1Sole,
      x: 0,
      y: 0,
      itemId: 106,
      globalComposition: 'multiply',
    },
  ],
  '3dLayer': [
    { src: layer3d, x: -1.8171, y: -4.5425, globalComposition: 'multiply' },
  ],
  shadow: [{ src: layerShadow, x: 19.548, y: 1036.8365 }],
}

export default data
