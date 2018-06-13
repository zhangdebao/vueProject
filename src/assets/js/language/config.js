import Tools from '../tools/app'
const language = Tools.defalut.getBrowserLanguage()
let commonJson = {}
if (!Object.is(language, 'zh')) {
  commonJson = require('./en-US').default
} else {
  commonJson = require('./zh-CN').default
}
/**
 * [alarmColor 追加告警颜色]
 */
commonJson.alarmColor = ['#ff7e7e', '#4d8ff3', '#48d5b2', '#ff79a2', '#59c7f9', '#6ee899', '#ffc36d', '#e6ebed', '#6e7074', '#546570', '#c4ccd3']
/**
 * [CommonConfig 创建对象]
 * @type {[type]}
 */
let CommonConfig = class {
  constructor () {
    this.commonJson = commonJson
    this.language = language
  }
  setLabelJson (labelJson) {
    this.labelJson = labelJson
  }
  setLabelValue (key) {
    if (this.labelJson[key]) {
      return this.labelJson[key]
    } else if (this.commonJson[key]) {
      return this.commonJson[key]
    } else {
      return ''
    }
  }
}
export default CommonConfig
