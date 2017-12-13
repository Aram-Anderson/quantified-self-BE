var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)
const FoodController = require('./lib/controllers/foods')


app.set('port', process.env.PORT || 3000)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', )

app.get('/api/v1/foods', FoodController.getAllFoods);

app.post('/api/v1/foods', FoodController.postFood);

app.get('/api/v1/foods/:id', FoodController.getSingleFood);

app.delete('/api/v1/foods/:id', FoodController.deleteFood);

app.put('/api/v1/foods/:id', FoodController.updateFood);



app.listen(app.get('port'), function() {
  console.log(`App is running on ${app.get('port')}.`)
})
