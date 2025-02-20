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
  asset12,
  asset13,
  asset14,
  asset15,
  layer3d,
  layerShadow,
  nikeLogo,
  nikeLogoOutline,
  jordanLogo,
  jordanLogoOutline,
} from './assets'

const assets = [
  { src: asset1, x: 0, y: 0, itemId: 101 },
  { src: asset2, x: -2.1772, y: 0, itemId: 102, parentId: 101 },
  { src: asset3, x: 0, y: 584.814, itemId: 106 },
  { src: asset4, x: -0.174, y: 226.9308, itemId: 110, position: 'Right' },
  { src: asset5, x: 70.0444, y: 769.4352 },
  { src: asset6, x: 301.8444, y: 1171.2012 },
  { src: asset7, x: 202.5556, y: 852.9328, itemId: 111 },
  { src: asset8, x: 655.9564, y: 656.9648, itemId: 111 },
  { src: asset9, x: 328.3696, y: 868.3564, itemId: 107 },
  { src: asset10, x: 725.8452, y: 296.6148 },
  { src: asset11, x: 368.078, y: 1044.164, itemId: 108 },
  { src: asset12, x: 393.9736, y: 1083.1604, itemId: 109 },
  { src: asset13, x: 491.9304, y: 1051.7692, itemId: 109 },
  { src: asset14, x: 343.6488, y: 72.0012, itemId: 104 },
  { src: asset15, x: 8.8396, y: 67.5836, itemId: 105 },
]

const data = {
  assets: assets,
  'nike-solid': [
    { src: nikeLogoOutline, x: 284.3992, y: 686.706, itemId: 101 },
    { src: nikeLogo, x: 288.514, y: 690.8188, itemId: 103 },
  ],
  'jordan-solid': [
    { src: jordanLogoOutline, x: 319.2464, y: 785.2116, itemId: 101 },
    { src: jordanLogo, x: 324.5992, y: 790.5508, itemId: 103 },
  ],
  '3dLayer': [
    { src: layer3d, x: -180.71, y: -348.256, globalComposition: 'multiply' },
  ],
  shadow: [
    {
      src: layerShadow,
      x: 269.5029,
      y: 1403.109,
    },
  ],
}

export default data
