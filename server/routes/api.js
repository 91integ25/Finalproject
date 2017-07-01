const express = require('express');
const User = require('mongoose').model('User');



const router = new express.Router();

router.get('/dashboard', (req, res) => {
  res.json('winner');
});

module.exports = router;
