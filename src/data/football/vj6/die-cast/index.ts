import { asset1, asset2, asset3, asset4 } from './assets'

const assets = [
  { src: asset1, x: 0, y: 0, itemId: 'dieCast', position: 'Right' },
  { src: asset2, x: 855.2532, y: 0, itemId: 'dieCast', position: 'Left' },
  { src: asset3, x: 0, y: 0, overlay: true },
  { src: asset4, x: 855.2532, y: 0, overlay: true },
]

const data = {
  assets: assets,
}

export default data
