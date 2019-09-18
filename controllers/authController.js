const User = require('../models/User')
const Resource = require('../models/Resource')
const passport = require('passport')

exports.signupForm = (req, res) => {
  res.render('auth/signup')
}

exports.signup = async (req, res) => {
  const {email, password, name, lastname} = req.body

  console.log(req.body)
  //const resource = await Resource.create({})
  User.register(new User({email, name, lastname}), password, function(err, account) {
    if (err) {
      return res.json(err)
    }
    return res.redirect('/auth/login')
  })
}

exports.loginForm = (req, res) => {
  res.render('auth/login', { action: 'Login' })
}

exports.login = (req, res, next)=>{
  passport.authenticate('local', (err, user)=>{
    req.app.locals.user = user

    req.logIn(user, err =>{
      return res.redirect('/profile')
    } )
  })(req, res, next)
}

exports.logout = (req, res) => {
  req.logout()
  delete req.app.locals.user
  res.redirect('/auth/login')
}

exports.getDashboard = async (req, res) => {
  const user = await User.findById(req.user._id).populate('resourcd')
  res.render('index', user)
}


