<template>
  <div class="progress-bar" ref="progressBar" @click="clickProgress">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper">
        <div class="progress-btn" ref="progressBtn" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"></div>
      </div>
    </div>
  </div>
</template>
<script>
import {prefixStyle} from 'common/js/dom'

const pergrossBtnWidth = 16
const transform = prefixStyle('transform')

export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  created () {
    this.touch = {}
  },
  methods: {
    touchstart (e) {
      this.touch.initiated = true
      this.touch.startX = e.touches[0].pageX
      this.touch.curProgressWidth = this.$refs.progress.clientWidth
    },
    touchmove (e) {
      if (!this.touch.initiated) {
        return
      }
      const distanceX = e.touches[0].pageX - this.touch.startX
      const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - pergrossBtnWidth, Math.max(0, this.touch.curProgressWidth + distanceX))
      this._offset(offsetWidth)
    },
    touchend () {
      this.touch.initiated = false
      this._triggerPercent()
    },
    clickProgress (e) {
      let rect = this.$refs.progressBar.getBoundingClientRect()
      let offsetWidth = e.pageX - rect.left
      this._offset(offsetWidth)
      // 点击progress-btn位置获取有误
      // this._offset(e.offsetX)
      this._triggerPercent()
    },
    _triggerPercent () {
      const barWidth = this.$refs.progressBar.clientWidth - pergrossBtnWidth
      const percent = this.$refs.progress.clientWidth / barWidth
      this.$emit('changePercent', percent)
    },
    _offset (offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`
      this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
    }
  },
  watch: {
    percent (newPercent) {
      if (newPercent >= 0 && !this.touch.initiated) {
        const barWidth = this.$refs.progressBar.clientWidth - pergrossBtnWidth
        const offsetWidth = newPercent * barWidth
        this._offset(offsetWidth)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'

.progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>
