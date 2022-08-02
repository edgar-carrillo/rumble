import axios from "axios";

const loginFormModel = {

  nameErrorHandler: (name: string, customError: string) => {
    if (customError.length > 0) return customError;
    if (name.length === 0) return 'Please enter a name.';
    if (name.length >= 20) return 'Please enter less then 20 characters.';
    return '';
  },

  locationErrorHandler: function (location: string, customError: string) {
    if (customError.length > 0) return customError;
    if (location.length <= 5) return 'Please enter more then 5 characters.';
    if (location.length >= 40) return 'Please enter less then 40 characters.';
    return '';
  },

  getLocations: (location: string) => new Promise((resolve, reject) => {
    axios.get(`https://api.teleport.org/api/cities/?search=${location}`)
      .then((response) => {
        let locations = response.data._embedded['city:search-results']
          .filter((location: any) => {
            if (location.matching_full_name.includes('United States')) return location;
          });
        resolve(locations);
      })
      .catch((err) => reject(err));
  }),

  formatInputName: (name: string) => {
    return name.split(' ').join('-').toLowerCase();
  },

  formatLocationName: (location: string) => {
    if (location.length > 40) location = location.slice(0, 41).concat('...');
    return location;
  },

  updateName: (username: string) => localStorage.setItem('username', username),

};

export default loginFormModel;
