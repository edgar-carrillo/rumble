import axios from 'axios';

interface UserProps {
  readonly username: string;
  readonly email: string;
  readonly location: string;
  readonly cuisine: string;
  readonly photoURL: string;
};

class MongoDatabase {

  createUser(userData: UserProps) {
    return new Promise((resolve, reject) => {
      axios.post('/users/', { userData })
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  getUser(email: string) {
    return new Promise((resolve, reject) => {
      axios.get(`users/?email=${email}`)
        .then((response: any) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }

}

export default MongoDatabase;
