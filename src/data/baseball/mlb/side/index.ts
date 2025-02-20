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
  nikeLogo,
  nikeLogoShadow,
  nikeLogoOutline,
  nikeLogoOutlineShadow,
  web1,
  web2,
  web3,
} from './assets'

const assets: any = [
  {
    src: asset1,
    x: 339.3852,
    y: 44.3016,
  },
  {
    src: asset2,
    x: 0,
    y: 0,
    itemId: 101,
  },
  {
    src: asset3,
    x: 58.0908,
    y: 40.8609,
    itemId: 110,
  },
  {
    src: asset4,
    x: 229.2771,
    y: 39.4449,
    itemId: 101,
  },
  {
    src: asset5,
    x: 9.5916,
    y: 55.6644,
    itemId: 111,
  },
  {
    src: asset6,
    x: -5.6739,
    y: 87.1614,
    itemId: 109,
  },
  {
    src: asset7,
    x: 186.8217,
    y: 107.4123,
    itemId: 105,
  },
  {
    src: asset8,
    x: 111.8115,
    y: 364.6824,
    itemId: 112,
  },
  { src: nikeLogoOutline, x: 26.2758, y: 220.281, itemId: 107 },
  { src: nikeLogo, x: 27.4377, y: 227.2914, itemId: 106 },
  {
    src: nikeLogoOutlineShadow,
    x: 28.0137,
    y: 224.949,
    globalComposition: 'multiply',
  },
  {
    src: nikeLogoShadow,
    x: 27.4377,
    y: 254.2956,
    globalComposition: 'multiply',
  },
  {
    src: asset9,
    x: 207.4761,
    y: 257.4861,
    itemId: 108,
  },
  { src: web1, x: 369.2796, y: 22.0638, itemId: 101 },
  { src: web2, x: 399.7551, y: 55.4124, itemId: 111 },
  { src: web3, x: 360.7161, y: 45.7017, itemId: 108 },
  { itemId: 113, x: 345, y: 385, fontSize: 62, angle: 12 },
]

const data = {
  assets: assets,
}

export default data
