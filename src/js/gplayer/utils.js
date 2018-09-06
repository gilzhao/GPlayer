const isMobile = /mobile/i.test(window.navigator.userAgent)

const util = {

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

  isMobile: isMobile
}