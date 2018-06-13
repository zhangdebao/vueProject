export default {
  name: 'left-menu',
  props: {
    todos: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      data: []
    }
  },
  mounted: function () {
    let data = []
    const language = this.$Tools.getBrowserLanguage()
    if (!Object.is(language, 'zh')) {
      data = require('./en-US')
    } else {
      data = require('./zh-CN')
    }
    this.todos.data = data.data
  },
  methods: {
    /**
     * [getSigleVNodes 获取单个虚拟节点]
     * @param  {[type]} createElement [创建节点]
     * @param  {[type]} item          [数据]
     * @return {[type]}               [返回虚拟DOM]
     */
    getSigleVNodes (createElement, item) {
      const VNode = createElement('el-menu-item', {
        attrs: {
          index: item.index,
          route: item.router
        }
      },
      [
        createElement('i', {
          attrs: {
            class: item.icon
          }
        }),
        createElement('span', {
          slot: 'title'
        },
        item.label)
      ])
      return VNode
    },
    /**
     * [getArrayVNodes 获取虚拟节点]
     * @param  {[type]} createElement [创建节点]
     * @param  {[type]} item          [数据]
     * @return {[type]}               [返回虚拟DOM]
     */
    getArrayVNodes (createElement, item) {
      let arrayVNodes = []
      arrayVNodes.push(
        createElement('template', {
          slot: 'title'
        },
        [
          createElement('i', {
            attrs: {
              class: item.icon
            }
          }),
          createElement('span', {
            slot: 'title'
          },
          item.label)
        ])
      )
      if (item.childrens && item.childrens.length > 0) {
        for (let items of item.childrens) {
          if (!items.childrens) {
            arrayVNodes.push(this.getSigleVNodes(createElement, items))
          } else {
            arrayVNodes.push(this.getArrayVNodes(createElement, items))
          }
        }
      }
      const VNode = createElement('el-submenu', {
        attrs: {
          index: item.index
        }
      },
      arrayVNodes
      )
      return VNode
    }
  },
  /**
   * [render 渲染]
   * @param  {[type]} createElement [description]
   * @return {[type]}               [description]
   */
  render (createElement) {
    let _this = this
    if (this.todos.data && this.todos.data.length) {
      let VNode = createElement('el-menu', {
        attrs: {
          router: true,
          'default-active': this.todos.activeIndex,
          'background-color': '#333744',
          'text-color': '#ffffff',
          'active-text-color': '#ffd04b',
          collapse: this.todos.isCollapse
        },
        style: {
          height: window.innerHeight - 50 + 'px'
        },
        'class': {
          'el-menu-vertical-demo': true
        }
      }, this.todos.data.map(function (item) {
        if (!item.childrens) {
          return _this.getSigleVNodes(createElement, item)
        } else {
          return _this.getArrayVNodes(createElement, item)
        }
      }))
      return VNode
    }
  }
}
