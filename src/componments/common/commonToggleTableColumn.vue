<template lang="html">
  <!--表格属性切换-->
  <div class="operations">
    <el-popover
      ref="popover1"
      placement="bottom"
      width="200"
      trigger="click">
        <el-col :span="24">
          <el-checkbox v-model="checkboxProp1">All</el-checkbox>
          <el-checkbox v-model="saveTableInfo1">保存</el-checkbox>
        </el-col>
        <el-col v-for="item of Object.entries(params)" :span="24">
          <el-checkbox
          v-if="isShowSelection(item) && Object.is(typeof item[1], 'object')"
          :disabled="!item[1].triggerProp"
          @change="changeValue(item[1])"
          v-model="item[1].propShow ? true : false">{{item[1].label}}</el-checkbox>
        </el-col>
    </el-popover>
    <!--筛选表单-->
    <el-popover
    v-if="operation.filter"
      ref="popover2"
      placement="bottom"
      width="400"
      trigger="click">
      <common-filter-form v-on:filterTable="filterTable" :todos="getFilterParams"></common-filter-form>
    </el-popover>
    <!--筛选表单|属性切换 小屏幕-->
    <el-dropdown @command="switchFilterCommand" v-if="(getScreenWidth < 1100)" size="mini" split-button type="primary" trigger="click">
        All
      <el-dropdown-menu slot="dropdown"
          >
          <el-dropdown-item
            v-for="(item, key) of operation"
            :disabled="item.disabled"
            :command="item.event"
            v-if="item.show && !Object.is(key, 'filter') && (Object.is(typeof item.badge, 'undefined'))"
          >
          <nobr v-bind:style="{color: item.color}">{{item.label}}<i class="mini-button iconfont" :class="item.icon"></i></nobr>
          </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-button-group v-if="(getScreenWidth >= 1100)">
      <!--筛选表单|属性切换 大屏幕-->
    <common-button
      v-for="(item, key) of operation"
      v-if="item.show && (Object.is(typeof item.badge, 'undefined')) && !Object.is(key, 'filter')"
      :disabled="item.disabled"
      @click="operations(item.event)"
      :label="item.label"
      :color="item.color"
      :icon="item.icon">
    </common-button>
    </el-button-group>
    <el-button-group>
      <common-button
        v-if="operation.filter && operation.filter.show"
        :disabled="operation.filter.disabled"
        v-popover:popover2
        label="筛选"
        icon="icon-filter">
      </common-button>
      <common-button icon="icon-setUp" label="权限配置" v-popover:popover1></common-button>
    </el-button-group>
  </div>
</template>

<script>
import CommonFilterForm from './CommonFilterForm.vue'
export default {
  components: {
    'common-filter-form': CommonFilterForm
  },
  props: {
    operation: {
      required: false,
      type: Object
    },
    params: {
      required: false,
      type: Object
    },
    checkboxProp: {
      required: false,
      type: Boolean
    },
    saveTableInfo: {
      required: false,
      type: Boolean
    }
  },
  data() {
    return {
      checkboxProp1: this.checkboxProp,
      saveTableInfo1: this.saveTableInfo
    }
  },
  updated: function() {},
  methods: {
    changeValue(item) {
      item.propShow = !item.propShow
    },
    isShowSelection(item) {
      if (Array.isArray(item)) {
        if (Object.is(item[0], 'selection')) {
          return false
        }
      }
      return true
    },
    operations(e) {
      this.$emit(e)
    },
    filterTable(payload) {
      this.$emit('filterTable', payload)
    },
    switchFilterCommand(command) {
      this.operations(command)
    }
  },
  computed: {
    getFilterParams() {
      const params = this.params
      const params1 = {}
      const entries = Object.entries(params)
      for (let item of entries) {
        if (item[1].filter) {
          params1[item[0]] = item[1]
        }
      }
      params1.filter = this.operation.filter.label
      return params1
    },
    getScreenWidth() {
      return this.$store.getters.getContentWidth
    }
  },
  watch: {
    getScreenWidth: {
      handler: function(val) {}
    },
    checkboxProp1: {
      handler: function(val) {
        const params = this.params
        const values = Object.values(params)
        for (let item of values) {
          if (Object.is(typeof item, 'object') && item.triggerProp) {
            item.propShow = val
          }
        }
        this.checkboxProp1 = val
      }
    },
    saveTableInfo1: {
      handler: function(value) {
        this.saveTableInfo1 = value
        this.$emit('saveTableLocalstorage', value)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.badge {
  margin-right: 30px;
}
.el-button-group button{
  margin-right: 2px;
}
.el-button-group button:last-child{
  margin-right:0;
}
.operations{
  float: right;
}
</style>
