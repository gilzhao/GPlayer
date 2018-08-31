const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./index.template.html', 'utf-8')
})
const createApp = require('./app')

server.get('*', (req, res) => {
  const context = {
    url: req.url,
    title: 'Hello Gil'
  }
  const app = createApp(context)

  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(`${ html }`)
  }) 
})

server.listen(8000)
