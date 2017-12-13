var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development'
const Meal = require('./lib/models/meal')
const pry = require('pryjs')

app.set('port', process.env.PORT || 3000)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/v1/meals', (request, response) => {
  Meal.allMeals()
  .then(function (data){
    if (data.rowCount === 0) { return response.sendStatus(404) }
    response.json(data.rows)
  })
})

app.get('/api/v1/meals/:meal_id/foods', (request, response) => {
  Meal.oneMeal(request.params.meal_id)
  .then(function (data){
    if (data.rowCount === 0) { return response.sendStatus(404) }
    response.json(data.rows)
  })
})

app.post('/api/v1/meals/:meal_id/foods/:id', (request, response) => {
  Meal.addFoodToMeal(request.params.meal_id, request.params.id)
  .then(function (data){
    if (data.rowCount === 0) { return response.sendStatus(404) }
    response.json(data.rows)
  })
})

if (!module.parent) {
  app.listen(app.get('port'), function () {
    console.log(`Quantified Self BE is running on port ${app.get('port')}`)
  })
}
