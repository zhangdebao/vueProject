import axios from 'axios'
const Qs = require('qs')
axios.defaults.baseURL = 'http://192.168.2.244:8080'
/* eslint-disable */
const Requests = class Requests {
  constructor () {
    this.proxy = ''
  }
  /**
   * [getResource 获取资源]
   * @param  {[type]} url          [请求地址]
   * @param  {[type]} params       [请求参数]
   * @return {[type]}              [description]
   */
  getResource ({url, params}) {
    return axios.get(`${this.proxy}${url}`, {params})
  }
  /**
   * [deleteResource 删除资源]
   * @param  {[type]} url          [请求地址]
   * @param  {[type]} params       [请求参数]
   * @return {[type]}              [description]
   */
  deleteResource ({url, params}) {
    return axios.delete(`${this.proxy}${url}`, {params})
  }
  /**
   * [putResource 新建资源]
   * @param  {[type]} url          [请求地址]
   * @param  {[type]} params       [请求参数]
   * @return {[type]}              [description]
   */
  putResource ({url, params}) {
    return axios.put(`${this.proxy}${url}`, null, {
      transformRequest: [function (data) {
        return Qs.stringify(data, {arrayFormat: 'brackets'})
      }],
      data: params
    })
  }
  /**
   * [getResource 修改资源]
   * @param  {[type]} url          [请求地址]
   * @param  {[type]} params       [请求参数]
   * @return {[type]}              [description]
   */
  postResource ({url, params}) {
    return axios.post(`${this.proxy}${url}`, null, {
      transformRequest: [function (data) {
        return Qs.stringify(data, {arrayFormat: 'brackets'})
      }],
      data: params
    })
  }
  /**
   * [checkBean 验证用户]
   * @param  {[type]} response [description]
   * @return {[type]}          [description]
   */
  static checkStatus (response) {
    const data = response.data.body
    if (Object.is(data.statusCode, 200)) {
      return true
    }
  }
}
const Request = new Requests()
axios.interceptors.response.use((response) => {
  /* 请求成功操作 */
  Requests.checkStatus(response)
  return response
}, (err) => {
  /* 请求失败操作 */
  return Promise.reject(err)
})
export { Request }
