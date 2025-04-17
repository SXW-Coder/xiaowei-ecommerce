export const Title = 'MyStore'
export const MenuList = [
    {href: '/search',text:'検索'},
    {href: '/account',text:'アカウント'},
    {href: '/cart',text:'カート'},
]

export const NavList = [
    {
      title: 'Categories',
      list: [
        { label: 'アパレル', path: 'apparel' },
        { label: 'シューズ', path: 'shoes' },
        { label: 'スポーツボード', path: 'sportsboard' },
        { label: 'バックパック', path: 'backpack' },
        { label: 'サングラス', path: 'sunglasses' }
      ]
    },
    {
      title: 'Code',
      list: [
        { label: 'GitHub', path: 'https://github.com/YuukiHaven/my-ecommerce' },
        { label: 'Documentation', path: 'https://your-docs.com' }
      ]
    }
  ]

export const SortTitle = '並べ替え'
export const SortList = [
    {value:'latest',text:'最新入荷'},
    {value:'low',text:'価格:安い順から高い順'},
    {value:'high',text:'価格:高い順から安い順'}
]
export const ProductsTitle = 'すべての製品'