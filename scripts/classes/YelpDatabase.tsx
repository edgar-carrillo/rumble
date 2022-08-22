const axios = require('axios');

export default class YelpDatabase {
  getRestaurants(location: string, cuisine: string) {
    return new Promise((resolve, reject) => {
      axios.get(`restaurants/${location}/${cuisine}`)
        .then((response: any) => resolve(response.data))
        .catch((error: any) => reject(error));
    });
  }
}
