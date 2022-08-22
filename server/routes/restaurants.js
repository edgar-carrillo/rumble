const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:location/:cuisine', (req, res) => {
  const { location, cuisine } = req.params;
  const url = `https://api.yelp.com/v3/businesses/search?location=${location}&categories=${cuisine}`;
  axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`,
    }
  })
    .then((response) => res.status(200).send(response.data))
    .catch((error) => res.status(404).send(error));
});

module.exports = router;
