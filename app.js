const Vue = require('vue')

module.exports = function createApp (context) {
  let count = 0
  return new Vue({
    data: {
      url: context.url,
      count: count++
    },
    template: `<div>访问的 URL 是：{{ url }} {{ count }}</div>`
  })
}