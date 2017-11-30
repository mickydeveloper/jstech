import Vue from 'vue'
import Router from 'vue-router'
import Recent from '@/components/Recent'
import Settings from '@/components/Settings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'recent',
      component: Recent
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
  ]
})
