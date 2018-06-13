const Tools = {
  constructor () {
  },
  /**
   * [getBrowser 获取浏览器种类]
   * @return {[type]} [类型]
   */
  getBrowser () {
    const browserArr = [
      { key: `Maxthon`, value: `傲游` },
      { key: `Firefox`, value: `Firefox` },
      { key: `Safari`, value: `Safari` },
      { key: `Camino`, value: `Camino` },
      { key: `Gecko`, value: `Gecko` },
      { key: `Chrome`, value: `Chrome` },
      { key: `MSIE`, value: `IE8` },
      { key: `Trident`, value: `IE11` },
      { key: `Edge`, value: `Edge` }
    ]
    const agent = navigator.userAgent
    let item = null
    for (let entries of browserArr) {
      if (Object.is(agent.indexOf(entries.key), -1)) {
        item = entries.value
      }
    }
    return item
  },
  /**
   * [transformArraytoSelectArray 转换数组]
   * @param  {Array}  [array=[]]] [旧的数组]
   * @return {[type]}             [新的数组]
   */
  transformArraytoSelectArray (array = []) {
    let _array = array.map((key) => {
      return {
        label: key,
        value: key
      }
    })

    return _array
  },
  /**
   * [getBrowserLanguage 获取浏览器默认的语言]
   * @return {[type]} [description]
   */
  getBrowserLanguage () {
    let language = navigator.language || navigator.userLanguage // 常规浏览器语言和IE浏览器
    language = language.substr(0, 2)
    return language
  },
  /**
   * [saveTableLocalstorage 本地存储状态]
   * @param  {[type]} localKey [description]
   * @return {[type]}          [description]
   */
  saveTableLocalstorageStatus ({key = '', value}) {
    window.localStorage.removeItem(key)
    const entries = Object.entries(value)
    const params = {}
    for (let item of entries) {
      if (Object.is(typeof item[1], 'object')) {
        params[item[0]] = item[1].propShow
      } else {
        params[item[0]] = item[1]
      }
    }
    window.localStorage.setItem(key, JSON.stringify(params))
  },
  /**
   * [removeTableLocalstorage 删除本地存储]
   * @param  {String} [key=''] [description]
   * @return {[type]}          [description]
   */
  removeTableLocalstorageStauts (key = '') {
    window.localStorage.removeItem(key)
  },
  /**
   * [getTableLocalstorage 获取本地存储]
   * @param  {String} [key=''] [description]
   * @return {[type]}          [description]
   */
  getTableLocalstorageStatus (key = '') {
    return JSON.parse(window.localStorage.getItem(key))
  },
  /**
   * [hexTransformationDecArray 十六进制颜色转换成十进制数组]
   * @param  {[type]} color [description]
   * @return {[type]}       [description]
   */
  hexTransformationDecArray (color) {
    const array = []
    if (Object.is(color.length, 4)) {
      array.push(parseInt('0x' + color.slice(1, 2)))
      array.push(parseInt('0x' + color.slice(2, 3)))
      array.push(parseInt('0x' + color.slice(3, 4)))
    } else if (Object.is(color.length, 7)) {
      array.push(parseInt('0x' + color.slice(1, 3)))
      array.push(parseInt('0x' + color.slice(3, 5)))
      array.push(parseInt('0x' + color.slice(5, 7)))
    } else {
      array.push(255, 255, 255)
    }
    return array
  }
}
exports.defalut = Tools
