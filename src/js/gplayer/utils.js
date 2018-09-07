const isMobile = /mobile/i.test(window.navigator.userAgent)

const utils = {

  /**
   * Parse second to time string
   *
   * @param {Number} second
   * @return {String} 00:00 or 00:00:00
   */
  secondToTime: (second) => {
    const add0 = (num) => num < 10 ? '0' + num : '' + num
    const hour = Math.floor(second / 3600)
    const min = Math.floor((second - hour * 3600) / 60)
    const sec = Math.floor(second - hour * 3600 - min * 60)
    return (hour > 0 ? [hour, min, sec] : [min, sec]).map(add0).join(':')
  },

  /**
   * optimize control play progress

   * optimize get element's view position,for float dialog video player
   * getBoundingClientRect 在 IE8 及以下返回的值缺失 width、height 值
   * getBoundingClientRect 在 Firefox 11 及以下返回的值会把 transform 的值也包含进去
   * getBoundingClientRect 在 Opera 10.5 及以下返回的值缺失 width、height 值
   */
  getBoundingClientRectViewLeft (element) {
    const scrollTop = document.documentElement.scrollTop

    if (element.getBoundingClientRect) {
      if (typeof this.getBoundingClientRectViewLeft.offset !== 'number') {
        let temp = document.createElement('div')
        temp.style.cssText = 'position:absolute;top:0;left:0;'
        document.body.appendChild(temp)
        this.getBoundingClientRectViewLeft.offset = -temp.getBoundingClientRect().top - scrollTop
        temp = null
      }

      const rect = element.getBoundingClientRect()
      const offset = this.getBoundingClientRectViewLeft.offset

      return rect.left + offset
    } else {
      // not support getBoundingClientRect
      return this.getElementViewLeft(element)
    }
  },

  isMobile: isMobile,

  nameMap: {
    dragStart: isMobile ? 'touchstart' : 'mousedown',
    dragMove: isMobile ? 'touchmove' : 'mousemove',
    dragEnd: isMobile ? 'touchend' : 'mouseup'
  }
}

export default utils