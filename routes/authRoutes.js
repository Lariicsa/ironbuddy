const router = require('express').Router()
const { 
  signupForm, 
  signup, 
  loginForm, 
  login, 
  logout,
  getDashboard } = require('../controllers/authController')
const { showProfile } = require('../controllers/profileController')
const catchErrors = require('../middlewares/catchErrors')
const isLoggedOut = require('../middlewares/isLoggedOut')
const isLoggedIn = require('../middlewares/isLoggedIn')
const passport = require('../config/passport')
const User = require('../models/User')
const Resource = require('../models/Resource')
const uploadCloud = require('../config/cloudinary')

router.get('/signup', isLoggedOut('/'), signupForm)
router.post('/signup', catchErrors(signup))
router.get('/login', isLoggedOut('/'), loginForm)
router.post('/login', login)
router.get('/logout', logout)

/* //index dashboard 
router.get('/', isLoggedIn('/auth/login'), getDashboard) */



module.exports = router
