const dbConnect = require('../dbConnect');
const router = require('express').Router();
const User = require('../schemas/User');
const models = require('../scripts/models/models');

router.get('/', async (req, res) => {
  await dbConnect();

  const { email } = req.query;
  const users = await User.find({ email: email}).exec();

  if (users.length === 0) {
    res.status(404).send('User not found in database.')
  } else {
    res.send(users[0])
  }
});

router.get('/swipedRestaurants', async (req, res) => {
  await dbConnect();

  try {
    const response = await User.aggregate([{
      $project: { swiped: { $concatArrays: ['$disliked_restaurants', '$liked_restaurants'] }}
    }]);
    res.status(200).send(response[0].swiped);
  } catch(error) {
    res.status(404).send(error);
  }
});

router.post('/:user_email/restaurants/favorites/:restaurant_id', async (req, res) => {
  await dbConnect();

  const { user_email, restaurant_id } = req.params;
  const user = await models.users.getUser(user_email);
  user.favorite_restaurants.push(restaurant_id);
  await user.save();

  res.status(200).send(`Restaurant with id: ${restaurant_id} has been added to favorites!`);
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

router.post('/:user_email/restaurants/liked/:restaurant_id', async (req, res) => {
  await dbConnect();

  const { user_email, restaurant_id } = req.params;
  const user = await models.users.getUser(user_email);

  const hasLikedRestaurant = () => {
    return user.liked_restaurants.includes(restaurant_id);
  };

  if (!hasLikedRestaurant()) {
    user.liked_restaurants.push(restaurant_id);
  }

  await user.save();
  res.status(200).send(`Restaurant with id: ${restaurant_id} posted to liked restaurants!`);
});

router.post('/dislikedRestaurants', (req, res) => {
  const { restaurantId, userEmail } = req.body;
  dbConnect()
    .then(() => {
      return User.findOne({ email: userEmail }).exec();
    })
    .then((user) => {
      if (!user.disliked_restaurants.includes(restaurantId)) {
        user.disliked_restaurants.push(restaurantId);
      }

      return user.save();
    })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => res.status(404).send(error));
});

router.delete('/dislikedRestaurant', async (req, res) => {
  const { restaurantId, userEmail } = req.body;
  await dbConnect();

  try {
    await User.updateOne({ email: userEmail }, { $pull: { disliked_restaurants: restaurantId } });
    res.status(200).send(`Removed ${restaurantId} from disliked restaurants successfully.`);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.delete('/likedRestaurant', async (req, res) => {
  const { restaurantId, userEmail } = req.body;
  await dbConnect();

  try {
    await User.updateOne({ email: userEmail }, { $pull: { liked_restaurants: restaurantId } });
    res.status(200).send(`Removed ${restaurantId} from liked restaurants successfully.`);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
