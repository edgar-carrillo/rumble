const mongoose = require('mongoose');

const Schema = mongoose.schema;

const userSchema = new mongoose.Schema({
  user_email: String,
  user_name: String,
  img_url: String,
  restaurant_location: String,
  restaurant_price: String,
  restaurant_cuisine: String,
  favorite_restauraunts: [String],
  liked_restaurants: [String],
  disliked_restaurants: [String],
  groups: [String],
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;
