import {
  asset1,
  asset2,
  asset3,
  asset4,
  asset5,
  asset6,
  asset7,
  asset8,
  asset9,
  asset10,
  asset11,
  nikeLogo,
  nikeLogoShadow,
  nikeLogoOutline,
  nikeLogoOutlineShadow,
  web1,
  web2,
  web3,
} from './assets'

const assets = [
  { src: asset1, x: 0, y: 0, itemId: 101 },
  { src: asset2, x: 62.4642, y: 55.6896, itemId: 102 },
  { src: asset3, x: 62.9277, y: 165.7575, itemId: 103 },
  { src: asset4, x: 118.0203, y: 519.5571, itemId: 105 },
  { src: asset5, x: 150.6, y: 156.1725, itemId: 101 },
  { src: asset6, x: 0, y: 0 },
  { src: asset7, x: 48.9648, y: 369.6732, itemId: 111 },
  { src: asset8, x: 23.8968, y: -2.5515, itemId: 110 },
  { src: asset9, x: 41.8029, y: 511.3089, itemId: 109 },
  { src: asset10, x: -4.9035, y: 7.155, itemId: 108 },
  { src: asset11, x: 10.0743, y: 119.1483, itemId: 112 },
  {
    src: nikeLogoOutline,
    x: 298.884,
    y: 576.7983,
    itemId: 107,
  },
  { src: nikeLogo, x: 304.1133, y: 581.6082, itemId: 106 },
  {
    src: nikeLogoOutlineShadow,
    x: 304.1133,
    y: 581.6082,
    globalComposition: 'multiply',
  },
  {
    src: nikeLogoShadow,
    x: 304.3593,
    y: 584.9979,
    globalComposition: 'multiply',
  },
  { src: web1, x: 370.6107, y: 15.5319, itemId: 101 },
  { src: web2, x: 395.3856, y: 23.3952, itemId: 111 },
  { src: web3, x: 377.7417, y: 15.5319, itemId: 108 },
  { itemId: 113, x: 535, y: 560, fontSize: 40, angle: -64 },
  { itemId: 114, x: 48, y: 310, fontSize: 28, angle: 90 },
]

const data = {
  assets: assets,
}

export default data
