const express = require('express');


const router = new express.Router();

router.get('/dashboard', (req, res) => {
  res.json('winner');
});


module.exports = router;
