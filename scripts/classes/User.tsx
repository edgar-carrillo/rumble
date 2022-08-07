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
    return {
      username: this.username,
      email: this.email,
      location: this.location,
      cuisine: this.cuisine,
      photoURL: this.photoURL,
    };
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

}

export default User;