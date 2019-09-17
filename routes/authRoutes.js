const router = require('express').Router()
const {
  signupForm,
  signup,
  loginForm,
  login,
  logout
} = require('../controllers/authController')
const catchErrors = require('../middlewares/catchErrors')
const isLoggedOut = require('../middlewares/isLoggedOut')
const passport = require('../config/passport')
const User = require('../models/User')

router.get('/signup', isLoggedOut('/'), signupForm)
router.post('/signup', catchErrors(signup))
router.get('/login', isLoggedOut('/'), loginForm)
router.post('/login', login)





router.get('/logout', logout)

module.exports = router
