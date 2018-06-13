import XLSX from 'xlsx'
const EXCEL = class {
  construct () {}
  /**
   * [exportsEXCL 导出数据到excel]
   * @param  {Array}  [_headers=[]]   [表头]
   * @param  {Array}  [_body=[]]      [内容]
   * @param  {String} [name='excel'}] [文件名]
   * @return {[type]}                 [无]
   */
  exportsEXCL ({_headers = [], _body = [], name = 'excel'}) {
    /**
     *
     * workbook 对象，指的是整份 Excel 文档。我们在使用 js-xlsx 读取 Excel 文档之后就会获得 workbook 对象。
     * worksheet 对象，指的是 Excel 文档中的表。我们知道一份 Excel 文档中可以包含很多张表，而每张表对应的就是 worksheet 对象。
     * cell 对象，指的就是 worksheet 中的单元格，一个单元格就是一个 cell 对象。
     */
    // const workbook = {
    //   SheetNames: ['sheet1'],
    //   Sheets: {
    //     'sheet1': {
    //       '!ref': 'A1:E4', // 必须要有这个范围才能输出，否则导出的 excel 会是一个空表
    //       A1: {v: 'id'}
    //     }
    //   }
    // }
    // const _headers = ['id', 'name', 'age', 'country', 'remark']
    // const _data = [
    //   {
    //     id: 1,
    //     name: 'test1',
    //     age: 30,
    //     country: 'China',
    //     remark: 'hello'
    //   },
    //   {
    //     id: 2,
    //     name: 'test2',
    //     age: 40,
    //     country: 'UN',
    //     remark: '??'
    //   }
    // ]
    // 获取表头
    const headers = _headers
      // 为 _headers 添加对应的单元格位置
      // [
      //   {
      //     v: 'id', position: 'A1'
      //   },
      //   {
      //     v: 'name', position: 'B1'
      //   },
      //   ......
      // ]
      // Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
      .map((v, i) => Object.assign({}, {v, position: String.fromCharCode(65 + i) + 1}))
      // 转换成 worksheet 需要的结构
      // {
      //   A1: {v: 'id'},
      //   B1: {v: 'name'},
      //   ....
      // }
      .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {})

    const body = _body
      // 匹配 headers 的位置，生成对应的单元格数据
      // [
      //   [
      //     {
      //       v: 1,
      //       position: 'A2'
      //     },
      //     {
      //       v: 'test1',
      //       position: 'B2'
      //     },
      //     {
      //       v: 30,
      //       position: 'C2'
      //     },
      //     {
      //       v: 'China',
      //       position: 'D2'
      //     },
      //     {
      //       v: 'hello',
      //       position: 'E2'
      //     }
      //   ],
      //   [
      //     {
      //       v: 2,
      //       position: 'A3'
      //     },
      //     {
      //       v: 'test2',
      //       position: 'B3'
      //     },
      //     {
      //       v: 40,
      //       position: 'C3'
      //     },
      //     {
      //       v: 'UN',
      //       position: 'D3'
      //     },
      //     {
      //       v: '??',
      //       position: 'E3'
      //     }
      //   ]
      // ]
      .map((v, i) => _headers.map((k, j) => Object.assign({}, { v: v[k], position: String.fromCharCode(65 + j) + (i + 2) })))
      // 对刚才的结果进行降维处理（二维数组变成一维数组）
      // [
      //   {
      //     v: 1,
      //     position: 'A2'
      //   },
      //   {
      //     v: 'test1',
      //     position: 'B2'
      //   },
      //   {
      //     v: 30,
      //     position: 'C2'
      //   },
      //   {
      //     v: 'China',
      //     position: 'D2'
      //   },
      //   {
      //     v: 'hello',
      //     position: 'E2'
      //   },
      //   {
      //     v: 2,
      //     position: 'A3'
      //   },
      //   {
      //     v: 'test2',
      //     position: 'B3'
      //   },
      //   {
      //     v: 40,
      //     position: 'C3'
      //   },
      //   {
      //     v: 'UN',
      //     position: 'D3'
      //   },
      //   {
      //     v: '??',
      //     position: 'E3'
      //   }
      // ]
      .reduce((prev, next) => prev.concat(next))
      // 转换成 worksheet 需要的结构
      // {
      //   A2: {v: 1},
      //   B2: {v: 'test1'},
      //   .....,
      //   A3: {v: 2},
      //   B3: {v: 'test2'}
      // }
      .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {})
    // 合并headers和data
    const output = Object.assign({}, headers, body)
    // 获取所有单元格位置
    const outputPos = Object.keys(output)
    // ====设置xlsx单元格样式
    // headers['B1'].s = { font: { sz: 14, bold: true, color: { rgb: 'FFAA00' } }, fill: { bgColor: { indexed: 64 }, fgColor: { rgb: 'FFFF00' } } }
    // 计算出范围
    const ref = outputPos[0] + ':' + outputPos[outputPos.length - 1]
    console.log('ref', ref)
    // 构建 workbook 对象
    const wb = {
      SheetNames: ['mySheet'],
      Sheets: {
        'mySheet': Object.assign({}, output, { '!ref': ref })
      }
    }
    // 导出 Excel
    XLSX.writeFile(wb, `${name}.xlsx`)
  }
  /**
   * [exportsCSV 导出数据到CSV]
   * @param  {Array}  [_headers=[]]   [表头]
   * @param  {Array}  [_body=[]]      [内容]
   * @param  {String} [name='excel'}] [文件名]
   * @return {[type]}                 [无]
   */
  exportsCSV ({_headers = [], _body = [], name = 'csv', callback = function () {}}) {
    // _headers = ['id', 'age', 'sex']
    // _body = [
    //   {
    //     'id': '1',
    //     'age': 12,
    //     'sex': '男'
    //   },
    //   {
    //     'id': '2',
    //     'age': 24,
    //     'sex': '女'
    //   },
    //   ......
    // ]
    name = 'test'
    const headers = _headers.join() + '\n' // 格式化表头
    const body = _body.map(item => { // 格式化表内容
      return Object.values(item).join() + '\n'
    })
    const output = headers.concat(body) // 合并

    const BOM = '\uFEFF'
    // 创建一个文件CSV文件
    var blob = new Blob([BOM + output], {type: 'text/csv'})
    // IE
    if (navigator.msSaveOrOpenBlob) {
      // 解决大文件下载失败
      // 保存到本地文件
      navigator.msSaveOrOpenBlob(blob, `${name}.csv`)
    } else {
      // let uri = encodeURI(`data:text/csv;charset=utf-8,${BOM}${output}`)
      let downloadLink = document.createElement('a')
      // downloadLink.href = uri
      downloadLink.setAttribute('href', URL.createObjectURL(blob)) // 因为url有最大长度限制，encodeURI是会把字符串转化为url，超出限制长度部分数据丢失导致下载失败,为此我采用创建Blob（二进制大对象）的方式来存放缓存数据，具体代码如下：
      downloadLink.download = `${name}.csv`
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    }
    callback()
  }
}
exports.defalut = new EXCEL()
