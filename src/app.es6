'use strict'

import open from 'open'
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import router from 'minivault-rest'
import path from 'path'

const DEFAULT_HOSTNAME = 'localhost'

let hostname = DEFAULT_HOSTNAME
let port = 0

const args = process.argv.slice(2)
if (args.length > 0) {
  if (args.length >= 2) {
    hostname = args.shift()
  }
  port = parseInt(args.shift(), 10)
}

const app = express()
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use('/api', router)
app.use(express.static(path.resolve(__dirname, '..', 'public')))
const server = app.listen(port, hostname, () => {
  const {address, port} = server.address()
  const url = `http://${address}:${port}`
  console.info('Opening URL: %s', url)
  open(url)
})
