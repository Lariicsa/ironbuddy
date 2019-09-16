const express = require('express');
const router  = express.Router();
const {showProfile} = require('../controllers/profileController')
const catchErrors = require('../middlewares/catchErrors')
const isLoggedIn = require('../middlewares/isLoggedIn')
const uploadCloud = require('../config/cloudinary')
const User = require('../models/User')


/* GET home page */
router.get('/', async (req, res, next) => {
  res.render('index');
});

router.get('/profile', isLoggedIn('/auth/login'), catchErrors(showProfile))

module.exports = router;
