<template>
  <div class="wrap">
    <div class="gplayer"></div>
  </div>
</template>

<script>
import Gplayer from './js/gplayer/index.js'

export default {
	data() {
		return {};
	},
	mounted() {
    let videoPlayer = new Gplayer({
      video: {
        url: 'https://moeplayer.b0.upaiyun.com/dplayer/hikarunara.mp4',
        pic: 'http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg'
      }
    })
    window.player = videoPlayer
	},
};
</script>
