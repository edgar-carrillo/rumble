const axios = require('axios');

const yelpRequestHeaders = { headers: { Authorization: `Bearer ${process.env.YELP_API_KEY}` } };

const restaurantsModel = {

  getYelpRestaurants: async function(location, cuisine) {
    const url = `https://api.yelp.com/v3/businesses/search?location=${location}&categories=${cuisine}`;
    const yelpResponse = await axios.get(url, yelpRequestHeaders);

    return yelpResponse.data.businesses;
  },

  getYelpRestaurantReviews: async function(restaurant_id) {
    const url = `https://api.yelp.com/v3/businesses/${restaurant_id}/reviews`;
    const yelpResponse = await axios.get(url, yelpRequestHeaders);

    return yelpResponse;
  },

};

module.exports = restaurantsModel;
