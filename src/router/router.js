import Vue from 'vue'
import Router from 'vue-router'
import routerLose from '@/views/routerLose'
import sample from '@/views/sample'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/sample',
      name: 'sample',
      component: sample,
      meta: {
        title: '页面标题'
      }
    },
    {
      path: '/*',
      name: 'routerLose',
      component: routerLose,
      meta: {
        title: '网页迷失了'
      }
    }
  ]
})
