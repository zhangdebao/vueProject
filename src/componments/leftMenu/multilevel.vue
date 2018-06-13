<template lang="html">
  <div v-bind:style="getLeftMenu">
    <router-link v-if="this.back" :to="getBackQuery(menus[0])">
      <div v-if="level" class="menu-item">
        <span>{{menus[0].label}}</span>
        <span><i  class="iconfont icon-back"></i></span>
      </div>
    </router-link>
    <router-link
      v-for="item of getMenus"
      v-if="item.router && !item.childrens"
      active-class="iconActive"
      :to="getItemRouter(item)"
    >
    <div class="menu-item" >
      <span v-if="!getMenuCollapse">{{item.label}}</span>
      <span>
        <!-- <i  class="iconfont" v-bind:class="item.icon"></i> -->
      </span>
    </div>
  </router-link>

    <div v-else class="parent">
      <div @click="(item.collapse = !item.collapse)" class="title menu-item">
        <span v-if="!getMenuCollapse">{{item.label}}</span>
        <span>
          <i v-show="item.collapse" class="iconfont icon-down"></i>
          <i v-show="!item.collapse" class="iconfont icon-right"></i>
        </span>
      </div>
      <multi-menu
         @click-Menu="clickMenus"
      v-show="!item.collapse"
      :html="html"
      :menus="item.childrens" :query="query"></multi-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'multi-menu',
  props: {
    menus: {
      required: true,
      type: Array
    },
    level: {
      required: false,
      type: Number
    },
    query: {
      required: false,
      type: Object
    },
    back: {
      required: false,
      type: Object
    },
    html: {
      required: false,
      type: String
    }
  },
  data () {
    return {
      menuCollapse: false,
      menuWidth: this.$store.getters.getContentWidth * 0.145
    }
  },
  methods: {
    /**
     * [getParentHeight 获取负组件的高度]
     * @param  {[type]} item [子节点数组]
     * @return {[type]}      [返回高度]
     */
    getParentHeight (item) {
      if (item.collapse) {
        return '0'
      } else {
        return item.childrens.length * 34 + 'px'
      }
    },
    getItemRouter (item = []) {
      const route = item.router
      route.query = this.query
      return route
    },
    getBackQuery (item = []) {
      const route = item.router
      route.query = this.back
      return route
    },
    /**
     * [clickMenu 单击非路由菜单]
     * @param  {[type]} item [参数]
     * @return {[type]}      [description]
     */
    clickMenu (item) {
      this.$emit('click-Menu', item)
    },
    /**
     * [clickMenus 上传至父菜单]
     * @param  {[type]} item [参数]
     * @return {[type]}      [description]
     */
    clickMenus (item) {
      this.$emit('click-Menu', item)
    }
  },
  mounted: function () {
  },
  computed: {
    /**
     * [getLeftMenu 获取左侧导航样式]
     * @return {[type]} [description]
     */
    getLeftMenu () {
      if (this.level) {
        if (!this.getMenuCollapse) {
          this.menuWidth = this.$store.getters.getContentWidth * 0.165
          return {
            'background-color': 'rgba(51, 66, 89, 0.85)',
            'border-top': '1px solid rgba(132, 152, 175, 0.5)',
            'color': '#ffffff',
            transition: 'width 1s',
            height: '100%',
            overflow: 'auto'
          }
        } else {
          this.menuWidth = 50
          return {
            'background-color': 'rgba(51, 66, 89, 0.85)',
            'border-top': '1px solid rgba(132, 152, 175, 0.5)',
            'color': '#ffffff',
            transition: 'width 1s',
            height: '100%',
            overflow: 'auto'
          }
        }
      }
      return {
        height: '100%'
      }
    },
    /**
     * [getMenuCollapseStyle 获取按钮收起的图标]
     * @return {[type]} [description]
     */
    getMenuCollapseStyle () {
      return {
        'icon-left': !this.getMenuCollapse,
        'icon-left': this.getMenuCollapse
      }
    },
    /**
     * [getChildrenPosition 判断子节点的定位方式]
     * @return {[type]} [description]
     */
    getChildrenPosition () {
      if (this.level) {
        return 'relative'
      } else {
        return 'absolute'
      }
    },
    /**
     * [getMenuCollapse 获取span是否渲染]
     * @return {[type]} [description]
     */
    getMenuCollapse () {
      if (Object.is(typeof this.menuCollapse, 'undefined')) {
        return this.menuCollapse
      } else {
        return this.menuCollapse
      }
    },
    getMenus () {
      const menus = this.menus.filter((x, index) => {
        if (this.level) {
          return index > 0
        }
        return true
      })
      return menus
    }
  }
}
</script>

<style lang="stylus" scoped>

* {
  font-family: inherit;
  font-size: 16px;
}
.menu-item{
  padding: 13px 18px;
  // margin-left: 5px;
  // margin-right: 5px;
  // background-color: rgba(51, 66, 89, 0.95);
  color: #8498af;
  border-bottom: 1px solid rgba(132, 152, 175, 0.5);
  position: relative;
  cursor: pointer;
}
// 图标靠右
.menu-item>span:last-child{
  float: right;
}
.parent{
  padding: 0;
  position: relative;
}
// 含有二级菜单的样式
.parent{
  // border-bottom: 1px solid rgba(132, 152, 175, 0.5);
  .title.menu-item{
    border-bottom: none;
  }
  .title.menu-item + div{
    margin-left: 10px;
    span{
      font-size: 12px;
    }
    .menu-item{
      // background-color: rgba(51, 66, 89, 0.95);
      padding: 5px 18px;
      border-bottom: none;
    }
  }
}
.parent::after{
  content: '';
  border: 0.5px solid rgba(132, 152, 175, 0.5);
  height: 0;
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  position: absolute;
  top: 100%;
}
// 菜单悬浮颜色
.menu-item:hover{
  color: #eeeeef;
}
a{
  text-decoration: none;
}
.iconfont {
  font-size: 20px;
}
// 菜单激活的样式
.iconActive{
  .menu-item{
    color: #4d8ff3;
  }
}

.icon:hover:after{
  z-index: 9;
  content: attr(data-attr);
  background-color: rgba(51, 66, 89, 0.7);
  color: white;
  position: absolute;
  left: 60px;
  top: 0;
  color: white;
  padding: 5px 10px;
  border-radius: 2px;
  display: inline-block;
  position: absolute;
}
.triangle{
   position: absolute;
   height: 0;
   width: 0;
   left: 100%;
   top: 25%;
   border: 5px solid transparent;
   border-right-color: rgba(51, 66, 89, 0.7);
}
</style>
