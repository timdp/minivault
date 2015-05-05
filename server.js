'use strict'

var express = require('./node_modules/minivault-rest/node_modules/express')
var morgan = require('./node_modules/minivault-rest/node_modules/morgan')
var bodyParser = require('./node_modules/minivault-rest/node_modules/body-parser')
var router = require('minivault-rest')

var PORT = 3000

var app = express()
app.use(morgan('tiny'))
app.use(bodyParser.json())

app.use('/api', router)
app.use(express.static(__dirname + '/public'))

app.listen(PORT, function () {
  console.info('Listening on port %d', PORT)
})
