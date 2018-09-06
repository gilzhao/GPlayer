export default (options) => {
  const defaultOption = {
    container: options.element || document.getElementsByClassName('gplayer')[0],
    autoplay: false,
    loop: false,
    lang: (navigator.language || navigator.browserLanguage).toLowerCase(),
    preload: 'metadata',
    volume: 0.7,
    video: {},
    mutex: true // 禁止同时播放多个播放器，当该播放器开始播放时暂停其他播放器
  }

  for (const defaultKey in defaultOption) {
    if (defaultOption.hasOwnProperty(defaultKey) && !options.hasOwnProperty(defaultKey)) {
      options[defaultKey] = defaultOption[defaultKey]
    }
  }

  if (options.video) {
    !options.video.type && (options.video.type = 'auto');
  }

  return options
}