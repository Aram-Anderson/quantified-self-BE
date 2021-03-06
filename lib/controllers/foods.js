var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var environment = process.env.NODE_ENV || 'development';
var configuration = require('../../knexfile')[environment];
var database = require('knex')(configuration);
const Food = require('../../lib/models/food')

const postFood = (request, response, next) => {
  let food = {
    name: request.body.food.name,
    calories: request.body.food.calories,
    created_at: new Date,
    updated_at: new Date
  }

  Food.createFood(food)
    .then((data) => {
      response.status(201).json(data.rows)
    })
    .catch(() => {
      response.status(404).json({"Error": "There was an error with your request"})
    })
}

const getAllFoods = (request, response, next) => {
  Food.getFoods()
  .then(function(data) {
    response.json(data.rows);
  }).catch(() => {
    response.status(404).json({"Error": "There was an error with your request"})
  })
}

const getSingleFood = (request, response, next) => {
    let id = request.params.id

    Food.getSingleFood(id)
    .then(function(data) {
      response.json(data.rows[0])
    }).catch(() => {
      response.status(404).json({"Error": "Food not found"})
    })
}

const updateFood = (request, response, next) => {
  let key  = Object.keys(request.body)[0]
  let body = request.body[key]
  let id   = request.params.id
  let attributes = [key, body, new Date, id]

  Food.editFood(attributes)
    .then((data) => {
      response.json(data.rows[0])
    })
    .catch(() => {
      response.status(404).json({"Error": "Something went wrong"})
    })
}

const deleteFood = (request, response, next) => {
  let id = request.params.id

  Food.deleteAFood(id)
   .then(function(data) {
      response.json({"Success": "Food was deleted"})
    }).catch(() => {
      response.status(404).json({"Error": "There was an error with your request"})
    })
}



module.exports = {
  postFood,
  getAllFoods,
  getSingleFood,
  updateFood,
  deleteFood
}
