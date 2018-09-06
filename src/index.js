import Vue from 'vue'
import App from './app.vue'
import Stats from './lib/stats.js'

import './assets/styles/gplayer.less'

const root = document.createElement('div')
document.body.appendChild(root)

// const stats = new Stats()
// stats.showPanel(0)
// document.body.appendChild(stats.dom)
// function animate () {
//   stats.begin();
//   // monitored code goes here
//   stats.end();

//   requestAnimationFrame(animate)
// }
// requestAnimationFrame(animate)

new Vue ({
  render: (h) => h(App)
}).$mount(root)
