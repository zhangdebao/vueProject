import CommonConfig from '../../../assets/js/language/config'
const LabelConfig = new CommonConfig()
if (!Object.is(LabelConfig.language, 'zh')) {
  LabelConfig.setLabelJson(require('./en-US').default)
} else {
  LabelConfig.setLabelJson(require('./zh-CN').default)
}
const json = {
  nav: [],
  menus: [
    {
      index: 'goBack',
      label: '返回上一级',
      router: {
        path: '/dashBoard'
      }
    },
    {
      index: 'user',
      icon: 'icon-setUp',
      label: '用户管理',
      router: {
        path: '/security/user'
      }
    },
    {
      index: 'historyAlarm',
      icon: 'icon-setUp',
      label: '用户组管理',
      router: {
        path: '/security/historyAlarm'
      }
    }
  ]
}
// exports.json = json
export { json }
