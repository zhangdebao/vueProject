const Dates = {
  /**
   * [strFormateDate 字符串格式化为日期]
   * @param  {String} [str='']] [需要转换为日期的字符串]
   * @return {[type]}           [返回转换之后的字符串]
   */
  strFormateDate ([str = '']) {
    str = str.replace('T', ' ')
    let date = new Date()
    date.setFullYear(parseInt(str.substring(0, 4)))
    date.setMonth(parseInt(str.substring(5, 7)) - 1)
    date.setDate(parseInt(str.substring(8, 10)))
    var index = str.indexOf(' ')
    date.setHours(parseInt(str.substring(index + 1, index + 3)))
    date.setMinutes(parseInt(str.substring(index + 4)))
    return date
  },
  /**
   * [dateFormateStr 日期格式化为字符串]
   * @param  {[type]} date [格式化的日期]
   * @param  {[type]} str  [str：格式化的格式]
   * @return {[type]}      [返回转换之后的字符串]
   */
  dateFormateStr ({date, str}) {
    str = str.replace(/Y{4}|Y{2}/i, date.getFullYear())
    str = str.replace(/MM/, date.getMonth() + 1 < 10 ? ('0' + (date.getMonth() + 1)) : date.getMonth() + 1)
    str = str.replace(/DD/i, date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate())
    str = str.replace(/HH/i, date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours())
    str = str.replace(/mm/, date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes())
    str = str.replace(/SS/i, date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds())
    return str
  },
  /**
   * [timeFormateStr long值转为日期字符串]
   * @param  {[type]} time [long时间毫秒数]
   * @param  {[type]} str  [需要转换的字符串格式例如YYYY-MM-DD HH:mm:ss]
   * @return {[type]}      [description]
   */
  timeFormateStr (time) {
    const date = new Date()
    date.setTime(window.parseInt(time))
    return date
  }
}
exports.defalut = Dates
