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

app.delete('/api/v1/foods/:id', FoodController.deleteAFood);


// app.put('/api/v1/foods/:id', function (request, response) {
//   var id = request.params.id;
//   var name = request.body.name;
//   var calories = request.body.calories;
//
//   if(!name && !calories) {
//     return response.status(422).send({ error: "Food properties were not provided"})
//   } else if (name && calories) {
//     database.raw('UPDATE foods SET name=?, calories=? WHERE id=?', [name, calories, id])
//     .then(function(data) {
//       response.status(201).json(data.rows)
//     })
//   } else if (name) {
//     database.raw('UPDATE foods SET name=? WHERE id=?', [name, id])
//     .then(function(data) {
//       response.status(201).json(data.rows)
//     })
//   } else if(calories) {
//     database.raw('UPDATE foods SET calories=? WHERE id=?', [calories, id])
//     .then(function(data) {
//       response.status(201).json(data.rows)
//     })
//   }

// })




app.listen(app.get('port'), function() {
  console.log(`App is running on ${app.get('port')}.`)
})
