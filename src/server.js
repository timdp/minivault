'use strict'

import express from '../node_modules/minivault-rest/node_modules/express/'
import morgan from '../node_modules/minivault-rest/node_modules/morgan/'
import bodyParser from '../node_modules/minivault-rest/node_modules/body-parser/'
import router from 'minivault-rest'
import path from 'path'

const PORT = 3000

const app = express()
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use('/api', router)
app.use(express.static(path.resolve(__dirname, '..', 'public')))
app.listen(PORT, () => console.info('Listening on port %d', PORT))
