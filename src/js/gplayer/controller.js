import utils from './utils'

class Controller {
  constructor(player) {
    this.player = player
    this.autoHideTimer = 0

    this.initPlayButton()
    this.initPlayedBar()
  }

  initPlayButton() {
    this.player.template.playButton.addEventListener('click', () => {
      this.player.toggle()
    })
    this.player.template.videoWrap.addEventListener('click', () => {
      this.toggle()
    })
    // this.player.template.controllerMask.addEventListener('click', () => {
    //   this.toggle()
    // })
  }

  initPlayedBar() {
    const thumbMove = (e) => {
      let percentage = ((e.clientX || e.changedTouches[0].clientX) - utils.getBoundingClientRectViewLeft(this.player.template.barWrap)) / this.player.template.barWrap.clientWidth
      percentage = Math.max(percentage, 0)
      percentage = Math.min(percentage, 1)
      this.player.bar.set('played', percentage, 'width')
      this.player.template.ptime.innerHTML = utils.secondToTime(percentage * this.player.video.duration)
    }

    const thumbUp = (e) => {
      document.removeEventListener(utils.nameMap.dragEnd, thumbUp)
      document.removeEventListener(utils.nameMap.dragMove, thumbMove)
      let percentage = ((e.clientX || e.changedTouches[0].clientX) - utils.getBoundingClientRectViewLeft(this.player.template.barWrap)) / this.player.template.barWrap.clientWidth
      percentage = Math.max(percentage, 0)
      percentage = Math.min(percentage, 1)
      this.player.bar.set('played', percentage, 'width')
      this.player.seek(this.player.bar.get('played') * this.player.video.duration)
      this.player.timer.enable('progress')
    }

    this.player.template.barWrap.addEventListener(utils.nameMap.dragStart, () => {
      this.player.timer.disable('progress')
      document.addEventListener(utils.nameMap.dragMove, thumbMove)
      document.addEventListener(utils.nameMap.dragEnd, thumbUp)
    })
  }

  setAutoHide() {
    this.show()
    clearTimeout(this.autoHideTimer)
    this.autoHideTimer = setTimeout(() => {
      if (this.player.video.played.length && !this.player.paused && !this.disableAutoHide) {
        this.hide()
      }
    }, 3000)
  }

  show() {
    this.player.container.classList.remove('hide-controller')
  }

  hide() {
    this.player.container.classList.add('hide-controller')
    this.player.setting.hide()
  }

  isShow() {
    return !this.player.container.classList.contains('hide-controller')
  }

  toggle() {
    if (this.isShow()) {
      this.hide()
    } else {
      this.show()
    }
  }
}

export default Controller