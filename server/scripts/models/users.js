const User = require('../../schemas/User');

const usersModel = {

  getUser: async function(email) {
    const user = await User.findOne({ email: email });
    return user;
  },

  getSwipedRestaurants: async function(email) {
    const swipedRestaurants = await User.aggregate([{
      $project: { swiped: { $concatArrays: ['$disliked_restaurants', '$liked_restaurants'] }}
    }]);

    return swipedRestaurants[0].swiped;
  },

  getFavoriteRestaurants: async function(email) {
    const user = await this.getUser(email);
    return user.favorite_restaurants;
  },

  addFavorites: async function(restaurants, email) {
    const favoriteRestaurants = await this.getFavoriteRestaurants(email);

    return restaurants.map((restaurant, index, array) => {
      const isFavorited = favoriteRestaurants.includes(restaurant.id);
      restaurant.is_favorited = isFavorited;
      return restaurant;
    });
  },

  createFormattedRestaurants: async function(restaurants, email) {
    let formattedRestaurants = restaurants.slice();
    formattedRestaurants = this.addFavorites(formattedRestaurants, email);
    return formattedRestaurants;
  },

};

module.exports = usersModel;
