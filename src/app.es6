'use strict'

import open from 'open'
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import router from 'minivault-rest'
import path from 'path'

const DEFAULT_HOSTNAME = 'localhost'
const DEFAULT_PORT = 3000

let hostname = DEFAULT_HOSTNAME
let port = DEFAULT_PORT

const args = process.argv.slice(2)
if (args.length) {
  if (args.length >= 2) {
    hostname = args.shift()
  }
  port = parseInt(args.shift())
}

const app = express()
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use('/api', router)
app.use(express.static(path.resolve(__dirname, '..', 'public')))
app.listen(port, hostname,
  () => console.info('Listening on %s:%d', hostname, port))

open(`http://localhost:${port}`)
