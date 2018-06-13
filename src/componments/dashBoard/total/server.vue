<template lang="html">
  <el-card :body-style="{padding: 0}">
    <div slot="header">
      <span>{{todos.serverTitle}}</span>
      <el-button-group>
        <el-button type="text" @click="initServerStatus()" class="iconfont icon-pie"></el-button>
        <el-button type="text" @click="initServerStatus('line')" class="iconfont icon-line"></el-button>
        <el-button type="text" @click="initServerStatus('bar')" class="iconfont icon-bar"></el-button>
        <el-button type="text" @click="collapse = !collapse">
          <i v-if="collapse" class="iconfont icon-up"></i>
          <i v-else="collapse" class="iconfont icon-down"></i>
        </el-button>
      </el-button-group>
    </div>
    <div id="serverStatus" v-bind:style="{transition: 'height 1s', height: getChartHeight, width: '100%'}"></div>
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
  mounted: function () {
    this.initServerStatus()
  },
  updated: function () {
    window.setTimeout( () => {
      this.initServerStatus(this.echartType)
    }, 1000)
  },
  methods: {
    /**
     * [initServerStatus 绘制echarts]
     * @param  {String} [type='pie'] [图形类型]
     * @return {[type]}              [无返回]
     */
    initServerStatus (type = 'pie') {
      this.echartType = type
      let chart = chart = echarts.init(document.getElementById('serverStatus'))
      if (!Object.is(chart, null)) {
        chart.dispose()
      }
      chart = echarts.init(document.getElementById('serverStatus'))
      let options = {}
      const datas = [
        [{value: 335, name: '正常'},
        {value: 22, name: '故障'},
        {value: 12, name: '离线'},
        {value: 1548, name: '未知'}]
      ]
      const yDatas = {
        seriesName: '网络设备状态',
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
     * [getChartHeight 获取高度]
     * @return {[type]} [返回高度]
     */
    getChartHeight () {
      if (this.collapse) {
        return this.$store.getters.getContentHeight * 0.48 - 70 + 'px'
      } else {
        return '0'
      }
    }
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
