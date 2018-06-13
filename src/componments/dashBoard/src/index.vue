<template lang="html">
  <el-card class="commmonScoll">
    <!-- <div slot="header">
      <el-breadcrumb class="inline-block" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item of form.nav"
        :to="item.router"
        >{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
    <el-row>
      <div class="cardModdule" v-bind:style="{width: '79%', 'margin-right': '1%', 'margin-bottom': '1%'}">
        <deviceTotal :todos="getCardMethods"></deviceTotal>
      </div>
      <div class="cardModdule" v-bind:style="{width: '20%', 'margin-bottom': '1%'}">
        <progressTotal :todos="getCardMethods"></progressTotal>
      </div>
    </el-row>
    <el-row>
      <div class="cardModdule cardPadd">
        <alarmTotal :todos="getCardMethods"></alarmTotal>
      </div>
      <div class="cardModdule cardPadd">
        <serverTotal :todos="getCardMethods"></serverTotal>
      </div>
    </el-row>
  </el-card>
</template>

<script>
import AlarmTotal from '../total/alarm.vue'
import DeviceTotal from '../total/serverStatus/device.vue'
import ServerTotal from '../total/server.vue'
import DeviceProGress from '../total/progress.vue'
const echarts = require('echarts')
export default {
  components: {
    'alarmTotal': AlarmTotal,
    'deviceTotal': DeviceTotal,
    'serverTotal': ServerTotal,
    'progressTotal': DeviceProGress
  },
  data () {
    return {
      form: require('./config').json,
      span: 8
    }
  },
  mounted: function () {
  },
  methods: {
    /**
     * [getPieOptions 获取饼状图options]
     * @param  {[type]} seriesName  [名称]
     * @param  {[type]} color       [颜色数组]
     * @param  {Array}  [yData=[]}] [数据源]
     * @return {[type]}             [返回options]
     */
    getPieOptions ({seriesName, color, yData = []}) {
      const Xdata = yData[0].map(x => x.name)
      const options = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          top: '10%',
          itemGap: 15,  //图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
          itemWidth: 12,  //图例标记的图形宽度
          itemHeight: 6,  //图例标记的图形高度。
          orient: 'horizontal',
          type: 'scroll',  //滚动条
          pageIconColor: '#888888',   //翻页按钮的颜色。
          pageIconSize: 12,  //翻页按钮的大小。可以是数字，也可以是数组，如 [10, 3]，表示 [宽，高]。
          textStyle: {     //文本样式
            color: '#888888',
            fontSize: 12
          },
          data: Xdata
        },
        color: color,
        series: [
          {
            name: seriesName,
            y: 'bottom',
            type: 'pie',
            center: ['50%', '60%'],
            radius: ['42%', '55%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '13',
                        fontWeight: 'bold',
                        color: '#888888'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: yData[0]
          }
        ]
      }
      return options
    },
    /**
     * [getLineOptions 获取折线图options]
     * @param  {[type]} seriesName  [名称]
     * @param  {[type]} color       [颜色的数组]
     * @param  {Array}  [yData=[]}] [数据源]
     * @return {[type]}             [返回ooptions]
     */
    getLineOptions ({seriesName, color, yData = [], names = []}) {
      const Xdata = yData[0].map(x => x.name)
      if (Object.is(names.length, 0)) {
        names = ['告警']
      }
      const series = names.map((item, index) => {
        return {
          center: ['50%', '60%'],
          data: yData[index].map(x => x.value),
          type: 'line',
          smooth: true,
          name: item,
          symbol: 'rect',
          areaStyle: {}
        }
      })
      const options = {
        legend: {
          data: names,
          top: '10%',
          textStyle: {     //文本样式
            color: '#888888',
            fontSize: 12
          },
          itemWidth: 16,  //图例标记的图形宽度
          itemHeight: 8,  //图例标记的图形高度。
        },
        grid: {
            top: '25%',
            left: '3%',
            right: '3%',
            bottom: '8%',
            containLabel: true
        },
        tooltip: {
          trigger: 'axis'
        },
        textStyle: {
          color: '#888888'
        },
        xAxis: {
          type: 'category',
          data: Xdata,
          axisLine: {
            // symbol: ['none', 'arrow'],
            // symbolSize: [8, 10],
            lineStyle: {
              color: '#888888'
            }
          },
          axisLabel: {
            textStyle: {
                fontSize: 10
            }
            // interval: 15
          }
        },
        color: ['#59c7f9','#ff7e7e', '#4d8ff3', '#48d5b2', '#ff79a2', '#6ee899', '#ffc36d', '#e6ebed', '#6e7074', '#546570', '#c4ccd3'],
        yAxis: {
          type: 'value',
          axisLine: {
            // symbol: ['none', 'arrow'],
            // symbolSize: [8, 10],
            lineStyle: {
              color: '#888888'
            }
          },
          axisLabel: {
            textStyle: {
                fontSize: 10
            }
          }
        },
        series: series
      }
      return options
    },
    /**
     * [getBarOptions 获取柱状图options]
     * @param  {[type]} seriesName  [名称]
     * @param  {[type]} color       [颜色数组]
     * @param  {Array}  [yData=[]}] [数据源]
     * @return {[type]}             [description]
     */
    getBarOptions ({seriesName, color, yData = []}) {
      const Xdata = yData[0].map(x => x.name)
      const options = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['统计'],
          top: '10%',
          itemGap: 15,  //图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
          itemWidth: 12,  //图例标记的图形宽度
          itemHeight: 6,  //图例标记的图形高度。
          orient: 'horizontal',
          type: 'scroll',  //滚动条
          pageIconColor: '#888888',   //翻页按钮的颜色。
          pageIconSize: 12,  //翻页按钮的大小。可以是数字，也可以是数组，如 [10, 3]，表示 [宽，高]。
          textStyle: {     //文本样式
            color: '#888888'
          }
        },
        grid: {   //位置
            top: '25%',
            left: '3%',
            right: '3%',
            bottom: '8%',
            containLabel: true
        },
        xAxis: {
          type: 'category',
          data: Xdata,
          axisLine: {
            // symbol: ['none', 'arrow'],   //箭头图标
            // symbolSize: [8, 10],
            lineStyle: {
              color: '#888888'
            }
          },
          axisLabel: {
            textStyle: {
                fontSize: 10
            }
            // interval: 0  //设置成 0 强制显示所有标签。
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            // symbol: ['none', 'arrow'],
            // symbolSize: [8, 10],
            lineStyle: {
              color: '#888888'
            }
          },
          axisLabel: {
            textStyle: {
                fontSize: 10
            }
          }
        },
        color: color,
        series: [
          {
            data: yData[0].map((x, index) => {
              return {
                value: x.value,
                itemStyle: {
                  color: color[index % 4]
                }
              }
            }),
            name: '统计',
            type: 'bar',
            barWidth: 20
          }
        ]
      }
      return options
    }
  },
  computed: {
    /**
     * [getCardMethods 获取子组件所需参数]
     * @return {[type]} [description]
     */
    getCardMethods () {
      return {
        width: this.$store.getters.getContentWidth,
        alarmTitle: this.form.alarmTitle,
        networkTitle: this.form.networkTitle,
        serverTitle: this.form.serverTitle,
        progressTitle: this.form.progressTitle,
        getPieOptions: this.getPieOptions,
        getLineOptions: this.getLineOptions,
        getBarOptions: this.getBarOptions
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .el-card__header{
    .el-button-group{
      float: right;
    }
  }
  .commmonScoll{
    background-color: #f6f6f6;
  }
  .cardModdule{
    float: left;
    background-color: #f6f6f6;
    // display: inline-block;
    .el-button-group{
      float: right;
    }
    button{
      padding: 3px 0;
    }
  }
  .cardPadd{
    width: 49.5%;
  }
  .cardPadd:first-child{
    margin: auto 1% 1% auto;
  }

</style>
