import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import CommonButton from './componments/common/CommonButton.vue'
import './assets/theme/sino-icon/iconfont.css'
import './assets/theme/common.styl'
import router from './router/index'
import { store } from './store/state.js'
import App from './componments/app.vue'
import { Request } from './assets/js/tools/axios'
import locale from 'element-ui/lib/locale/lang/en'
import Tools from './assets/js/tools/app'
import MyForm from './assets/js/tools/form.js'
import Dates from './assets/js/tools/date.js'
import Tips from './assets/js/tools/tips'
/* eslint-disable */
Object.defineProperty(Vue.prototype, '$Axios', {value: Request})
Object.defineProperty(Vue.prototype, '$Tools', {value: Tools.defalut})
Object.defineProperty(Vue.prototype, '$Dates', {value: Dates.defalut})
Object.defineProperty(Vue.prototype, '$Form', {value: MyForm.default})
Object.defineProperty(Vue.prototype, '$Tips', {value: Tips.defalut})

const lang = Tools.defalut.getBrowserLanguage()
if (!Object.is(lang, 'zh')) {
  Vue.use(ElementUI, { locale })
} else {
  Vue.use(ElementUI)
}
/**
 * [开发组件]
 * @param  {[type]} Vue [description]
 * @return {[type]}     [description]
 */
CommonButton.install = function (Vue) {
  Vue.component(CommonButton.name, CommonButton)
}
/**
 * [el 使用插件]
 * @type {String}
 */
Vue.use(CommonButton)
new Vue({
  el: '#app',
  store,
  router,
  render: (h) => h(App)
})
