var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);


const createFood = (food) => {
  return database.raw(
    `INSERT INTO foods (name, calories, created_at, updated_at)
    VALUES (?, ?, ?, ?) RETURNING id, name, calories`,
    [food.name, food.calories, food.created_at, food.updated_at]
  )
}

const getFoods = () => {
  return database.raw("SELECT id, name, calories FROM foods")
}

const getSingleFood = (id) => {
  return database.raw("SELECT id, name, calories FROM foods WHERE id=?", [id])
}

const editFood = (name, calories, id) => {
  return database.raw(
    `UPDATE foods SET name=?, calories=?
    WHERE id=?`, [name, calories, id]
  )
}

const deleteAFood = (id) => {
  return database.raw("DELETE FROM foods WHERE id=?", [id])
}


module.exports = {
  createFood,
  getFoods,
  getSingleFood,
  editFood,
  deleteAFood
}
