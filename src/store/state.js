import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  contentWidth: window.innerWidth - 72,
  contentHeight: window.innerHeight - 45
}
const mutations = {
  changeContentWidth (state, contentWidth) {
    state.contentWidth = contentWidth
  },
  changeContentHeight (state, contentHeight) {
    state.contentHeight = contentHeight
  }
}
const actions = {
  changeContentWidth ({commit}, contentWidth) {
    commit('changeContentWidth', contentWidth)
  },
  changeContentHeight ({commit}, contentHeight) {
    commit('changeContentHeight', contentHeight)
  }
}
const getters = {
  getContentWidth (state) {
    return state.contentWidth
  },
  getContentHeight (state) {
    return state.contentHeight
  }
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
export { store }
