<template>
  <div class="wrap">
    <div id="gp1" class="gp"></div>
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
      container: document.getElementById('gp1'),
      theme: '#f63',
      video: {
        url: 'https://moeplayer.b0.upaiyun.com/dplayer/hikarunara.mp4',
        pic: 'https://moeplayer.b0.upaiyun.com/dplayer/hikarunara.png'
      }
    })
    window.player = videoPlayer
	},
};
</script>
