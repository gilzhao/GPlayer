import utils from 'util'

class Setting {
  constructor (player) {
    this.player = player
  }

  hide () {
    this.player.template.mask.classList.remove('mask-show')
    this.player.controller.disableAutoHide = false
  }

  show () {
    this.player.template.mask.classList.add('mask-show')
    this.player.controller.disableAutoHide = true
  }
}

export default Setting