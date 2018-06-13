// [index 必须]
// [label 文本]
// [icon 图标]
// [path 路由路径]
const data = [
  {
    index: 'dashBoard',
    label: 'DashBoard',
    icon: 'icon-dashboard',
    router: {
      path: '/dashBoard'
    }
  },
  {
    index: 'TableDemo',
    icon: 'icon-NE',
    label: '表格示例',
    router: {
      path: '/TableDemo'
    }
  },
  {
    index: 'security',
    icon: 'icon-Security',
    label: '安全管理',
    collapse: true,
    childrens: [
      {
        index: 'User',
        icon: 'icon-Security',
        label: '用户管理',
        router: {
          path: '/user'
        }
      }
    ]
  },
  {
    index: 'log',
    icon: 'icon-Log',
    label: '日志管理',
    router: {
      path: '/log'
    }
  }
]
exports.default = data
