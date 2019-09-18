const express = require('express')
const { getProfile, editProfile, editProfileForm, getResource, addResourceForm, addResource, getResourceView } = require('../controllers/profileController')
const catchErrors = require('../middlewares/catchErrors')
const isLoggedIn = require('../middlewares/isLoggedIn')
const router = express.Router()
const uploadCloud = require('../config/cloudinary')
const User = require('../models/User')
const {getDashboard} = require('../controllers/authController')


/* GET home page */
/* router.get('/', async (req, res, next) => {
  res.render('index');
}) */

//index dashboard 
router.get('/', isLoggedIn('/auth/login'), getDashboard)



router.get('/profile', isLoggedIn('/auth/login'), getProfile)
router.get('/profile/edit', isLoggedIn('/auth/login'), editProfileForm)
router.post('/profile/edit', uploadCloud.single('photo'), isLoggedIn('/auth/login'), catchErrors(editProfile))

router.get('/profile/resources', isLoggedIn('/auth/login'), getResource)

router.get('/profile/addresources', isLoggedIn('/auth/login'), addResourceForm)
router.post('/profile/addresources', isLoggedIn('/auth/login'), catchErrors(addResource))

router.get('/profile/resource', isLoggedIn('/auth/login'), getResourceView)

module.exports = router
