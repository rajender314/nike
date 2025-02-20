import side from './side'
import back from './back'
import top from './top'
import palm from './palm'

const views = [
  {
    id: 'side',
    name: 'Side of Hand',
    iconName: 'topOfHand',
    productAssets: side,
    productItems: [],
    reRender: 0,
  },
  {
    id: 'back',
    name: 'Back of Hand',
    iconName: 'palmOfHand',
    productAssets: back,
    productItems: [],
    reRender: 0,
  },
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
]

const tabs = [
  {
    id: 1,
    name: 'Preview All',
    prefix: 'preview',
    iconName: '',
    views: [views[0], views[1], views[2], views[3]],
    styleProps: [
      { width: '50%', height: '45%' },
      { width: '50%', height: '45%' },
      { width: '50%', height: '55%' },
      { width: '50%', height: '55%' },
    ],
    aspectRatio: {
      x: 6.5,
      y: 5,
    },
  },
  {
    id: 2,
    name: 'Side of Hand',
    prefix: '',
    iconName: 'topOfHand',
    iconStyles: 'transform: rotate(90deg)',
    views: [views[0]],
  },
  {
    id: 3,
    name: 'Back of Hand',
    prefix: '',
    iconName: 'topOfHand',
    iconStyles: 'transform: rotate(-90deg)',
    views: [views[1]],
  },
  {
    id: 4,
    name: 'Top of Hand',
    prefix: '',
    iconName: 'topOfHand',
    views: [views[2]],
  },
  {
    id: 5,
    name: 'Palm of Hand',
    prefix: '',
    iconName: 'palmOfHand',
    views: [views[3]],
  },
]

const config = {
  views,
  tabs,
}

const data = {
  config,
  side,
  back,
  top,
  palm,
}

export default data
