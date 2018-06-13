<template lang="html">
  <el-card>
    <div slot="header">
      <el-breadcrumb class="inline-block"  separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item of form.nav"
          :to="item.router"
        >{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <common-form ref="form-form" class="commmonScoll" v-bind:style="{'height': getEditFormMaxHeight}" :todos="form"></common-form>
      <common-button label="取消" @click="resetForm('form-form')"></common-button>
      <common-button label="创建" @click="submitEditForm('form-form')"></common-button>
    </div>
  </el-card>
</template>

<script>
import CommonForm from '../../common/commonForm.vue'
export default {
  components: {
    'common-form': CommonForm
  },
  data () {
    return {
      form: require('./config').json
    }
  },
  computed: {
    getEditFormMaxHeight () {
      return this.$store.getters.getContentHeight - 130 + 'px'
    }
  },
  methods: {
    /**
     * [submitEditForm 提交表单]
     * @param  {[type]} formName [description]
     * @return {[type]}          [description]
     */
    submitEditForm (formName) {
      this.$refs[formName].$refs['commonForm'].validate((valid) => {
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
      this.$refs[formName].$refs['commonForm'].resetFields()
    }
  },
  created: function () {
  },
  activated: function () {
    console.log('参数', this.$route.query)
  }
}
</script>

<style lang="stylus" scoped>

</style>
