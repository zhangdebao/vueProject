import { Dates } from './date.js'
const MyTable = {
  /**
   * [serverPagination  服务器端分页]
   * @param  {Object}   [pagination={}] [操作集]
   * @param  {Array}    [tableData=[]]  [数据存放]
   * @param  {Array}    [data=[]]       [数据源]
   * @param  {Object}   [itemArray={}]  [table的属性]
   * @param  {Function} callback        [回掉函数]
   * @return {[type]}                   [description]
   */
  serverPagination ({pagination = {}, tableData = [], data = [], itemArray = {}, callback = null}) {
    tableData.splice(0)
    if (Object.is(data.statusCode, 200)) {
      const table = data.body.data
      pagination.total = data.body.total
      // pagination.currentPage = data.body.currentPage
      const keys = Object.keys(itemArray)
      for (let item of table) {
        const _item = {}
        if (!Object.is(callback, null)) {
          callback(itemArray, item)
        } else {
          for (let key of keys) {
            if (Object.is(item[key], 'undefined')) {
              _item[key] = ''
            } else if (Object.is(itemArray[key].type, 'datetime')) {
              _item[key] = Dates.timeFormateStr(item[key], 'YYYY-MM-DD HH:mm:ss')
            } else if (itemArray[key].select) {
              const select = itemArray[key].select
              let isChoose = false
              for (let items of select) {
                if (Object.is(items.value, item[key])) {
                  _item[key] = items.label
                  isChoose = true
                  break
                }
              }
              if (!isChoose) {
                _item[key] = item[key]
              }
            } else {
              _item[key] = item[key]
            }
          }
        }
        tableData.push(_item)
      }
    }
  },
  /**
   * [localePagination 本地分页]
   * @param  {Object}   [itemArray={}] [表格属性]
   * @param  {Array}    [data=[]]      [数据源]
   * @param  {Function} callback       [回掉函数]
   * @return {[type]}                  [description]
   */
  localePagination ({tableData = [], localeTableData = [], pagination = {}, itemArray = {}, data = [], callback}) {
    tableData.splice(0)
    localeTableData.splice(0)
    if (Object.is(data.statusCode, 200)) {
      pagination.currentPage = 1
      pagination.total = 1
      if (data.body) {
        let table = data.body
        if (Array.isArray(table)) {
          pagination.total = table.length
        } else {
          table = table.data
          pagination.total = table.length
        }
        const keys = Object.keys(itemArray)
        for (let item of table) {
          let _item = {}
          if (!Object.is(callback, null)) {
            _item = callback(itemArray, item)
          } else {
            for (let key of keys) {
              if (Object.is(item[key], 'undefined')) {
                _item[key] = ''
              } else if (Object.is(itemArray[key].type, 'datetime')) {
                _item[key] = Dates.timeFormateStr(item[key], 'YYYY-MM-DD HH:mm:ss')
              } else if (itemArray[key].select) {
                const select = itemArray[key].select
                let isChoose = false
                for (let items of select) {
                  if (Object.is(items.value, item[key])) {
                    _item[key] = items.label
                    isChoose = true
                    break
                  }
                }
                if (!isChoose) {
                  _item[key] = item[key]
                }
              } else {
                _item[key] = item[key]
              }
            }
          }
          localeTableData.push(_item)
        }
        this.handleCurrentChange({
          pagination: pagination,
          tableData: tableData,
          localeTableData: localeTableData
        })
      }
    }
  },
  /**
   * [选中第一页 ]
   * @param  {Object} [pagination={}] [分页参数]
   * @param  {Array}  [tableData=[]]  [表格当前显示的数据]
   * @param  {[type]} localeTableData [总数据]
   * @return {[type]}                 [description]
   */
  handleCurrentChange ({pagination = {}, tableData = [], localeTableData}) {
    tableData.splice(0)
    const currentPage = 1
    const start = (currentPage - 1) * (pagination.size)
    const size = currentPage * pagination.size
    const localTable = localeTableData.splice(start, size)
    for (let item of localTable) {
      tableData.push(item)
    }
  },
  /**
   * [transformTableData为导出表格数据处理]
   * @param  {Object} [data={}]       [description]
   * @param  {Object} [itemArray={}}] [description]
   * @return {[type]}                 [description]
   */
  transformTableData ({data = {}, itemArray = {}}) {
    const keys = Object.is(itemArray)
    let table = data.map(x => {
      let item = {}
      for (let key of keys) {
        if (itemArray[key] && !(itemArray[key].tableHidden)) {
          item[key] = x[key]
        }
      }
      return item
    })
    if (data.length > 0) {
      let item = {}
      for (let key of keys) {
        if (itemArray[key] && !(itemArray[key].tableHidden)) {
          item[key] = itemArray[key].label
        }
      }
      table.unshift(item)
    }
    return table
  },
  /**
   * [filterTableData 筛选]
   * @param  {Array}  [data=[]]        [数据源]
   * @param  {Object} [conditions={}}] [筛选条件]
   * @return {[type]}                  [返回一个新的数组]
   */
  filterTableData ({data = [], conditions = {}}) {
    const datas = data.filter(x => {
      const entries = Object.entries(conditions)
      for (const item of entries) {
        if (x.item[0] && !x.item[0].includes(item[1])) {
          return false
        }
      }
      return true
    })
    return datas
  }
}
exports.MyTable = MyTable
