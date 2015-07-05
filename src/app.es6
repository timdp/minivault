'use strict'

import open from 'open'
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import router from 'minivault-rest'
import path from 'path'

const PORT = 3000

const app = express()
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use('/api', router)
app.use(express.static(path.resolve(__dirname, '..', 'public')))
app.listen(PORT, () => console.info('Listening on port %d', PORT))

open(`http://localhost:${PORT}`)
