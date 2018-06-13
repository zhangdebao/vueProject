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
          @editTableRow="editTableRow"
          @deleteRow="deleteRow"
          :commonData="getTodos.data" :params="getTodos.params" :tableOperation="getTodos.tableOperation">
        </common-table>
      </el-card>
      </div>
    <div v-if="this.dialogFormVisable" :style="{width: getFormSpan, 'margin-left': '1%', float: 'right'}">
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
import CommonTable from '../../../common/commonTable.vue'
import CommonToggleProp from '../../../common/commonToggleTableColumn.vue'
import CommonEditForm from '../../../common/CommonEditForm.vue'
import CommonEditFormVue from '../../../common/CommonEditForm.vue'
import Tools from '../../../../assets/js/tools/app.js'
import leftMenu from '../../../leftMenu/multilevel.vue'
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
const isEnables = ['在线', '离线']
for (let index = 0; index < 44 ; index++ ) {
  tableData.push({
    userName: 'root',
    mobilePhone: `1893495684${index}`,
    emailAddress: `1${index}2${index}77@qq.com`,
    groupNames: `Group${index}`,
    isEnable: isEnables[index % 2]
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
          console.info('submit')
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
