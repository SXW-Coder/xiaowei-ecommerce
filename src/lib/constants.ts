export const Title = 'MyStore'
export const MenuList = [
    {href: '/search',text:'検索'},
    {href: '/account',text:'アカウント'},
    {href: '/cart',text:'カート'},
]

export const NavList = [
    {
      title: 'カテゴリー',
      list: [
        { label: 'アパレル', path: 'apparel' },
        { label: 'シューズ', path: 'shoes' },
        { label: 'スポーツボード', path: 'sportsboard' },
        { label: 'バックパック', path: 'backpack' },
        { label: 'サングラス', path: 'sunglasses' }
      ]
    },
    {
      title: 'コード',
      list: [
        { label: 'GitHub', path: 'https://github.com/SXW-Coder/xiaowei-ecommerce' },
        { label: 'ドキュメント', path: 'https://github.com/SXW-Coder/xiaowei-ecommerce/blob/main/README.md' }
      ]
    },
    {
        title: '© 2025 xiaoweishop',
        list: [
          { label: 'プライバシーポリシー', path: 'https://github.com/SXW-Coder/xiaowei-ecommerce/blob/main/policy.md' },
          { label: '利用規約', path: 'https://github.com/SXW-Coder/xiaowei-ecommerce/blob/main/terms.md' }
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