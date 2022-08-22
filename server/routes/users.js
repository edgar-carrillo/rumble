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

router.get('/:user_email/restaurants/unswiped/:cuisine/:location', async (req, res) => {
  await dbConnect();

  const { user_email, cuisine, location } = req.params;

  const yelpRestaurants = await models.restaurants.getYelpRestaurants(location, cuisine);
  const swipedRestaurants = await models.users.getSwipedRestaurants(user_email);

  const unswipedRestaurants = yelpRestaurants.filter((restaurant) => {
    return !swipedRestaurants.includes(restaurant.id);
  });

  res.status(200).send(unswipedRestaurants);
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

router.post('/:user_email/restaurants/disliked/:restaurant_id', async (req, res) => {
  await dbConnect();

  const { user_email, restaurant_id } = req.params;
  const user = await models.users.getUser(user_email);

  const hasDislikedRestaurant = () => {
    return user.disliked_restaurants.includes(restaurant_id);
  };

  if (!hasDislikedRestaurant()) {
    user.disliked_restaurants.push(restaurant_id);
  }

  await user.save();
  res.status(200).send(`Restaurant with id: ${restaurant_id} added to disliked restaurants!`);
});

router.delete('/:user_email/restaurants/disliked/:restaurant_id', async (req, res) => {
  await dbConnect();
  const { user_email, restaurant_id } = req.params;

  try {
    await User.updateOne({ email: user_email }, { $pull: { disliked_restaurants: restaurant_id } });
    res.status(200).send(`Removed ${restaurant_id} from disliked restaurants successfully.`);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.delete('/:user_email/restaurants/liked/:restaurant_id', async (req, res) => {
  await dbConnect();
  const { restaurant_id, user_email } = req.params;

  try {
    await User.updateOne({ email: user_email }, { $pull: { liked_restaurants: restaurant_id } });
    res.status(200).send(`Removed ${restaurant_id} from liked restaurants successfully.`);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.delete('/:user_email/restaurants/favorites/:restaurant_id', async (req, res) => {
  const { user_email, restaurant_id } = req.params;

  try {
    await User.updateOne({ email: user_email }, { $pull: { favorite_restaurants: restaurant_id } });
    res.status(200).send(`Removed ${restaurant_id} from favorite restaurants successfully.`);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
