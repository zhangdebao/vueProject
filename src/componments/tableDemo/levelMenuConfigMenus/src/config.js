import CommonConfig from '../../../../assets/js/language/config'
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
        path: '/TableDemo'
      }
    },
    {
      index: 'SlotList',
      icon: 'icon-setUp',
      label: 'Slot列表',
      router: {
        path: '/NEConfigMenus/Slot'
      }
    },
    {
      index: 'system',
      icon: 'icon-setUp',
      label: '系统配置',
      collapse: false,
      childrens: [
        {
          index: 'NEAutomaticBackup',
          icon: 'icon-setUp',
          label: '备份时刻表',
          router: {
            path: '/NEConfigMenus/NEAutomaticBackup'
          }
        }
      ]
    }
  ]
}
// exports.json = json
export { json }
