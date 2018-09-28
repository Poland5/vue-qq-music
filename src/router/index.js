import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/page/recommend/recommend'
import Singer from '@/page/singer/singer'
import SingerDetail from '@/page/singer/children/SingerDetail'
import Rank from '@/page/rank/rank'
import Search from '@/page/search/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
