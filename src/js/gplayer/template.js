import tplPlayer from './template/player.art'

class Template {
  constructor (options) {
    this.container = options.container
    this.options = options.options
    this.index = options.index
    this.init()
  }

  init () {
    this.container.innerHTML = tplPlayer({
      options: this.options,
      index: this.index,
      video: {
        current: true,
        pic: this.options.video.pic,
        preload: this.options.preload,
        url: this.options.video.url
      }
    })

    this.mask = this.container.querySelector('.mask')
    this.videoWrap = this.container.querySelector('.video-wrap')
    this.video = this.container.querySelector('.video-current')
    this.controller = this.container.querySelector('.controller')
    this.barWrap = this.container.querySelector('.bar-wrap')
    this.playedBar = this.container.querySelector('.played')
    this.loadedBar = this.container.querySelector('.loaded')
  }
}

export default Template