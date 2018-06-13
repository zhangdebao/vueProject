<template lang="html">
  <div class="topNav">
    <span class="logo"><i class="iconfont icon-menu"></i></span>
    <!-- <div class="level" data-index="0"><i class="iconfont icon-menu"></i></div> -->
    <!-- <div class="level" @mouseenter="setSecondMenu(1)" @mouseleave="removeSecondMenu" data-index="1">
        <div class="levelHeader">
          <div>配置管理</div>
          <div v-if="Object.is(menuIndex, 1)" class="triangle"></div>
        </div>
        <div v-if="Object.is(menuIndex, 1)"  @mouseenter="setSecondMenu(1)" @mouseleave="removeSecondMenu" class="secondLevel">
          <div>日志管理</div>
        </div>
    </div>
    <div class="level" @mouseenter="setSecondMenu(2)" @mouseleave="removeSecondMenu" data-index="2">
        <div class="levelHeader">
          <div>安全管理</div>
          <div v-if="Object.is(menuIndex, 2)" class="triangle"></div>
        </div>
        <div v-if="Object.is(menuIndex, 2)" @mouseenter="setSecondMenu(2)" @mouseleave="removeSecondMenu" class="secondLevel">
          <div>用户管理</div>
          <div>用户组管理</div>
        </div>
    </div> -->
    <div class="level" data-index="3">
      <span v-for="(item, index) of colors"  @click="goAlarm(item)" >
        <el-badge :value="(index + 1) * 11" v-bind:style="{'margin-right': '20px'}">
          <i class="iconfont" :class="item.icon" v-bind:style="{color:item.color}"></i>
        </el-badge>
      </span>
      <i class="iconfont icon-user"></i>
    </div>

  </div>

</template>

<script>
export default {
  data () {
    return {
      menuIndex: 0,
      colors: [
        {
          alarmLevel: 'Major',
          color: '#ff7e7e',
          icon: 'icon-Major'
        },
        {
          alarmLevel: 'Minor',
          color: '#4d8ff3',
          icon: 'icon-Minor'
        },
        {
          alarmLevel: 'Cirtical',
          color: '#48d5b2',
          icon: 'icon-Cirtical'
        },
        {
          alarmLevel: 'Normal',
          color: '#59c7f9',
          icon: 'icon-Normal'
        }
      ]
    }
  },
  methods: {
    setSecondMenu (index) {
      this.menuIndex = index
    },
    removeSecondMenu () {
      this.menuIndex = 0
    },
    getLeft (index) {
      return index * 0.15 * 100 + '%'
    },
    goAlarm (item) {
      this.$router.replace({
        path: '/currentAlarm',
        query: {
          alarmLevel: item.alarmLevel
        }
      })
    }
  },
  computed: {
  }
}
</script>

<style lang="stylus" scoped>
.topNav{
  background-color: rgb(51, 66, 89);
  color: white;
  width: 100%;
  // position: fixed;
  // position: relative;
}
.logo{
  height: 44px;
  line-height: 44px;
  i{
    font-size: 20px;
    margin-left: 20px;
  }
}
.level{
  padding: 10px 20px;
  min-width: 10%;
  display: inline-block;
  text-align: center;
  float: right;
}
.level::after{
  content: "";
  clear: both;
}
.triangle{
  display: inline-block;
  position: absolute;
  z-index: 99;
  width: 0;
  left: 40%;
  height: 0;
  border: 10px solid transparent;
  border-bottom-color: rgba(51, 66, 89, 0.6);
}
.levelHeader{
  position: relative;
}
.secondLevel{
  position: absolute;
  top: 49px;
  left: 0;
  z-index: 99;
  width: 100%;
  background-color: rgba(51, 66, 89, 0.6);
}
.secondLevel div{
  padding: 8px 20px;
  display: inline-block;
  float: left;
}
.level:first-child, .secondLevel div:first-child{
  margin-left: 10%;
}
.level:last-child{
  // margin-left: 78%;
  // float: right;
  .icon-user{
    margin-right: 30px;
    font-size: 20px;
    color: #4d8ff3;
  }
}
</style>
