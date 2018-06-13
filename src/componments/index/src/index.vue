<template lang="html">
  <div>
    <Nav @switchCollapse="switchCollapse" :todos="leftMenu"></Nav>
      <div class="inline" v-bind:style="{height: contentHeight + 'px'}">
        <left-menu v-on:changeMenuCollapse="changeMenuCollapse" :todos="{data, level: 1}"></left-menu>
      </div>
      <div v-bind:style="{height: contentHeight + 'px' ,width: getContentWidth, transition: 'height .5s'}" class="inline">
        <transition name="fade">
          <!-- <keep-alive> -->
            <router-view/>
          <!-- </keep-alive> -->
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '../../nav/src/index.vue'
import leftMenu from '../../leftMenu/level.vue'
// import leftMenu from '../leftMenu/index.jsx'
export default {
  components: {
    Nav,
    'left-menu': leftMenu
  },
  data () {
    let data = []
    const language = this.$Tools.getBrowserLanguage()
    if (!Object.is(language, 'zh')) {
      data = require('./en-US')
    } else {
      data = require('./zh-CN')
    }
    return {
      data: data.default,
      screenWidth: this.$store.getters.getContentWidth,
      contentHeight: this.$store.getters.getContentHeight,
      leftMenu: {
          span: 4,
          activeIndex: '',
          isCollapse: false,
          data: []
      }
    }
  },
  mounted: function () {
    const that = this
    window.onresize = function () {
      that.screenWidth = window.innerWidth - 72
      that.contentHeight = window.innerHeight - 45
    }
  },
  methods: {
    switchCollapse (index) {
      this.leftMenu.isCollapse = !this.leftMenu.isCollapse
    },
    changeMenuCollapse (payload) {
      this.leftMenu.isCollapse = payload
    }
  },
  computed: {
    getContentWidth () {
      if (this.leftMenu.isCollapse) {
        return this.screenWidth + 'px'
      } else {
        return this.screenWidth  + 'px'
      }
    }
  },
  watch: {
    getContentWidth: {
      handler: function (val) {
        this.$store.commit('changeContentWidth', parseInt(val))
      }
    },
    contentHeight: {
      handler: function (val) {
        this.$store.commit('changeContentHeight', val)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.inline{
  display: inline;
  float: left;
}
// .fade-enter{
//   width: 0;
// }
// .fade-enter-active{
//   width: 100%;
//   transition: width 0.5s;
// }
//
// .fade-leave-active {
//   width: 100%;
//   transition: width 0.5s;
// }
// .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
//   width: 0;
// }

</style>
