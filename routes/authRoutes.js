const router = require('express').Router()
const { 
  signupForm, 
  signup, 
  loginForm, 
  login, 
  logout,
  getAdmin,
verifyAccount,
resetVerifyCode } = require('../controllers/authController')
const catchErrors = require('../middlewares/catchErrors')
const isLoggedOut = require('../middlewares/isLoggedOut')
const isLoggedIn = require('../middlewares/isLoggedIn')
const passport = require('../config/passport')
const User = require('../models/User')
const Resource = require('../models/Resource')
const uploadCloud = require('../config/cloudinary')

// router.get('/signup', isLoggedOut('/'), signupForm)
// router.post('/signup', catchErrors(signup))

router.get('/login', isLoggedOut('/'), loginForm)
router.post('/login', passport.authenticate('local'), login)
router.get('/admin', isLoggedIn('/auth/login'), getAdmin)

router.get('/profile/verify/:code', isLoggedIn('/auth/login'), catchErrors(verifyAccount));
router.get('/profile/reset-code', isLoggedIn('/auth/login'), catchErrors(resetVerifyCode));

router.get('/logout', logout)

module.exports = router
