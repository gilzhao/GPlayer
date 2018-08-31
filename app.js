const Vue = require('vue')
const server = require('express')()
// const renderer = require('vue-server-renderer').createRenderer()

const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./index.template.html', 'utf-8')
})

let count = 0

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url,
      count: count++
    },
    template: `<div>访问的 URL 是：{{ url }} {{ count }}</div>`
  })

  const context = {
    title: 'Hello Gil',
    meta: ``
  }
  
  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(`${ html }`)
  }) 
})

server.listen(8000)
