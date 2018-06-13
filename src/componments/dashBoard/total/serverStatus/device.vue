<template lang="html">
  <el-card :body-style="{padding: 0}">
    <div slot="header">
      <span>{{getNetworkTitle}}</span>
      <el-button-group>
        <el-button type="text" @click="sendMessageServer({time: 'mouth'})">月</el-button>
        <el-button type="text" @click="sendMessageServer({time: 'day'})">日</el-button>
        <el-button type="text" @click="sendMessageServer({time: 'hours'})">时</el-button>
        <el-button type="text" @click="collapse = !collapse">
          <i v-if="collapse" class="iconfont icon-up"></i>
          <i v-else="collapse" class="iconfont icon-down"></i>
        </el-button>
      </el-button-group>
    </div>
    <el-carousel indicator-position="outside" :height="getChartHeight" trigger="click" :autoplay="false" >
      <el-carousel-item key="1">
        <div id="serverCpuStatus" v-bind:style="{transition: 'height 1s', height: getChartHeight, width: '100%'}"></div>
      </el-carousel-item>
      <el-carousel-item key="2" >
        <div id="serverTotalMemoryStatus" v-bind:style="{transition: 'height 1s', height: getChartHeight, width: '100%'}"></div>
      </el-carousel-item>
    </el-carousel>
  </el-card>
</template>

<script>
const echarts = require('echarts')
import CommonConfig from '../../../../assets/js/language/config'
// 服务器属性
const updateChart = {
  // totalThread: 0,
  cpuRatio: 0.1,
  // maxMemory: 0,
  totalMemory: 0,
  // freeMemory: 0,
  // totalMemorySize: 0,
  freePhysicalMemorySize: 0,
  // usedMemory: 0,
  osName: '',
  time: 0
}
// 数据数组
const yData = function () {
  const yData = []
  const keys = Object.keys(updateChart)
  keys.splice(0, 2)
  keys.forEach(x => {
    yData.push([])
  })
  return yData
}
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
      stompClient: null,
      updateChart: updateChart,
      yData: yData(),
      length: 0
    }
  },
  created: function () {
  },
  mounted: function () {
    // 创建websocket
    this.initWebsocket()
  },
  updated: function () {
  },
  /**
   * [description]
   * @return {[type]} [销毁组件]
   */
  destroyed: function () {
    // 强制关闭websocket
    this.stompClient.disconnect(() => {
    })
  },
  methods: {
    /**
     * [initserverCpuStatus 绘制echarts]
     * @return {[type]}              [无返回]
     */
    initserverCpuStatus ({names = [], id = '', yData = [[]], formatter}) {
      let options = {}
      let cpuChart = echarts.init(document.getElementById(id))
      if (!Object.is(cpuChart, null)) {
        cpuChart.dispose()
      }
      cpuChart = echarts.init(document.getElementById(id))
      const yDatas = {
        seriesName: ``,
        color: this.form.alarmColor,
        yData: yData,
        names
      }
      options = this.todos.getLineOptions(yDatas)
      options.tooltip.formatter = formatter
      cpuChart.setOption(options)
    },
    /**
     * [getEchartsData 获取图表数据]
     * @return {[type]} [description]
     */
    getEchartsData ({updateChartItem = {}, id = '', totalDatas = [[]], formatter}) {
      const charts = echarts.init(document.getElementById(id))
      const values = Object.values(updateChartItem)
      const series = []
      totalDatas.forEach((item, index) => {
        if (item.length > this.length) {
          item.shift()
        }
        item.push({
          value: values[index],
          name: updateChartItem.time
        })
        series.push({
          type: 'line',
          data: item
        })
      })
      // 时间轴数据
      const Xdata = series[0].data.map(x => {
        if (Object.is(typeof x.name, 'number')) {
          let date = this.$Dates.timeFormateStr(x.name)
          let str = this.$Dates.dateFormateStr({date: date, str: 'HH:mm:ss'})
          return str
        }
        return x.name
      })
      const options = {
        tooltip: {
          trigger: 'axis',
          // formatter: `{a0}/{a1} <br/>{b}: <br/>({c0}/{c1}%)`
          formatter: formatter
        },
        series: series
      }
      options.xAxis = {
        data: Xdata
      }
      charts.setOption(options)
    },
    sendMessageServer (params = {}) {
      this.stompClient.send('/serverinfo', {}, JSON.stringify(params)) //发送信息
    },
    /**
     * [initWebsocket 初始化websocket]
     * @return {[type]} [description]
     */
    initWebsocket () {
      const SockJS = require('sockjs-client')
      const Stomp = require('@stomp/stompjs')
      const socket = new SockJS('http://192.168.2.244:8080/serverinfo')
      this.stompClient = Stomp.over(socket)  //创建STOMP客户端
      this.stompClient.connect({}, (frame) => {   //连接到服务器
          this.stompClient.send('/serverinfo', {}, JSON.stringify({
            time: 'mouth'
          })) //发送信息
          this.stompClient.subscribe('/ws-be/serverinfo', (receive) => { //订阅并接收消息
            let time = new Date().getTime()
            const body = window.JSON.parse(receive.body)
            if (Array.isArray(body)) {
              // 多条数据
              this.length = body.length
              this.initWebsocketYdata(body)
            } else {
              // 单条数据
              this.updateChartItem(body)
            }
          })
      })
    },
    /**
     * [initWebsocketYdata 初始化webscoket数据]
     * @param  {Array}  [itemArray=[]] [websocket初始的数据]
     * @return {[type]}                [description]
     */
    initWebsocketYdata (itemArray = []) {
      // 清空数据源
      this.yData.forEach(x => {
        x.splice(0)
        return x
      })
      // websocket初始的数据 填入数据源中
      itemArray.forEach(item => {
        const values = Object.values(item)
        this.yData.forEach((x, index) => {
          if (x.length > 150) {
            x.shift()
          }
          let date = this.$Dates.timeFormateStr(item.time)
          let str = this.$Dates.dateFormateStr({date: date, str: 'HH:mm:ss'})
          x.push({
            value: values[index],
            name: str
          })
        })
      })
      this.initserverCpuStatus({
        names: ['cpuRatio'],
        id: 'serverCpuStatus',
        yData: [this.yData[0]],
        // 格式化提示tooltip
        formatter: function (params, ticket, callback) {
          return `${params[0].axisValue}<br/>
          ${params[0].seriesName}:   ${params[0].value}%<br/>`
        }
      })
      this.initserverCpuStatus({
        names: ['totalMemory', 'freePhysicalMemorySize'],
        id: 'serverTotalMemoryStatus',
        yData: [this.yData[1], this.yData[2]],
        // 格式化提示tooltip
        formatter: function (params, ticket, callback) {
            if (Object.is(params.length, 2)) {
              let par = `${window.parseFloat(params[0].value/params[1].value).toFixed(2)}%`
              return `${params[0].axisValue}<br/>
              ${params[0].seriesName}:   ${params[0].value}<br/>
              ${params[1].seriesName}:   ${params[1].value}<br/>
              占比例:  ${par}`
            }
            return `${params[0].axisValue}<br/>
            ${params[0].seriesName}:   ${params[0].value}<br/>`
        }
      })
    },
    /**
     * [updateChartItem websocket实时更新的数据]
     * @param  {Object} [item={}] [实时的数据]
     * @return {[type]}           [description]
     */
    updateChartItem (item = {}) {
      // CPU统计
      this.getEchartsData({
        updateChartItem: {
          cpuRatio: item.cpuRatio,
          time: item.time
        },
        id: 'serverCpuStatus',
        totalDatas:  [this.yData[0]],
        // 格式化提示tooltip
        formatter: function (params, ticket, callback) {
          return `${params[0].axisValue}<br/>
          ${params[0].seriesName}:   ${params[0].value}%<br/>`
        }
      })
      // totalMemory统计、freePhysicalMemorySizetong
      this.getEchartsData({
        updateChartItem: {
          totalMemory: item.totalMemory,
          freePhysicalMemorySize: item.freePhysicalMemorySize,
          time: item.time
        },
        id: 'serverTotalMemoryStatus',
        totalDatas: [this.yData[1], this.yData[2]],
        // 格式化提示tooltip
        formatter: function (params, ticket, callback) {
            if (Object.is(params.length, 2)) {
              let par = `${window.parseFloat(params[0].value/params[1].value).toFixed(2)}%`
              return `${params[0].axisValue}<br/>
              ${params[0].seriesName}:   ${params[0].value}<br/>
              ${params[1].seriesName}:   ${params[1].value}<br/>
              占比例:  ${par}`
            }
            return `${params[0].axisValue}<br/>
            ${params[0].seriesName}:   ${params[0].value}<br/>`
        }
      })
    }
  },
  computed: {
    /**
     * [getChartHeight 获取echarts高度]
     * @return {[type]} [返回高度]
     */
    getChartHeight () {
      if (this.collapse) {
        return this.$store.getters.getContentHeight * 0.48 - 70 + 'px'
      } else {
        return '0'
      }
    },
    getNetworkTitle () {
      return `${this.todos.networkTitle} - ${this.updateChart.osName}`
    },
    /**
     * [getYData  获取数据容器]
     * @return {[type]} [description]
     */
    getYData () {
      const yData = []
      const keys = Object.keys(this.updateChart)
      keys.splice(0, 2)
      keys.forEach(x => {
        yData.push([])
      })
      return yData
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
