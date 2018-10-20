<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex'
import { getSongList } from 'api/recommend'
import { ERR_OK } from 'api/config'
import MusicList from '@/components/musiclist/musiclist'

export default {
  components: {
    MusicList
  },
  computed: {
    ...mapGetters([
      'disc'
    ]),
    title () {
      return this.disc.dissname
    },
    bgImage () {
      return this.disc.imgurl
    }
  },
  created () {
    this._getSongList()
  },
  methods: {
    _getSongList () {
      if (!this.disc.dissid) {
        this.$router.push('/recommend')
        return
      }
      getSongList(this.disc.dissid).then((res) => {
        console.log(res)
        if (res.code === ERR_OK) {
          console.log(res)
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>

.slide-enter-active, .slide-leave-active
  transition all .3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>
