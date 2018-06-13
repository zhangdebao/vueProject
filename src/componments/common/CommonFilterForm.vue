<template lang="html">
  <el-form ref="commonFilterForm" :model="todos" label-position="left" label-width="150px" >
    <el-form-item
      v-for="(item, key) of todos"
      v-if="!(Object.is(key, 'filter')) && item.show"
      :label="item.label"
      size="small"
    >
    <el-input
      v-if="Object.is(item.type, 'input') && Object.is(item.valueType, 'string')"
      v-model="item.value"
      :disabled="item.disabled"
      :placeholder="item.placeholder">
    </el-input>
    <el-input
      v-else-if="Object.is(item.type, 'input') && (Object.is(item.valueType, 'number') || Object.is(item.valueType, 'integer'))"
      v-model.number="item.value"
      :placeholder="item.placeholder">
    </el-input>
    <el-select
      v-else-if="Object(item.type, 'select') && Object.is(item.valueType, 'string')"
      v-model="item.value"
      :disabled="item.disabled"
      :multiple="item.multiple"
      :placeholder="item.placeholder">
        <el-option
          v-for="option of item.options"
          :key="option.value"
          :disabled="item.disabled"
          :label="option.label"
          :value="option.value">
        </el-option>
    </el-select>
    <el-select
      v-else-if="Object.is(item.type, 'select') && (Object.is(item.valueType, 'number') || Object.is(item.valueType, 'integer'))"
      v-model.number="item.value"
      :disabled="item.disabled"
      :multiple="item.multiple"
      :placeholder="item.placeholder">
        <el-option
          v-for="option of item.options"
          :key="option.value"
          :disabled="item.disabled"
          :label="option.label"
          :value="option.value">
        </el-option>
    </el-select>
    <el-date-picker
      v-else-if="Object(item.type, 'input') && Object.is(item.valueType, 'datetime')"
      v-model="item.value"
      :disabled="item.disabled"
      :type="item.valueType"
      :placeholder="item.placeholder"
      :format="item.format">
    </el-date-picker>
    <el-time-picker
      v-else-if="Object(item.type, 'input') && Object.is(item.valueType, 'time')"
      v-model="item.value"
      :disabled="item.disabled"
      :type="item.valueType"
      :placeholder="item.placeholder"
      :format="item.format">
    </el-time-picker>
    </el-form-item>
    <el-form-item>
      <el-button size="small" @click="filterTable" type="primary" >{{todos.filter}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'common-filter-form',
  props: {
    todos: {
      type: Object,
      required: true
    }
  },
  created () {
  },
  methods: {
    filterTable () {
      const entries = Object.entries(this.todos)
      const params = {}
      for (let entrie of entries) {
        if (!Object.is(entrie[0], 'filter')) {
          params[entrie[0]] = entrie[1].value
        }
      }
      this.$emit('filterTable', params)
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-select{
  width: 100%;
}
.el-date-editor{
  width: 100%;
}
</style>
