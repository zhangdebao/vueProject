<template lang="html">
  <button type="button"
    @click="clickEvent"
    :disabled="disabled"
    v-bind:style="getButtonStyle"
    class="mini-button"
    v-bind:class="getClass"
  >
  <i class="mini-button iconfont" :class="icon"></i>
  <nobr>{{label ? label : ''}}</nobr>
</button>
</template>

<script>
export default {
  name: 'common-button',
  props: {
    type: {
      required: false,
      type: String
    },
    styles: {
      required: false,
      type: Object
    },
    disabled: {
      required: false,
      type: Boolean
    },
    label: {
      required: false,
      type: String
    },
    icon: {
      required: false,
      type: String
    }
  },
  methods: {
    clickEvent (e) {
      this.$emit('click', e)
    }
  },
  computed: {
    /**
     * [getButtonColor 获取按钮样式]
     * @return {[type]} [description]
     */
    getButtonStyle () {
      if (!Object.is(this.type, 'text')) {
        if (this.styles) {
          return this.styles
        } else {
          return {
            // color: 'rgb(176, 177, 177)',
            // 'background-color': 'rgba(219, 220, 220, 0.2)'
            color: 'white',
            'background-color': '#59C7f9'
          }
        }
      }
      return {
        'margin': 'auto 0',
        color: '#59C7f9'
      }
    },
    getClass () {
      return {
        text: this.type ? true : false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.mini-button {
  font-size: 14px;
}
button{
    white-space: nowrap;
    background: #fff;
    cursor: pointer;
    border: none;
    color: #606266;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    transition: .1s;
    font-weight: 500;
    padding: 5px 20px;
    // border-radius: 3px;
}
button[disabled="disabled"]{
  cursor: not-allowed;
}
.text{
  border: none;
  // background-color: white;
  // color: grey
  // padding: 0;
}
.text:hover{
  padding: auto 0;
  background-color: rgb(217, 218, 205);
  // background-color
}
.el-dropdown-menu__item:hover{
  background-color: rgb(217, 218, 205);
}

</style>
