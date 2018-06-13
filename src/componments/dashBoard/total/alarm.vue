<template lang="html">
  <el-card :body-style="{padding: 0}">
    <div slot="header">
      <span>{{todos.alarmTitle}}</span>
      <el-button-group>
        <el-button type="text" @click="initAlarmChart()" class="iconfont icon-pie"></el-button>
        <el-button type="text" @click="initAlarmChart('line')" class="iconfont icon-line"></el-button>
        <el-button type="text" @click="initAlarmChart('bar')" class="iconfont icon-bar"></el-button>
        <el-button type="text" @click="collapse = !collapse">
          <i v-if="collapse" class="iconfont icon-up"></i>
          <i v-else="collapse" class="iconfont icon-down"></i>
        </el-button>
      </el-button-group>
    </div>
    <div id="alarmTotal"  v-bind:style="{transition: 'height 1s', height: getChartHeight}">
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
      echartType: 'bar'
    }
  },
  created: function () {
  },
  mounted: function () {
    this.initAlarmChart('bar')
  },
  updated: function () {
    window.setTimeout( () => {
      this.initAlarmChart(this.echartType)
    }, 1000)
  },
  methods: {
    /**
     * [initAlarmChart 绘制echarts]
     * @param  {String} [type='pie'] [图形类型]
     * @return {[type]}              [无返回]
     */
    initAlarmChart (type = 'pie') {
      this.echartType = type
      let options = {}
      let chart = echarts.init(document.getElementById('alarmTotal'))
      if (!Object.is(chart, null)) {
        chart.dispose()
      }
      chart = echarts.init(document.getElementById('alarmTotal'))
      const datas = [
        [{value: 335, name: '重要'},
        {value: 45, name: '次要'},
        {value: 135, name: '提示'},
        {value: 22, name: '紧急'}]
      ]
      const yDatas = {
        seriesName: '告警统计',
        color: this.form.alarmColor,
        yData: datas
      }
      switch (type) {
        case 'pie' :
          options = this.todos.getPieOptions(yDatas)
          break
        case 'line' :
          options = this.todos.getLineOptions(yDatas)
          break
        case 'bar' :
          options = this.todos.getBarOptions(yDatas)
          break
      }
      chart.setOption(options)
    }
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
</style>
