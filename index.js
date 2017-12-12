var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.set('port', process.env.PORT || 3000)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', )
