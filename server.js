const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000
const app = next({ dir: '.', dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.get('/jobs', (req, res) => {
    return app.render(req, res, '/jobs', req.query)
  })

  server.get('/indique', (req, res) => {
    return app.render(req, res, '/indique', req.query)
  })

  server.get('/login', (req, res) => {
    return app.render(req, res, '/login', req.query)
  })

  server.get('/listing/:id', (req, res) => {
    const actualPage = '/listing'
    const queryParams = { id: req.params.id }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/user/:id', (req, res) => {
    const actualPage = '/user'
    const queryParams = { id: req.params.id }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})

