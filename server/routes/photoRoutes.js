const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');

const cloudinary = require('cloudinary').v2;
const cloudinaryConfig = require('../configs/cloudinaryConfig');

cloudinary.config(cloudinaryConfig);

router.use('/user', bodyParser.json({ limit: '10mb' }));

router.post('/user', (req, res) => {
  const { imgURL } = req.body;
  cloudinary.uploader.upload(imgURL, { folder: 'rumble/user-imgs' })
    .then((result) => res.status(200).send(result))
    .catch((error) => res.status(400).send(error));
});

module.exports = router;