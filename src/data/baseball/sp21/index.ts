import front from './front'
import back from './back'

const views = [
  {
    id: 'front',
    name: 'Front View',
    iconName: 'topOfHand',
    productAssets: front,
    productItems: [],
    reRender: 0,
  },
  {
    id: 'back',
    name: 'Back View',
    iconName: 'palmOfHand',
    productAssets: back,
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
    views: [views[0], views[1]],
    styleProps: [
      { width: '50%', height: '100%' },
      { width: '50%', height: '100%' },
    ],
    aspectRatio: {
      x: 2,
      y: 1,
    },
  },
  {
    id: 2,
    name: 'Front View',
    prefix: '',
    iconName: 'topOfHand',
    views: [views[0]],
  },
  {
    id: 3,
    name: 'Back View',
    prefix: '',
    iconName: 'palmOfHand',
    views: [views[1]],
  },
]

const config = {
  views,
  tabs,
}

const data = {
  config,
  front,
  back,
}

export default data
