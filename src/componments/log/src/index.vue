<template lang="html">
  <div>
    <el-card>
      <div slot="header">
        <el-breadcrumb class="inline-block" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="item of form.nav"
          :to="item.router"
          >{{item.label}}</el-breadcrumb-item>
        </el-breadcrumb>
        <common-toggle-table-column
          @batchDelete="batchDelete"
          @saveTableLocalstorage="saveTableLocalstorage"
          :operation="form.operation"
          :params="form.params"
          :checkboxProp="form.params.checkboxProp"
          :saveTableInfo="form.params.saveTableInfo">
        </common-toggle-table-column>
      </div>
    </el-card>
    <div>
      <div :style="{width: getTableSpan, float: 'left'}">
        <el-card>
          <common-table
            @serverSide="serverSide"
            @handleSelectionChange="selectionChange"
            @deleteRow="deleteRow"
            @goRouter="goRouter"
            :commonData="getTodos.data" :params="getTodos.params" :tableOperation="getTodos.tableOperation">
          </common-table>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
/*
  引入需要的模块或者组件
 */
import CommonTable from '../../common/commonTable.vue'
import CommonToggleProp from '../../common/commonToggleTableColumn.vue'
import Tools from '../../../assets/js/tools/app.js'
/* 引入数据源 */
let form = require('./config').json

/*
  判断时候存在本地缓存
 */
if (Tools.defalut.getTableLocalstorageStatus('log')) {
  form.params = Tools.defalut.setTableLocalstorageStatus({
    key: 'log',
    object: form.params
  })
}
const tableData = []
const types = ['添加', '删除', '修改', '查询']
const results = ['成功', '失败']
for (let index = 0; index < 44 ; index++ ) {
  tableData.push({
    id: index,
    type: types[index % 4],
    result: results[index % 2],
    displayName: `name、index`,
    ip: `192.168.18.2${index}`,
    creator: 'zhangsan',
    createTime: `2018-04-1 12:11:${index}`,
    details: `details`
  })
}
export default {
  /* 注册组件 */
  components: {
    'common-table': CommonTable,
    'common-toggle-table-column': CommonToggleProp
  },
  data () {
    return {
      menus: form.menus,
      dialogFormVisable: false,
      form: form,
      sumProp: '',
      tableData
    }
  },
  /* 生命周期钩子 */
  created: function () {
  },
  methods: {
    /**
     * [selectionChange 选中的数据改变]
     * @param  {[type]} payload [选中的数据]
     * @return {[type]}         [无返回]
     */
    selectionChange (payload) {
      const batchDelete = this.form.operation.batchDelete
      const length = payload.selection.length
      if (length > 0) {
        batchDelete.disabled = false
      } else {
        batchDelete.disabled = true
      }
      batchDelete.label =`(${length})`
    },
    /**
     * [filterTable 筛选表格]
     * @param  {[type]} payload [筛选参数]
     * @return {[type]}         [无返回]
     */
    filterTable (payload) {
      switch (payload) {
        case 'addTableRow':
          this.addTableRow()
        break
        default:
        this.sumProp = payload
      }
    },
    /**
     * [batchDelete 批量删除]
     * @return {[type]} [description]
     */
    batchDelete () {
      console.log('批量删除')
    },
    /**
     * 删除单行数据
     * @param  {[type]} row [单行数据]
     * @return {[type]}     [description]
     */
    deleteRow (row) {
      console.log(row)
    },
    /**
     * [goRouter 动态路由使用]
     * @param  {[type]} row [description]
     * @return {[type]}     [description]
     */
    goRouter (row) {
      this.$router.push({
        path: 'form',
        query: {
          ip: row.ipAddress
        }
      })
    },
    /**
     * [serverSide 服务器端分页]
     * @param  {[type]} payload [后端需要的查询参数]
     * @return {[type]}         [description]
     */
    serverSide (payload) {
      console.log('可以使用来触发雾服务端分页', payload)
    },
    /**
     * [saveTableLocalstorage 保存数据到本地存储]
     * @param  {[type]} value [保存的数据]
     * @return {[type]}       [description]
     */
    saveTableLocalstorage (value) {
      if (value) {
        this.$Tools.saveTableLocalstorageStatus({
          key: 'log',
          value: this.form.params
        })
      } else {
        this.$Tools.removeTableLocalstorageStauts('log')
      }
    }
  },
  computed: {
    /**
     * [getTodos CommonTable所需的参数]
     * @return {[type]} [返回参数对象]
     */
    getTodos () {
      return {
        data: this.tableData,
        params: this.form.params,
        tableOperation: this.form.tableOperation
      }
    },
    /**
     * [getTableSpan 获取table占有的span]
     * @return {[type]} [返回span]
     */
    getTableSpan () {
      return '100%'
    },
    /**
     * [getEditFormMaxHeight 获取表单的最大高度]
     * @return {[type]} [description]
     */
    getEditFormMaxHeight () {
      return this.$store.getters.getContentHeight - 130 + 'px'
    }
  },
  watch: {
  }
}
</script>

<style lang="stylus" scoped>
.inline-blocks{
  display:inline-block;
  // float:left;
}
.topNav{
  background-color:rgb(163, 159, 172);
  width: 14.5%;
  margin-right: 0.5%;
}
.topNav + div{
  width: 84%;
}
</style>
