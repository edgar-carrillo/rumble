const dbConnect = require('../dbConnect');
const router = require('express').Router();
const User = require('../schemas/User');

router.get('/', async (req, res) => {
  const email = req.query.user_email;
  await dbConnect();

  const users = await User.find({ user_email: email}).exec();

  if (users.length === 0) {
    res.status(404).send('User not found in database.')
  } else {
    res.send(users[0])
  }
});

router.post('/', (req, res) => {
  const { userData } = req.body

  const user = new User({
    email: userData.email,
    username: userData.name,
    photo_url: userData.photoURL,
    restaurant_preferences: {
      location: userData.location,
      price: '$$$$',
      cuisine: userData.cuisine,
    },
    favorite_restaurants: [],
    liked_restaurants: [],
    disliked_restaurants: [],
    swipe_groups: [],
  });

  dbConnect()
    .then(() => user.save())
    .then((response) => res.status(200).send(response))
    .catch((error) => res.status(400).send(error));
});

module.exports = router;
