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


app.get('/api/v1/foods', function(request, response) {
  database.raw("SELECT id, name, calories FROM foods")
  .then(function(data) {
    if (data.rows == 0) { return response.sendStatus(404) }

    response.json(data.rows);
  })
})

app.get('/api/v1/foods/:id', function(request, response) {
  var id = request.params.id;

  database.raw("SELECT id, name, calories FROM foods WHERE id=?", [id])
   .then(function(data) {
     if (data.rows == 0) { return response.sendStatus(404) }

     response.json(data.rows[0])
   })
})

app.post('/api/v1/foods', function(request, response) {
  var name = request.body.name;
  var calories = request.body.calories;

  if(!name && !calories) {
    return response.status(422).send({ error: "Food properties were not provided"})
  }

  database.raw(
    'INSERT INTO foods (name, calories) VALUES (?, ?) RETURNING id, name, calories',
    [name, calories]
  )
  .then(function(data) {
    response.status(201).json(data.rows)
  })
})





app.listen(app.get('port'), function() {
  console.log(`App is running on ${app.get('port')}.`)
})
