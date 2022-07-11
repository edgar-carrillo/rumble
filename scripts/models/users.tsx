import axios from "axios";

const users = {

  getSingleUser: (userEmail: string | null) => new Promise((resolve, reject) => {
    if (userEmail === null) return 'Please enter a valid email';
    axios.get(`/users/?user_email=${userEmail}`)
      .then((response) => resolve(response))
      .catch((err) => reject(err.response));
  })

};

export default users;
