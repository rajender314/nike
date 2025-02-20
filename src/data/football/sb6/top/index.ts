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
  asset17,
  asset18,
  asset19,
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
  { src: asset1, x: 16.6297, y: 0 },
  { src: asset2, x: 336.1072, y: 837.0485, itemId: 104 },
  { src: asset3, x: 584.7473, y: 75.7282, itemId: 103 },
  { src: asset4, x: 17.9873, y: 0, itemId: 102 },
  { src: asset5, x: 334.6584, y: 1217.0779, itemId: 110 },
  { src: asset6, x: 350.6429, y: 1239.776, itemId: 111 },
  { src: asset7, x: 309.1358, y: 564.7169 },
  { src: asset8, x: 203.357, y: 864.6266, itemId: 108 },
  { src: asset9, x: 317.6864, y: 581.6685, itemId: 101 },
  { src: asset10, x: 317.6864, y: 581.6685 },
  { src: asset11, x: 0, y: 598.572, itemId: 106, position: 'Right' },
  { src: asset12, x: 442.1114, y: 1279.3768, itemId: 113 },
  { src: asset13, x: 442.8717, y: 1277.7697, itemId: 112 },
  { src: asset14, x: 539.529, y: 1313.2206 },
  { src: asset15, x: 111.4502, y: 36.0965, itemId: 102 },
  { src: asset16, x: 608.741, y: 111.2136, itemId: 103 },
  { src: asset18, x: 3.7473, y: 74.3841, itemId: 109 },
  { src: asset19, x: 3.7473, y: 74.3841 },
]

const data = {
  assets: assets,
  'nike-solid': [
    { src: asset17, x: 552.4888, y: 957.1739, itemId: 104 },
    { src: nikeLogoOutline, x: 384.9416, y: 889.9095, itemId: 104 },
    { src: nikeLogo, x: 390.268, y: 902.165, itemId: 105, primary: true },
  ],
  'nike-glitter': [
    { src: asset17, x: 552.4888, y: 957.1739, itemId: 104 },
    { src: nikeLogoOutline, x: 384.9416, y: 889.9095, itemId: 104 },
    { src: nikeLogo, x: 390.268, y: 902.165, itemId: 105, primary: true },
    {
      src: nikeLogoGlitter,
      x: 390.268,
      y: 902.165,
      globalComposition: 'lighter',
    },
  ],
  'jordan-solid': [
    { src: jordanLogoOutline, x: 403.5407, y: 922.9279, itemId: 104 },
    { src: jordanLogo, x: 412.0695, y: 931.4316, itemId: 105, primary: true },
  ],
  'jordan-glitter': [
    {
      src: jordanLogoOutline,
      x: 403.5407,
      y: 922.9279,
      itemId: 104,
    },
    { src: jordanLogo, x: 412.0695, y: 931.4316, itemId: 105, primary: true },
    {
      src: jordanLogoGlitter,
      x: 412.0695,
      y: 931.4316,
      globalComposition: 'lighter',
    },
  ],
  '3dLayer': [
    {
      src: layer3d,
      x: -177.3703,
      y: -340.24,
      globalComposition: 'multiply',
    },
  ],
  shadow: [
    {
      src: layerShadow,
      x: 269.5029,
      y: 1433.109,
    },
  ],
}

export default data
