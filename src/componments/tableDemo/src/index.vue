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
          @filterTable="filterTable"
          @exportsEXCL="exportsEXCL"
          @exportsSelctionEXCL="exportsSelctionEXCL"
          @addTableRow="addTableRow"
          @batchDelete="batchDelete"
          @saveTableLocalstorage="saveTableLocalstorage"
          :operation="form.operation"
          :params="form.params"
          :checkboxProp="form.params.checkboxProp"
          :saveTableInfo="form.params.saveTableInfo"
          v-loading.fullscreen.lock="fullscreenLoading">
        </common-toggle-table-column>
      </div>
    </el-card>
    <div>
      <div :style="{width: getTableSpan, float: 'left'}">
        <el-card v-loading="tableLoading">
          <common-table
          @serverSide="serverSide"
          @handleSelectionChange="selectionChange"
          @editTableRow="editTableRow"
          @deleteRow="deleteRow"
          @goRouter="goRouter"
          :commonData="getTodos.data" :params="getTodos.params" :tableOperation="getTodos.tableOperation">
        </common-table>
      </el-card>
    </div>
    <div v-if="this.dialogFormVisable" v-loading="editFormloading" :style="{width: getFormSpan, 'margin-left': '1%', float: 'right'}">
      <el-card >
        <common-edit-form ref="table-form" :todos="form"  v-bind:class="{rightForm: true}" v-bind:style="{'height': getEditFormMaxHeight, 'padding-right': '15px'}"></common-edit-form>
        <div>
          <common-button :label="form.buttonGroup.cancel.label" @click="resetForm('table-form')"></common-button>
          <common-button :label="form.buttonGroup.confirm.label" @click="submitEditForm('table-form')"></common-button>
        </div>
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
import CommonEditForm from '../../common/CommonEditForm.vue'
import CommonEditFormVue from '../../common/CommonEditForm.vue'
import Tools from '../../../assets/js/tools/app.js'
import leftMenu from '../../leftMenu/multilevel.vue'

import EXCEL from '../../../assets/js/tools/excel'
/* 引入数据源 */
let form = require('./config').json

/*
  判断时候存在本地缓存
 */
if (Tools.defalut.getTableLocalstorageStatus('tableDemo')) {
  form.params = Tools.defalut.setTableLocalstorageStatus({
    key: 'tableDemo',
    object: form.params
  })
}
const tableData = []
const alarmLevel = ['Major', 'Minor', 'Critical', 'Normal']
for (let index = 0; index < 100 ; index++ ) {
  tableData.push({
    filter_integer: alarmLevel[index % alarmLevel.length],
    ipAddress: `192.168.18.${index}`,
    select_integer_valid: 1,
    input_integer_valid: index,
    select_str_valid: 'Proxy',
    input_str_valid: `${index}`,
    select_number_valid: 2 * index,
    input_number_valid: 3 * index,
    select_str: `${2 * index}`,
    input_number: 44 * index,
    textArea_valid: '文本域验证',
    textArea: '文本域',
    textArea: 'index',
    password_valid: '1111',
    password: '222',
    startDateTime_valid: `2018-04-1 12:11:${index}`,
    endDateTime_valid: `2018-04-2 12:11:${index}`,
    createTime: `12:11:${index}`,
    endTime: `12:11:${index}`
  })
}
export default {
  /* 注册组件 */
  components: {
    'common-table': CommonTable,
    'common-toggle-table-column': CommonToggleProp,
    'common-edit-form': CommonEditFormVue,
    'multi-menu': leftMenu
  },
  data () {
    return {
      menus: form.menus,
      dialogFormVisable: false,
      form: form,
      sumProp: '',
      tableData,
      selection: [],
      tableLoading: true,
      editFormloading: false,
      fullscreenLoading: false
    }
  },
  /* 生命周期钩子 */
  created: function () {
    window.setTimeout(() => {
      this.tableLoading = false
    }, 1000)
  },
  methods: {
    exportsEXCL () {
      const params = Object.assign({}, form.params)
      delete params.selection
      delete params.checkboxProp
      delete params.saveTableInfo
      const promise = new Promise((resolve, reject) => {
        this.fullscreenLoading = true
        resolve()
      })
      promise.then((resolve) => {
        const testSize = []
        const alarmLevel = ['Major', 'Minor', 'Critical', 'Normal']
        for (let index = 0; index < 900000 ; index++ ) {
          testSize.push({
            filter_integer: alarmLevel[index % alarmLevel.length],
            ipAddress: `192.168.18.${index}`,
            select_integer_valid: 1,
            input_integer_valid: index,
            select_str_valid: 'Proxy',
            input_str_valid: `${index}`,
            select_number_valid: 2 * index,
            input_number_valid: 3 * index,
            select_str: `${2 * index}`,
            input_number: 44 * index,
            textArea_valid: '文本域验证',
            textArea: '文本域',
            textArea: 'index',
            password_valid: '1111',
            password: '222',
            startDateTime_valid: `2018-04-1 12:11:${index}`,
            endDateTime_valid: `2018-04-2 12:11:${index}`,
            createTime: `12:11:${index}`,
            endTime: `12:11:${index}`
          })
        }
        EXCEL.defalut.exportsCSV({
          _headers: Object.keys(params),
          _body: testSize,
          name: '网元',
          callback: () => {
            this.fullscreenLoading = false
            console.log('callback')
          }
        })
      }).catch((err) => {
        this.fullscreenLoading = false
      })
    },
    exportsSelctionEXCL () {
      const params = Object.assign({}, form.params)
      delete params.selection
      delete params.checkboxProp
      delete params.saveTableInfo
      EXCEL.defalut.exportsEXCL({
        _headers: Object.keys(params),
        _body: this.selection,
        name: '网元'
      })
    },
    /**
     * [selectionChange 选中的数据改变]
     * @param  {[type]} payload [选中的数据]
     * @return {[type]}         [无返回]
     */
    selectionChange (payload) {
      const batchDelete = this.form.operation.batchDelete
      const exportsSelctionEXCL = this.form.operation.exportsSelctionEXCL
      const length = payload.selection.length
      if (length > 0) {
        this.selection = payload.selection
        batchDelete.disabled = false
        exportsSelctionEXCL.disabled = false
      } else {
        batchDelete.disabled = true
        exportsSelctionEXCL.disabled = true
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
        default:
        this.sumProp = payload
      }
    },
    /**
     * [batchDelete 批量删除]
     * @return {[type]} [description]
     */
    batchDelete () {
      this.$Tips.confirm({
        successMsg: '删除成功！',
        errMsg: '删除失败！'
      })
    },
    /**
     * [editTableRow 修改行数据]
     * @param  {[type]} row [行数据]
     * @return {[type]}     [无返回]
     */
    editTableRow (row) {
      this.dialogFormVisable = true
      this.$Form.setFormPropertyValue({
        params: this.form.params,
        data: row
      })
    },
    /**
     * [addTableRow 添加数据]
     */
    addTableRow () {
      this.dialogFormVisable = true
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
      this.$router.replace({
        path: '/NEConfigMenus',
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
          key: 'tableDemo',
          value: this.form.params
        })
      } else {
        this.$Tools.removeTableLocalstorageStauts('tableDemo')
      }
    },
    /**
     * [submitEditForm 提交表单]
     * @param  {[type]} formName [description]
     * @return {[type]}          [description]
     */
    submitEditForm (formName) {
      this.$refs[formName].$refs['commonEditForm'].validate((valid) => {
        if (valid) {
          // 加载进度提示
          this.editFormloading = true
          window.setTimeout(() => {
            this.editFormloading = false
            this.$Tips.success('提交成功！')
          }, 3000);
        } else {
          return false
        }
      })
    },
    /**
     * [resetForm 重置表单的验证状态]
     * @param {[type]} formName [description]
     */
    resetForm (formName) {
      this.dialogFormVisable = false
      this.$refs[formName].$refs['commonEditForm'].resetFields()
    }
  },
  computed: {
    /**
     * [getTodos CommonTable所需的参数]
     * @return {[type]} [返回参数对象]
     */
    getTodos () {
      return {
        data: this.getFilterTable,
        params: this.form.params,
        tableOperation: this.form.tableOperation
      }
    },
    /**
     * [getFilterTable 获取过滤选项]
     * @return {[type]} [返回过滤对象]
     */
    getFilterTable () {
      const data = this.tableData.filter((item) => {
        if (Object.is(this.sumProp, '')) {
          return true
        } else if (item.alarmLevel && Object.is(item.alarmLevel, this.sumProp)) {
          return true
        } else {
          return false
        }
      })
      return data
    },
    /**
     * [getTableSpan 获取table占有的span]
     * @return {[type]} [返回span]
     */
    getTableSpan () {
      if (this.dialogFormVisable) {
        // return 15
        return '70%'
      } else {
        // return 24
        return '100%'
      }
    },
    /**
     * [getFormSpan 获取form占有的span]
     * @return {[type]} [返回span]
     */
    getFormSpan () {
      if (this.dialogFormVisable) {
        // return 8
        return '29%'
      } else {
        return 0
      }
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
}
.topNav{
  background-color:rgb(163, 159, 172);
  width: 14.5%;
  margin-right: 0.5%;
}
.topNav + div{
  width: 85%;
}
</style>
