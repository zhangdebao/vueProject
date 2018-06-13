import CommonConfig from '../../../assets/js/language/config'
const LabelConfig = new CommonConfig()
if (!Object.is(LabelConfig.language, 'zh')) {
  LabelConfig.setLabelJson(require('./en-US').default)
} else {
  LabelConfig.setLabelJson(require('./zh-CN').default)
}
const json = {
  nav: [
    {
      router: {
        path: '/'
      },
      label: LabelConfig.setLabelValue('Main')
    }
  ],
  alarmTitle: 'echarts柱状图',
  networkTitle: 'Websocket实时',
  serverTitle: 'echarts饼状图',
  progressTitle: 'Progress'
}
// exports.json = json
export { json }
