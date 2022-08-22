const mongoose = require('mongoose');

const Schema = mongoose.schema;

const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  photo_url: String,
  restaurant_preferences: {
    location: String,
    price: String,
    cuisine: String,
  },
  favorite_restaurants: [String],
  liked_restaurants: [String],
  disliked_restaurants: [String],
  swipe_groups: [String],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
