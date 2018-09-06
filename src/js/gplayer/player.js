import Promise from 'promise-polyfill'

import utils from './utils'
import handleOption from './options'
import Events from './events'
import Template from './template'
import Bar from './bar'
import Timer from './timer'
import Controller from './controller'
import Setting from './setting'

let index = 0
const instances = []

class GPlayer {

  constructor(options) {
    this.options = handleOption(options)
    this.events = new Events()
    this.container = this.options.container
    this.container.classList.add('gplayer')

    if (utils.isMobile) {
      // this.container.classList.add('player-mobile')
    }

    this.template = new Template({
      container: this.container,
      options: this.options,
      index: index
    })

    this.video = this.template.video
    this.bar = new Bar(this.template)
    this.container = new Controller(this)
    this.setting = new Setting(this)

    document.addEventListener('click', () => {
      this.focus = false
    }, true)

    // this.container.addEventListener('click', () => {
    //   this.focus = true
    // }, true)

    this.paused = true
    this.timer = new Timer(this)

    this.initVideo(this.video)

    index++
    instances.push(this)
  }

  /**
   * Seek video
   */
  seek(time) {
    time = Math.max(time, 0)
    if (this.video.duration) {
      time = Math.min(time, this.video.duration)
    }
  }

  /**
   * Play video
   */
  play() {
    this.paused = false

    const playedPromise = Promise.resolve(this.video.play())
    playedPromise.catch(() => {
      this.pause()
    }).then(() => {})
    this.timer.enable('loading')
  }

  /**
   * Pause video
   */
  pause() {
    this.pause = true
    this.video.pause()
  }

  /**
   * attach event
   */
  on(name, callback) {
    this.events.on(name, callback)
  }

  initMSE(video, type) {
    this.type = type

    if (this.type === 'auto') {
      if (/m3u8(#|\?|$)/i.exec(video.src)) {
        this.type = 'hls'
      } else if (/.flv(#|\?|$)/i.exec(video.src)) {
        this.type = 'flv'
      } else if (/.mpd(#|\?|$)/i.exec(video.src)) {
        this.type = 'dash'
      } else {
        this.type = 'normal'
      }
    }

    if (this.type === 'hls' && (video.canPlayType('application/x-mpegURL') || video.canPlayType('application/vnd.apple.mpegURL'))) {
      this.type = 'normal'
    }

    // TODO: 类型检测处理 && 提示
  }

  initVideo(video, type) {
    this.initMSE(video, type)

    /**
     * video events
     */
    // show video time: the metadata has loaded or changed
    this.on('durationchange', () => {
      // compatibility: Android browsers will output 1 or Infinity at first
      if (video.duration !== 1 && video.duration !== Infinity) {
        // this.template.dtime.innerHTML = utils.secondToTime(video.duration)
      }
    })

    // show video loaded bar: to inform interested parties of progress downloading the media
    this.on('progress', () => {
      const percentage = video.buffered.length ? video.buffered.end(video.buffered.length - 1) / video.duration : 0
      this.bar.set('loaded', percentage, 'width')
    })

    this.on('play', () => {
      if (this.paused) {
        this.play()
      }
    })

    this.on('pause', () => {
      if (!this.paused) {
        this.pause()
      }
    })

    this.on('timeupdate', () => {
      this.bar.set('played', this.video.currentTime / this.video.duration, 'width')
    })

    for (let i = 0; i < this.events.videoEvents.length; i++) {
      video.addEventListener(this.events.videoEvents[i], () => {
        this.events.trigger(this.events.videoEvents[i])
      })
    }
  }
}

export default GPlayer