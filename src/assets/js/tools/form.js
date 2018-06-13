const Dates = require('./date.js')
const Form = {
  /**
   * [resetItemArray 重置itemArray]
   * @param  {Object} [params={}}] [params]
   * @return {[type]}                 [重置之后的params]
   */
  resetItemArray (_params = {}) {
    const params = _params
    const keys = Object.keys(params)
    for (let key of keys) {
      if (params[key] && (typeof (params[key].value) !== 'undefined') && (typeof (params[key].defaultValue) !== 'undefined')) {
        params[key].value = params[key].defaultValue
      }
    }
    return params
  },
  /**
   * [setFormPropertyValue 为表单属性赋值]
   * @param {Object} [params={}] [赋值的对象]
   * @param {Object} [data={}}]     [数据源]
   */
  setFormPropertyValue ({params = {}, data = {}}) {
    // const keys = Object.keys(params)
    const entries = Object.entries(params)
    for (let entrie of entries) {
      if (entrie[0] && data[entrie[0]]) {
        entrie[1].value = data[entrie[0]]
      }
    }
  },
  /**
   * [getFormParamsObject 获取表单的提交参数]
   * @param  {Object} [Oform={}}] [description]
   * @return {[type]}             [返回的对象]
   */
  getFormParamsObject (params = {}) {
    const _params = {}
    const keys = Object.keys(params)
    for (let key of keys) {
      if (Array.isArray(params[key].value)) {
        _params[key] = params[key].value.join()
      } else if (params[key].value instanceof Date) {
        _params[key] = Dates.defalut.dateFormateStr(params[key].value, 'YYYY-MM-DD HH:mm:ss')
      } else {
        _params[key] = params[key].value
      }
    }
    return _params
  },
  /**
   * [addOperationEvent 为operation下button按钮绑定event事件方法]
   * @param {Object} [operations={}] [description]
   * @param {[type]} vueObject       [description]
   */
  addOperationEvent ({operations = {}, vueObject = {}}) {
    const keys = Object.keys(operations)
    for (let key of keys) {
      if (operations[key].event && Object.is(typeof (operations[key].event), 'string')) {
        operations[key].event = vueObject[operations[key].event]
      }
    }
    return operations
  }
}
exports.default = Form
