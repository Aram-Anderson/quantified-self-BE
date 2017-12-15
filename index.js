var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const Meal = require('./lib/models/meal')
const Food = require('./lib/models/food')
const path = require('path')
const cors = require('cors')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)
const FoodController = require('./lib/controllers/foods')
const pry = require('pryjs')

app.set('port', process.env.PORT || 3000)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname +'/index.html'));
});

app.get('/api/v1/meals', (request, response) => {
  Meal.allMeals()
  .then(function (data) {
    data.rows.forEach ((meal) => {
      if (meal.foods[0] === null) { meal.foods = [] }
    })
    if (data.rowCount === 0) { return response.sendStatus(404) }
    response.json(data.rows)
  })
})

app.get('/api/v1/meals/:meal_id/foods', (request, response) => {
  Meal.oneMeal(request.params.meal_id)
  .then(function (data) {
    if (data.rowCount === 0) { return response.sendStatus(404) }
    response.json(data.rows)
  })
})

app.post('/api/v1/meals/:meal_id/foods/:id', (request, response) => {
  Meal.addFoodToMeal(request.params.id, request.params.meal_id)
  .then(function (data){
    if (data.rowCount === 0) { return response.sendStatus(404) }
    response.json(data.rows)
  })
})

app.delete('/api/v1/meals/:meal_id/foods/:id', (request, response) => {
  Meal.removeFoodFromMeal(request.params.id, request.params.meal_id)
  .then(function (data) {
    if (data.rowCount === 0) { return response.sendStatus(404) }
    response.json(data.rows)
  })
})

app.get('/api/v1/foods', FoodController.getAllFoods);

app.post('/api/v1/foods', FoodController.postFood);

app.get('/api/v1/foods/:id', FoodController.getSingleFood);

app.delete('/api/v1/foods/:id', FoodController.deleteFood);

app.patch('/api/v1/foods/:id', FoodController.updateFood);

if (!module.parent) {
  app.listen(app.get('port'), function () {
    console.log(`Quantified Self BE is running on port ${app.get('port')}`)
  })
}
