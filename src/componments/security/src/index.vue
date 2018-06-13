<template lang="html">
  <div>
    <div class="inline-blocks topNav" :style="{height: getContentHeight}">
      <!-- 三级导航栏 -->
      <multi-menu @click-Menu="clickMenu" :html="html" :menus="menus" :level="1" :query="getRouterQuery" :back="{}"></multi-menu>
    </div>
    <div class="inline-blocks">
      <router-view/>
    </div>
  </div>
</template>

<script>
/*
  引入需要的模块或者组件
 */
import Tools from '../../../assets/js/tools/app.js'
import leftMenu from '../../leftMenu/multilevel.vue'
/* 引入数据源 */
let form = require('./config.js').json

export default {
  /* 注册组件 */
  components: {
    'multi-menu': leftMenu
  },
  data () {
    return {
      menus: form.menus,
      html: ''
    }
  },
  /* 生命周期钩子 */
  created: function () {
  },
  methods: {
    clickMenu (payload) {
      this.html = ''
    }
  },
  computed: {
    getContentHeight () {
      return this.$store.getters.getContentHeight + 'px'
    },
    getRouterQuery () {
      return this.$route.query
    }
  }
}

</script>

<style lang="stylus" scoped>
.inline-blocks{
  display:inline-block;
  float:left;
}
.topNav{
  background-color:rgb(163, 159, 172);
  width: 16.5%;
}
.topNav + div{
  width: 83.5%;
}
</style>
