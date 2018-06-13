<template lang="html">
  <div v-bind:style="getLeftMenu">
    <!-- <div @click="changeMenuCollapse" v-if="todos.level" class="menu-item collapseControler">
      <i  class="iconfont" v-bind:class="getMenuCollapseStyle"></i>
    </div> -->
    <router-link
      v-for="item of todos.data"
      v-if="!item.childrens"
      active-class="iconActive"
      :to="item.router"
    >
    <div class="menu-item" >
      <nobr>
        <span v-bind:class="{icon: getMenuCollapse}" @mouseenter="(hoverIndex=item.index)" @mouseleave="(hoverIndex='')" :data-attr="item.label">
          <i  class="iconfont" v-bind:class="item.icon"></i>
          <div v-show="Object.is(getHoverIndex, item.index)" class="triangle"></div>
        </span>
        <span v-if="!getMenuCollapse">{{item.label}}</span>
      </nobr>
    </div>
    </router-link>
    <div v-else class="parent">
      <div @click="(item.collapse = !item.collapse)" class="title menu-item">
        <nobr>
          <span v-bind:class="{icon: getMenuCollapse}" @mouseenter="(hoverIndex=item.index)" @mouseleave="(hoverIndex='')" :data-attr="item.label">
            <i v-show="item.collapse" class="iconfont icon-down"></i>
            <i v-show="!item.collapse" class="iconfont icon-up"></i>
            <div v-show="Object.is(getHoverIndex, item.index)" class="triangle"></div>
          </span>
          <span v-if="!getMenuCollapse">{{item.label}}</span>
        </nobr>
      </div>
      <left-menu
      v-show="!item.collapse"
      :todos="{data: item.childrens, menuCollapse: getMenuCollapse}"></left-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'left-menu',
  props: {
    todos: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      menuCollapse: true,
      menuWidth: 280,
      hoverIndex: ''
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
    /**
     * [changeMenuCollapse 切换收缩menuCollapse]
     * @return {[type]} [description]
     */
    changeMenuCollapse () {
      // this.menuCollapse = !this.menuCollapse
      this.menuCollapse = true
      this.$emit('changeMenuCollapse', this.menuCollapse)
    },
    getActiveColor () {

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
      if (this.todos.level) {
        if (!this.getMenuCollapse) {
          this.menuWidth = 280
          return {
            'background-color': '#334259',
            'border-top': '1px solid rgba(132, 152, 175, 0.5)',
            'color': '#ffffff',
            width: this.menuWidth + 'px',
            transition: 'width 1s',
            height: '100%'
          }
        } else {
          this.menuWidth = 60
          return {
            'background-color': '#334259',
            'border-top': '1px solid rgba(132, 152, 175, 0.5)',
            'color': '#ffffff',
            width: this.menuWidth + 'px',
            transition: 'width 1s',
            height: '100%'
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
        'icon-go': !this.getMenuCollapse,
        'icon-back': this.getMenuCollapse
      }
    },
    /**
     * [getChildrenPosition 判断子节点的定位方式]
     * @return {[type]} [description]
     */
    getChildrenPosition () {
      if (this.todos.level) {
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
      if (Object.is(typeof this.todos.menuCollapse, 'undefined')) {
        return this.menuCollapse
      } else {
        return this.todos.menuCollapse
      }
    },
    getHoverIndex () {
      return this.hoverIndex
    }
  }
}
</script>

<style lang="stylus" scoped>
* {
  font-family: inherit;
  font-size: 14px;
}
.collapseControler {
  text-align: center;
}
.menu-item{
  margin-left: 1px;
  margin-right: 1px;
  padding: 8px 13px;
  margin-left: 5px;
  margin-right: 5px;
  background-color: #334259;
  color: white;
  // border-bottom: 1px solid rgba(132, 152, 175, 0.2);
  position: relative;
  font-size: 24px;
  cursor: pointer;
}
.parent{
  padding: 0;
  // position: relative;
}
.menu-item:hover{
  // background-color: rgb(103, 106, 100);
}
.title.menu-item:hover{
  // background-color: rgb(79, 175, 254);
}
a{
  text-decoration: none;
}
.iconfont {
  font-size: 24px;
}

.icon{
  color: rgba(132, 152, 175, 1);
}
.icon:hover{
  color: #eeeeef;
}
.iconActive  .icon{
  color: #4d8ff3;
}

.icon:hover:after{
  z-index: 9;
  content: attr(data-attr);
  background-color: #4d8ff3;
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
   z-index: 999;
   position: absolute;
   height: 0;
   width: 0;
   left: 100%;
   top: 25%;
   border: 5px solid transparent;
   border-right-color: #4d8ff3;
}
</style>
