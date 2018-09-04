import Vue from 'vue'
import App from './app.vue'

import './assets/styles/less.less'
import './assets/images/bg-head.png'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue ({
  render: (h) => h(App)
}).$mount(root)
