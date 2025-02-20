import top from './top'
import palm from './palm'
import leftCuff from './left-cuff'
import rightCuff from './right-cuff'
import dieCast from './die-cast'
import smallDieCast from './die-cast-small'

const views = [
  {
    id: 'top',
    name: 'Top of Hand',
    iconName: 'topOfHand',
    productAssets: top,
    productItems: [],
    reRender: 0,
  },
  {
    id: 'palm',
    name: 'Palm of Hand',
    iconName: 'palmOfHand',
    productAssets: palm,
    productItems: [],
    reRender: 0,
  },
  {
    id: 'leftCuff',
    name: 'Left Inside Cuff',
    iconName: 'leftInsideCuff',
    styleName: 'INSIDE CUFF LEFT',
    productAssets: leftCuff,
    productItems: [],
    reRender: 0,
  },
  {
    id: 'rightCuff',
    name: 'Right Inside Cuff',
    iconName: 'rightInsideCuff',
    styleName: 'INSIDE CUFF RIGHT',
    productAssets: rightCuff,
    productItems: [],
    reRender: 0,
  },
  {
    id: 'dieCast',
    name: 'Die Cast',
    iconName: 'diecast',
    productAssets: dieCast,
    productItems: [],
    reRender: 0,
  },
  {
    id: 'smallDieCast',
    name: 'Small Die Cast',
    iconName: 'diecast',
    productAssets: smallDieCast,
    productItems: [],
    reRender: 0,
  },
]

const tabs = [
  {
    id: 1,
    name: 'Preview All',
    prefix: 'preview',
    iconName: '',
    views: [views[0], views[1], views[2], views[3]],
    styleProps: [
      { width: '42%', height: '70%' },
      { width: '58%', height: '70%' },
      { width: '42%', height: '30%' },
      { width: '42%', height: '30%', marginLeft: '8%' },
    ],
    aspectRatio: {
      x: 6,
      y: 5,
    },
  },
  {
    id: 2,
    name: 'Top of Hand',
    prefix: '',
    iconName: 'topOfHand',
    views: [views[0]],
  },
  {
    id: 3,
    name: 'Palm of Hand',
    prefix: '',
    iconName: 'palmOfHand',
    views: [views[1]],
  },
  {
    id: 4,
    name: 'Inside Cuff',
    prefix: '',
    iconName: 'leftInsideCuff',
    views: [views[2], views[3]],
    styleProps: [
      {
        maxWidth: '500px',
        width: '50%',
        height: '50%',
        float: 'none',
        margin: '0 auto',
      },
      {
        maxWidth: '500px',
        width: '50%',
        height: '50%',
        float: 'none',
        margin: '0 auto',
      },
    ],
  },
  {
    id: 5,
    name: 'Die Cast',
    prefix: '',
    iconName: 'diecast',
    views: [views[4], views[5]],
    styleProps: [{}, { display: 'none' }],
  },
]

const config = {
  views,
  tabs,
  brands: [
    {
      name: 'Nike',
      value: 'Nike',
      icon: 'nike',
      patterns: [{ name: 'Solid', value: 'Solid' }],
    },
    {
      name: 'Jordan',
      value: 'Jordan',
      icon: 'jordan',
      patterns: [{ name: 'Solid', value: 'Solid' }],
    },
  ],
  palmMaterials: [
    {
      name: 'Leather',
      value: 'Leather',
    },
    {
      name: 'Hydragrip',
      value: 'Hydragrip',
    },
    {
      name: 'Magnagrip Silicone',
      value: 'Magnagrip Silicone',
      patterns: {
        Nike: [
          { name: 'Solid', value: 'Solid' },
          { name: 'Glitter', value: 'Glitter' },
          { name: 'Hypnotic', value: 'Hypnotic' },
        ],
        Jordan: [
          { name: 'Solid', value: 'Solid' },
          { name: 'Glitter', value: 'Glitter' },
          { name: 'Hypnotic', value: 'Hypnotic' },
          { name: 'Jordan 1 Sole', value: 'Jordan 1 Sole' },
        ],
      },
      logoPlacements: [
        { name: 'Right Small Cuff', value: 'Right Small Cuff' },
        { name: 'Left Small Cuff', value: 'Left Small Cuff' },
        { name: 'Right Middle Palm', value: 'Right Middle Palm' },
        { name: 'Left Middle Palm', value: 'Left Middle Palm' },
        { name: 'LockUp', value: 'LockUp' },
      ],
    },
  ],
  siliconeTypes: [
    {
      name: 'Clear',
      value: 'Clear',
    },
    {
      name: 'Solid',
      value: 'Solid',
    },
    {
      name: 'Contrast Color',
      value: 'Contrast',
    },
  ],
  logoPositions: {
    'Small Cuff': {
      right: {
        x: 140,
        y: 890,
        angle: 50,
      },
      left: {
        x: 1295,
        y: 900,
        angle: -45,
      },
    },
    'Middle Palm': {
      right: {
        x: 400,
        y: 675,
        angle: 45,
      },
      left: {
        x: 1060,
        y: 680,
        angle: -45,
      },
    },
    LockUp: {
      x: 725,
      y: 600,
    },
  },
  dieCastLogoPositions: {
    'Small Cuff': {
      right: {
        x: 200,
        y: 602,
        angle: 45,
      },
      left: {
        x: 1379,
        y: 602,
        angle: -45,
      },
    },
    'Middle Palm': {
      right: {
        x: 304,
        y: 411,
        angle: 45,
      },
      left: {
        x: 1274,
        y: 390,
        angle: -45,
      },
    },
  },
}

const data = {
  config,
  top,
  palm,
  leftCuff,
  rightCuff,
  dieCast,
  smallDieCast,
}

export default data
