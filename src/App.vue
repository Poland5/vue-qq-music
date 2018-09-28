<template>
  <div id="app">
    <head-top></head-top>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import HeadTop from '@/components/headTop/headTop'
import Tab from '@/components/tab/tab'
import Player from '@/components/player/player'
export default {
  name: 'App',
  components: {
    HeadTop,
    Tab,
    Player
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable.styl"
#app
  color $color-theme

</style>
