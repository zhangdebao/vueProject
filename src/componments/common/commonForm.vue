<template lang="html">
  <el-form
  :model="todos"
  :label-width = "getTodos.labelWidth"
  :label-position = "getTodos.labelPosition"
  :show-message = "getTodos.showMessage"
  :status-icon = "getTodos.statusIcon"
  :size = "getTodos.size"
  ref="commonForm">
  <el-col v-for="(item, key, index) in getTodos.params" v-if="Object.is(typeof item, 'object')  && item.show" :offset="getOffset(item, index)" :span="getSpan(item)">
    <el-form-item
      :label="item.label"
      :prop="`params.${key}.value`"
      :rules="item.rules"
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
          :disabled="item.disabled"
          :placeholder="item.placeholder">
        </el-input>
        <el-input
          v-else-if="Object.is(item.type, 'input') && Object.is(item.valueType, 'textarea')"
          v-model="item.value"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          :type="item.valueType"
          autosize>
        </el-input>
        <el-input
          v-else-if="Object.is(item.type, 'input') && Object.is(item.valueType, 'password')"
          v-model="item.value"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          :type="item.valueType">
        </el-input>
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
    </el-form-item>
  </el-col>
  </el-form>
</template>

<script>
export default {
  name: 'common-form',
  props: {
    todos: {
      type: Object,
      required: true
    }
  },
  methods: {
    getSpan: (item, index) => {
      if (item.span) {
        return item.span
      }
      return 11
    },
    getOffset: (item, index) => {
      if (item.offset) {
        return item.offset
      }
    }
  },
  computed: {
    getTodos () {
      return this.todos
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
