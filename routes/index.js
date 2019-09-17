const express = require('express')
const {
  showProfile,
  updateProfile
} = require('../controllers/profileController')
const catchErrors = require('../middlewares/catchErrors')
const isLoggedIn = require('../middlewares/isLoggedIn')
const router = express.Router()
const uploadCloud = require('../config/cloudinary')
const User = require('../models/User')


/* GET home page */
router.get('/', async (req, res, next) => {
  res.render('index');
});

router.get('/profile', isLoggedIn('/auth/login'), catchErrors(showProfile))
router.post(
  '/profile/edit',
  uploadCloud.single('photo'),
  catchErrors(updateProfile)
)


module.exports = router
