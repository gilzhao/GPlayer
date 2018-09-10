import Icons from './icons'
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
      icons: Icons,
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
    this.bezel = this.container.querySelector('.icon-bezel')

    // controller
    this.controller = this.container.querySelector('.controller')
    // bar-wrap
    this.barWrap = this.container.querySelector('.bar-wrap')
    this.playedBar = this.container.querySelector('.played')
    this.loadedBar = this.container.querySelector('.loaded')
    // play button and time
    this.playButton = this.container.querySelector('.icon-play')
    this.ptime = this.container.querySelector('.ptime')
    this.dtime = this.container.querySelector('.dtime')
    // volume
    this.volumeButton = this.container.querySelector('.icon-volume')
    // full screen
    this.browserFullButton = this.container.querySelector('.icon-full')
    this.webFullButton = this.container.querySelector('.icon-full-in')

    // error toast
    this.toast = this.container.querySelector('.toast')
  }
}

export default Template