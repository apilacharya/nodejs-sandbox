const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Welcome to Vidyl-App. Home to thousand of movies of your choice');
});

module.exports = router