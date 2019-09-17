const express = require('express')
const { getProfile, editProfile, editProfileForm } = require('../controllers/profileController')
const catchErrors = require('../middlewares/catchErrors')
const isLoggedIn = require('../middlewares/isLoggedIn')
const router = express.Router()
const uploadCloud = require('../config/cloudinary')
const User = require('../models/User')


/* GET home page */
router.get('/', async (req, res, next) => {
  res.render('index');
})

router.get('/profile', isLoggedIn('/auth/login'), getProfile)
router.get('/profile/edit', isLoggedIn('/auth/login'), editProfileForm)

router.post('/profile/edit', isLoggedIn('/auth/login'), catchErrors(editProfile))


module.exports = router
