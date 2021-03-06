const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)
const pry = require('pryjs')

module.exports = class Meal {
  static allMeals() {
    return database.raw("SELECT meals.*, json_agg(foods.*) AS foods FROM meals LEFT OUTER JOIN meal_foods ON meals.id=meal_foods.meal LEFT OUTER JOIN foods ON meal_foods.food=foods.id GROUP BY meals.id;")
  }

  static oneMeal(mealId) {
    return database.raw("SELECT meals.*, json_agg(foods.*) AS foods FROM meals LEFT OUTER JOIN meal_foods ON meals.id=meal_foods.meal LEFT OUTER JOIN foods ON meal_foods.food=foods.id WHERE meals.id=" + mealId + "GROUP BY meals.id;")
  }

  static addFoodToMeal(foodId, mealId) {
    return database.raw("INSERT INTO meal_foods (food, meal, created_at, updated_at) VALUES (?, ?, ?, ?) RETURNING id", [foodId, mealId, new Date, new Date])
  }

  static removeFoodFromMeal(foodId, mealId) {
    return database.raw("DELETE FROM meal_foods WHERE ctid = (SELECT ctid FROM meal_foods WHERE meal=" + mealId + " AND food=" + foodId + " LIMIT 1);")
  }
}
