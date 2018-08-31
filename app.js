const Vue = require('vue')

module.exports = function createApp (context) {
  return new Vue({
    data: {
      url: context.url,
      count: count++
    },
    template: `<div>访问的 URL 是：{{ url }}</div>`
  })
}