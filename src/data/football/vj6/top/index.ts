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
  asset16,
  layer3d,
  layerShadow,
  nikeLogo,
  nikeLogoTonal,
  nikeLogoGlitter,
  jordanLogo,
  jordanLogoOutline,
  jordanLogoGlitter,
} from './assets'

const assets = [
  { src: asset1, x: 0, y: 0, itemId: 101 },
  { src: asset2, x: -1.5647, y: -2.133 },
  { src: asset3, x: 1.4377, y: 586.8131, itemId: 107 },
  { src: asset4, x: 3.0874, y: 229.6033, itemId: 106, position: 'Right' },
  { src: asset5, x: 200.169, y: 1070.3386, itemId: 107 },
  { src: asset6, x: 730.6328, y: 1043.0802 },
  { src: asset7, x: 97.7496, y: 818.858 },
  { src: asset8, x: 217.3674, y: 640.5518, itemId: 112 },
  { src: asset9, x: 345.2388, y: 69.4067, itemId: 104 },
  { src: asset10, x: 643.5955, y: 73.7343, itemId: 103 },
  { src: asset11, x: 244.2528, y: -2.133, itemId: 102 },
  { src: asset12, x: 333.5045, y: 1025.1401, itemId: 108 },
  { src: asset13, x: 488.9865, y: 1118.2491, itemId: 109 },
  { src: asset14, x: 500.887, y: 1142.434, itemId: 110 },
  { src: asset15, x: 9.9646, y: 69.4067, itemId: 114 },
  { src: asset16, x: 789.2437, y: 295.9339 },
]

const data = {
  assets: assets,
  'nike-solid': [
    { src: nikeLogo, x: 421.5016, y: 694.1574, itemId: 105, primary: true },
    { src: nikeLogoTonal, x: 426.0554, y: 698.5625, itemId: 101 },
  ],
  'nike-glitter': [
    { src: nikeLogo, x: 421.5016, y: 694.1574, itemId: 105, primary: true },
    {
      src: nikeLogoGlitter,
      x: 421.5016,
      y: 694.1574,
      globalComposition: 'lighter',
    },
    { src: nikeLogoTonal, x: 426.0554, y: 698.5625, itemId: 101 },
  ],
  'nike-contrast': [
    { src: nikeLogo, x: 421.5016, y: 694.1574, itemId: 105, primary: true },
    {
      src: nikeLogoTonal,
      x: 426.0554,
      y: 698.5625,
      itemId: 105,
      secondary: true,
    },
  ],
  'jordan-solid': [
    { src: jordanLogo, x: 339.3203, y: 731.7982, itemId: 105, primary: true },
  ],
  'jordan-glitter': [
    { src: jordanLogo, x: 339.3203, y: 731.7982, itemId: 105, primary: true },
    {
      src: jordanLogoGlitter,
      x: 339.3203,
      y: 731.7982,
      globalComposition: 'lighter',
    },
  ],
  'jordan-outline': [
    {
      src: jordanLogoOutline,
      x: 330.82095,
      y: 723.2942,
      itemId: 105,
      secondary: true,
    },
    { src: jordanLogo, x: 339.3203, y: 731.7982, itemId: 105, primary: true },
  ],
  '3dLayer': [
    { src: layer3d, x: -178.8001, y: -345.2433, globalComposition: 'multiply' },
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
