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
  layer3d,
  layerShadow,
  nikeLogo,
  nikeLogoOutline,
  nikeLogoGlitter,
  jordanLogo,
  jordanLogoOutline,
  jordanLogoGlitter,
} from './assets'

const assets = [
  { src: asset1, x: 267.2156, y: 914.3605, itemId: 107 },
  { src: asset2, x: 0, y: 0, itemId: 101 },
  { src: asset3, x: -0.668, y: -5.7065, brand: 'Nike' },
  { src: asset4, x: -0.668, y: -5.7065, brand: 'Jordan' },
  { src: asset5, x: 0.0003, y: 243.3051, itemId: 106, position: 'Right' },
  { src: asset6, x: 264.1075, y: 690.9731 },
  { src: asset7, x: 711.0504, y: 360.0264 },
  { src: asset8, x: 54.7405, y: -0.7511, itemId: 103 },
  { src: asset9, x: 376.0561, y: 329.9604, itemId: 104 },
  { src: asset10, x: 9.9008, y: 76.8005, itemId: 105 },
]

const data = {
  assets: assets,
  'nike-solid': [
    { src: nikeLogo, x: 477.9977, y: 980.6391, itemId: 102, primary: true },
  ],
  'nike-glitter': [
    { src: nikeLogo, x: 477.9977, y: 980.6391, itemId: 102, primary: true },
    {
      src: nikeLogoGlitter,
      x: 477.9977,
      y: 980.6391,
      globalComposition: 'lighter',
    },
  ],
  'nike-outline': [
    {
      src: nikeLogoOutline,
      x: 469.4926,
      y: 972.1341,
      itemId: 102,
      secondary: true,
    },
    { src: nikeLogo, x: 477.9977, y: 980.6391, itemId: 102, primary: true },
  ],
  'jordan-solid': [
    { src: jordanLogo, x: 470.7427, y: 1030.7863, itemId: 102, primary: true },
  ],
  'jordan-glitter': [
    { src: jordanLogo, x: 470.7427, y: 1030.7863, itemId: 102, primary: true },
    {
      src: jordanLogoGlitter,
      x: 470.7427,
      y: 1030.7863,
      globalComposition: 'lighter',
    },
  ],
  'jordan-outline': [
    {
      src: jordanLogoOutline,
      x: 465.0749,
      y: 1025.11705,
      itemId: 102,
      secondary: true,
    },
    { src: jordanLogo, x: 470.7427, y: 1030.7863, itemId: 102, primary: true },
  ],
  '3dLayer': [
    {
      src: layer3d,
      x: -180.6703,
      y: -349.9195,
      globalComposition: 'multiply',
    },
  ],
  shadow: [
    {
      src: layerShadow,
      x: 261.7389,
      y: 1393.9693,
    },
  ],
}

export default data
