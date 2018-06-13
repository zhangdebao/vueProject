import { Message, MessageBox, Loading } from 'element-ui'
import CommonConfig from '../../../assets/js/language/config'
const LabelConfig = new CommonConfig()

const Tips = {
/**
 * [success 成功提示消息]
 * @param  {String} [msg='success'] [消息]
 * @return {[type]}                 [description]
 */
  success (msg = 'success') {
    Message.success({
      message: msg,
      type: 'success'
    })
  },
  /**
 * [info 信息提示]
 * @param  {String} [msg='info'] [消息]
 * @return {[type]}              [description]
 */
  info (msg = 'info') {
    Message.info({
      message: msg,
      type: 'info'
    })
  },
  /**
   * [error 错误消息提示]
   * @param  {String} [msg='error'] [消息]
   * @return {[type]}               [description]
   */
  error (msg = 'error') {
    Message.error({
      message: msg,
      type: 'error'
    })
  },
  /**
 * [warning 告警消息提示]
 * @param  {String} [msg='warning'] [消息]
 * @return {[type]}                 [description]
 */
  warning (msg = 'warning') {
    Message.warning({
      message: msg,
      type: 'warning'
    })
  },
  /**
 * [confirm 确认框]
 * @param  {String} [msgOne='删除之后不能恢复，确认是否删除?'] [提示内容]
 * @param  {String} [msgTwo='success']          [确认后提示]
 * @param  {String} [msgThree='info'}]          [取消确认后提示]
 * @return {[type]}                             [description]
 */
  confirm ({msgOne = '删除之后不能恢复，确认是否删除?', msgTwo = 'success', msgThree = 'info'}) {
    // console.log('mmmmmm', commonJson)
    MessageBox.confirm(msgOne, LabelConfig.commonJson.prompt, {
      confirmButtonText: LabelConfig.commonJson.confirmButtonText,
      cancelButtonText: LabelConfig.commonJson.cancelButtonText,
      type: 'warning'
    }).then(() => {
      Message.success({
        message: msgTwo,
        type: 'success'
      })
    }).catch(() => {
      Message.info({
        message: msgThree,
        type: 'info'
      })
    })
  },
  /**
   * [loading 加载进度]
   * @param  {String} [msg='操作进行中，请勿刷新'] [消息]
   * @return {[type]}                    [description]
   */
  loading (msg = '操作进行中，请勿刷新', path = '.body') {
    const loading = Loading.service({
      lock: true,
      text: msg,
      spinner: 'el-icon-loading',
      background: 'rgba(0,0,0,0.7)',
      target: document.querySelector(path)
    })
    return loading
  }

}
exports.defalut = Tips
// export { Tips }
