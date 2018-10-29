<template>
  <transition name="slide">
    <music-list :rank="rank" :title="title" :bgImage="bgImage" :songs="songs"></music-list>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex'
import MusicList from '@/components/musicList/musicList'
import { getMusicList } from 'api/rank'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'

export default {
  data () {
    return {
      songs: [],
      rank: true
    }
  },
  components: {
    MusicList
  },
  computed: {
    ...mapGetters([
      'topList'
    ]),
    title () {
      return this.topList.topTitle
    },
    bgImage () {
      return this.topList.picUrl
    }
  },
  created () {
    this._getMusicList()
  },
  methods: {
    _getMusicList () {
      if (!this.topList.id) {
        this.$router.push('/rank')
        return
      }
      getMusicList(this.topList.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalize(res.songlist)
        }
      })
    },
    _normalize (songs) {
      let ret = []
      songs.forEach((item) => {
        const musicData = item.data
        if (musicData.albumid && musicData.songid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
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
