import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import('../componments/index/src/index.vue')
const DashBoard = () => import('../componments/dashBoard/src/index.vue')
const TableDemo = () => import('../componments/tableDemo/src/index.vue')
const User = () => import('../componments/security/user/src/index.vue')
const Log = () => import('../componments/log/src/index.vue')

import NeConfigMenus from './neRouter'

Vue.use(Router)
export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: {name: 'DashBoard'},
      children: [
        {
          path: 'dashBoard',
          name: 'DashBoard',
          component: DashBoard
        },
        {
          path: 'TableDemo',
          name: 'TableDemo',
          component: TableDemo
        },
        NeConfigMenus.default,
        {
          path: '/user',
          name: 'User',
          component: User
        },
        {
          path: 'log',
          name: 'Log',
          component: Log
        }
      ]
    }
  ]
})
