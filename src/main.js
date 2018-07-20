// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'

import Navigation from 'vue-navigation'
Vue.use(Navigation, {router})

import viewTitle from 'vue-wechat-title'
Vue.use(viewTitle)

import 'lib-flexible/flexible.js' // 设备适配
require('fastclick').attach(document.body) // 移除移动端点击延迟

require('./assets/less/import.less') // 引入全局样式
Vue.prototype.api = require('./api/api').default // 引入api列表
Vue.prototype.$ = require('./assets/js/base').default // 引入共用js

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})