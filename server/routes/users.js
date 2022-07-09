const dbConnect = require('../dbConnect');
const router = require('express').Router();
const Users = require('../schemas/Users');


router.get('/', (req, res) => {
  const email = req.query.user_email;
  dbConnect()
    .then(() => {
      return Users.find({ user_email: email}).exec()
    })
    .then((response) => {
      if (response.length === 0) {
        res.status(404).send('User not found in database.')
      } else {
        res.send(response);
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
