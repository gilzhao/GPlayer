import utils from 'util'

class Volume {
  constructor (player) {
    this.player = player
  }

  toggle() {
    this.player.video.muted = !this.player.video.muted
    if (this.player.video.muted) {
      this.player.template.volumeButton.innerHTML = this.player.icons.volumeUP
    } else {
      this.player.template.volumeButton.innerHTML = this.player.icons.volumeDown
    }
  }
}

export default Volume