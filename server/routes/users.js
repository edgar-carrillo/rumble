const dbConnect = require('../dbConnect');
const router = require('express').Router();
const Users = require('../schemas/Users');


router.get('/', async (req, res) => {
  const email = req.query.user_email;
  await dbConnect();

  const users = await Users.find({ user_email: email}).exec();

  if (users.length === 0) {
    res.status(404).send('User not found in database.')
  } else {
    res.send(users[0])
  }
});

module.exports = router;
