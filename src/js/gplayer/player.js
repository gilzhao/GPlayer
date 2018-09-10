import Promise from 'promise-polyfill'

import utils from './utils'
import ConfigOption from './options'
import Events from './events'
import FullScreen from './fullscreen'
import Template from './template'
import Icons from './icons'
import Bar from './bar'
import Timer from './timer'
import Controller from './controller'
import Setting from './setting'
import Volume from './volume'
import Bezel from './bezel'

let index = 0
const instances = []

class GPlayer {

  constructor(options) {
    this.options = ConfigOption(options)
    this.container = this.options.container
    this.container.classList.add('gplayer')
    this.template = new Template({
      container: this.container,
      options: this.options,
      index: index
    })
    this.events = new Events()
    this.timer = new Timer(this)
    this.controller = new Controller(this)
    this.fullScreen = new FullScreen(this)
    this.setting = new Setting(this)
    // this.volume = new Volume(this)
    this.bar = new Bar(this.template)
    this.bezel = new Bezel(this.template.bezel)

    document.addEventListener('click', () => {
      this.focus = false
    }, true)

    this.container.addEventListener('click', () => {
      this.focus = true
    }, true)

    this.paused = true
    this.video = this.template.video
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

    this.video.currentTime = time
    this.bar.set('played', time / this.video.duration, 'width')
    this.template.ptime.innerHtml = utils.secondToTime(time)
  }

  /**
   * Play video
   */
  play() {
    this.paused = false

    // if (this.video.pause) {
    //   this.bezel.switch('')
    // }

    this.template.playButton.innerHTML = Icons.pause

    const playedPromise = Promise.resolve(this.video.play())
    playedPromise.catch(() => {
      this.pause()
    }).then(() => {})

    this.timer.enable('loading')
    this.container.classList.remove('player-paused')
    this.container.classList.add('player-playing')
  }

  /**
   * Pause video
   */
  pause() {
    this.paused = true
    this.container.classList.remove('player-loading')

    // if (!this.video.paused) {
    //   this.bezel.switch(Icons.play)
    // }

    this.template.playButton.innerHTML = Icons.play
    this.video.pause()
    this.timer.disable('loading')
    this.container.classList.remove('player-playing')
    this.container.classList.add('player-paused')
  }

  switchVolumeIcon() {
    if (!this.volume()) {
      this.template.volumeButton.innerHTML = Icons.volumeUp
    } else {
      this.template.volumeButton.innerHTML = Icons.volumeOff
    }
  }

  volume() {
    // this.switchVolumeIcon()
    return this.video.muted
  }

  /**
   * Toggle between play and pause
   */
  toggle() {
    if (this.video.paused) {
      this.play()
    } else {
      this.pause()
    }
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
        this.template.dtime.innerHTML = utils.secondToTime(video.duration)
      }
    })

    // show video loaded bar: to inform interested parties of progress downloading the media
    this.on('progress', () => {
      const percentage = video.buffered.length ? video.buffered.end(video.buffered.length - 1) / video.duration : 0
      this.bar.set('loaded', percentage, 'width')
    })

    // video download error: an error occurs
    this.on('error', () => {
      if (!this.video.error) {
        // Not a video load error, may be poster load failed, see #307
        return
      }
      this.toast('Video load failed', -1)
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

      const currentTime = utils.secondToTime(this.video.currentTime)
      if (this.template.ptime.innerHTML !== currentTime) {
        this.template.ptime.innerHTML = currentTime
      }
    })

    for (let i = 0; i < this.events.videoEvents.length; i++) {
      video.addEventListener(this.events.videoEvents[i], () => {
        this.events.trigger(this.events.videoEvents[i])
      })
    }

    this.switchVolumeIcon()
  }

  toast(text, time = 2000, opacity = .8) {
    this.template.toast.innerHTML = text
    this.template.toast.style.opacity = opacity

    if (this.toastTime) {
      clearTimeout(this.toastTime)
    }

    this.events.trigger('toast_show', text)

    if (time > 0) {
      this.toastTime = setTimeout(() => {
        this.template.toast.style.opacity = 0
        this.events.trigger('toast_hide')
      }, time)
    }
  }

  resize () {
    this.events.trigger('resize')
  }
}

export default GPlayer