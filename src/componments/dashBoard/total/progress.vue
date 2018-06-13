<template lang="html">
  <el-card :body-style="{padding: 0}">
    <div slot="header">
      <span>{{todos.progressTitle}}</span>
      <el-button-group>
        <el-button type="text" @click="collapse = !collapse">
          <i v-if="collapse" class="iconfont icon-up"></i>
          <i v-else="collapse" class="iconfont icon-down"></i>
        </el-button>
      </el-button-group>
    </div>
    <div id="deviceProgress"  v-bind:style="{transition: 'height 1s', height: getChartHeight}">
      <div>
        <p>Sites</p>
        <el-progress :percentage="80" color="#5bf97e"></el-progress>
      </div>
      <div>
        <p>Clients</p>
        <el-progress :percentage="30" color="#2bcf2d"></el-progress>
      </div>
    </div>
  </el-card>
</template>

<script>
import CommonConfig from '../../../assets/js/language/config'
const echarts = require('echarts')
export default {
  props: {
    todos: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      collapse: true,
      form: new CommonConfig().commonJson,
      echartType: 'pie'
    }
  },
  created: function () {
  },
  mounted: function () {
  },
  updated: function () {
  },
  methods: {

  },
  computed: {
    /**
     * [getChartHeight 获取图形高度]
     * @return {[type]} [返回高度]
     */
    getChartHeight () {
      if (this.collapse) {
        return this.$store.getters.getContentHeight * 0.48 - 70 + 'px'
      } else {
        return '0'
      }
    }
  },
  watch: {
  }
}
</script>

<style lang="stylus" scoped>
.cardModdule{
  background-color: #f6f6f6;
  .el-button-group{
    float: right;
  }
  button{
    padding: 3px 0;
  }
}
#deviceProgress{
  div{
    color: #888;
    padding: 5% 8px;
    p{
      padding-left: 8px;
    }
  }
}
</style>
