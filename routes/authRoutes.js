const router = require('express').Router()
const {  
  loginForm, 
  login, 
  logout,
  getAdmin,
  userForm,
  createUser,
  allUsers,
verifyAccount,
resetVerifyCode } = require('../controllers/authController')
const catchErrors = require('../middlewares/catchErrors')
const checkRole = require('../middlewares/checkRole')
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
//ADMIN
router.get('/admin', isLoggedIn('/auth/login'), getAdmin)

router.get('/add-user', isLoggedIn('/auth/login'), checkRole("ADMIN"), userForm)
router.post('/add-user', isLoggedIn('/auth/login'), createUser)
router.get('/all-users', isLoggedIn('/auth/login'), checkRole("ADMIN"), allUsers)

//USER
router.get('/profile/verify/:code', isLoggedIn('/auth/login'), catchErrors(verifyAccount));
router.get('/profile/reset-code', isLoggedIn('/auth/login'), catchErrors(resetVerifyCode));

router.get('/logout', logout)

module.exports = router
