import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/page/recommend/recommend'
import Disc from '@/page/recommend/children/disc'
import Singer from '@/page/singer/singer'
import SingerDetail from '@/page/singer/children/singerDetail'
import Rank from '@/page/rank/rank'
import TopList from '@/page/rank/children/topList'
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
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
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
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
