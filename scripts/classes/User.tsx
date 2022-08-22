import axios from 'axios';
import loginFormModel from '../models/loginForm';

interface UserProps {
  username: string;
  email: string;
  location: string;
  cuisine: string;
  photoURL: string;
}

class User {
  username: string;
  email: string;
  location: string;
  cuisine: string;
  photoURL: string;

  constructor(userData: UserProps) {
    this.username = userData.username;
    this.email = userData.email;
    this.location = userData.location;
    this.cuisine =  userData.cuisine;
    this.photoURL = userData.photoURL;
  }

  getData() {
    return this;
  }

  updateWithCloudinaryPhoto() {
    return new Promise((resolve, reject) => {
      loginFormModel.uploadImg(this.photoURL)
      .then((response: any) => {
        const photoURL = response.data.secure_url;
        this.photoURL = photoURL;
        resolve(photoURL);
      })
      .catch((error) => reject(error));
    });
  }

  addLikedRestaurant(restaurantId: string) {
    return new Promise((resolve, reject) => {
      axios.post(`users/${this.email}/restaurants/liked/${restaurantId}`)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  addDislikedRestaurant(restaurantId: string) {
    return new Promise((resolve, reject) => {
      axios.post(`users/${this.email}/restaurants/disliked/${restaurantId}`)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  removeDislikedRestaurant(restaurantId: string) {
    return new Promise((resolve, reject) => {
      axios.delete(`users/${this.email}/restaurants/disliked/${restaurantId}`)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  removeLikedRestaurant(restaurantId: string) {
    return new Promise((resolve, reject) => {
      axios.delete(`users/${this.email}/restaurants/liked/${restaurantId}`)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  getUnswipedRestaurants() {
    return new Promise((resolve, reject) => {
      const endpoint =
        `users/${this.email}/restaurants/unswiped/${this.cuisine}/${this.location}`;
      axios.get(endpoint)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }

  async addFavoriteRestaurant(restaurantId: string) {
    const endpoint = `users/${this.email}/restaurants/favorites/${restaurantId}`;
    const body = { user_email: this.email, restaurant_id: restaurantId };
    await axios.post(endpoint, body);
  }

}

export default User;