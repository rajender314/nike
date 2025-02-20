import { Asset } from 'types'
import {
  asset1,
  asset2,
  asset3,
  asset4,
  layer3d,
  layerShadow,
  glitter,
  hypnotic,
  jordan1Sole,
} from './assets'

const assets: Asset[] = [
  { src: asset1, x: 0, y: 0, itemId: 106, position: 'Right' },
  { src: asset2, x: 452.5549, y: 0, itemId: 106, position: 'Left' },
  {
    src: asset3,
    x: 387.9508,
    y: 6.6192,
    itemId: 111,
    overlay: true,
    blendMode: 'tint',
  },
  { src: asset4, x: -7.98, y: 731.7091, itemId: 108, overlay: true },
]

const data = {
  assets: assets,
  glitter: [{ src: glitter, x: 0, y: 0, globalComposition: 'lighter' }],
  hypnotic: [{ src: hypnotic, x: 0, y: 0 }],
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
    { src: layer3d, x: -11.5023, y: -4.5425, globalComposition: 'multiply' },
  ],
  shadow: [{ src: layerShadow, x: 19.548, y: 1036.8365 }],
}

export default data
